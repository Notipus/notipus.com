---
title: 'Stripe Webhook Events: The Complete Guide'
description:
  'What Stripe webhook events are, how to verify the signing secret, the events that matter for
  revenue, and how Stripe handles retries and duplicates — a practical developer reference.'
eyebrow: 'stripe'
date: 2026-08-05
ctaTitle: 'Get every Stripe event in Slack — no endpoint to maintain'
ctaText:
  'Notipus verifies your Stripe webhooks, enriches each event with customer context, and posts it to
  Slack, Telegram, or Microsoft Teams. Point a webhook at us and paste the signing secret.'
---

Stripe sends a **webhook event** every time something happens in your account — a subscription is
created, an invoice is paid, a payment fails. Instead of polling the API, you register an endpoint
and Stripe `POST`s each event to it as it happens. This guide covers what those events look like,
how to verify them, which ones matter for revenue, and how Stripe handles retries and duplicates.

## What a webhook event is

Every event is a JSON [`Event`](https://stripe.com/docs/api/events) object. The two fields you'll
use most are `type` (what happened) and `data.object` (the resource it happened to):

```json
{
  "id": "evt_1P...",
  "object": "event",
  "type": "invoice.payment_succeeded",
  "created": 1717000000,
  "data": {
    "object": {
      "object": "invoice",
      "customer": "cus_ABC123",
      "amount_paid": 19900,
      "currency": "usd"
    }
  }
}
```

Note that `amount_paid` is in the currency's **smallest unit** — `19900` is $199.00, not $19,900.
Zero-decimal currencies like JPY don't have this multiplier, so handle the minor unit per currency.

## Setting up an endpoint

1. In the Stripe Dashboard, go to **Developers → Webhooks → Add endpoint**.
2. Enter your HTTPS URL (Stripe won't deliver to plain HTTP).
3. Select the events you care about — subscribe to specific types, not "all events," so you're not
   parsing noise.
4. Save, then copy the **signing secret** (it starts with `whsec_`). You'll need it to verify
   deliveries.

## Verifying the signing secret

Anyone can `POST` JSON to a public URL, so you must verify that a request genuinely came from
Stripe. Each delivery includes a `Stripe-Signature` header; Stripe's libraries check it against your
signing secret and reject anything that doesn't match or is too old (which also blocks replay
attacks):

```js
const event = stripe.webhooks.constructEvent(
  rawBody, // the raw request body, NOT the parsed JSON
  request.headers['stripe-signature'],
  process.env.STRIPE_WEBHOOK_SECRET
);
```

The single most common mistake is passing the **parsed** body instead of the raw bytes. Signature
verification runs over the exact payload Stripe signed, so your framework must hand you the
untouched request body (in Express, use `express.raw()` on the webhook route).

## The events that matter for revenue

Stripe emits [hundreds of event types](https://stripe.com/docs/api/events/types). For revenue and
customer-success alerting, these are the ones worth wiring up:

| Event                                  | What it means                                               |
| -------------------------------------- | ----------------------------------------------------------- |
| `customer.subscription.created`        | A new subscription started — new recurring revenue          |
| `customer.subscription.updated`        | Plan change; compare `previous_attributes` for up/downgrade |
| `customer.subscription.deleted`        | A cancellation — the churn signal to act on fast            |
| `customer.subscription.trial_will_end` | Trial ends in ~3 days; a chance to convert                  |
| `invoice.payment_succeeded`            | A payment cleared — first payment and renewals both fire    |
| `invoice.payment_failed`               | A charge failed; carries the decline reason and retry info  |
| `invoice.payment_action_required`      | 3-D Secure needed before the payment can complete           |
| `checkout.session.completed`           | A Checkout session finished, with line items                |

For upgrades and downgrades, `customer.subscription.updated` includes a `previous_attributes` object
showing only the fields that changed — diff it against the new values to describe the change ("Pro →
Business") instead of just "subscription updated."

## Retries, ordering, and duplicates

Three properties of Stripe's delivery model shape how you should write a handler:

- **Return `2xx` fast.** Acknowledge the event immediately and do slow work afterward. If your
  endpoint returns a non-`2xx` status (or times out), Stripe **retries with exponential backoff for
  up to ~3 days**.
- **Events can arrive more than once.** Because of retries, the same event may be delivered twice.
  Store each `event.id` you've processed and skip duplicates — make your handler **idempotent**.
- **Events can arrive out of order.** Don't assume `created` before `updated`. Fetch the current
  object from the API if you need the authoritative latest state.

## Turn events into alerts

Verifying signatures, diffing `previous_attributes`, deduping by `event.id`, converting minor units
per currency, and mapping cryptic decline codes to plain English is a fair amount of glue to build
and maintain. If you want the alert without the endpoint, that's exactly what
[Notipus](https://app.notipus.com) does: point a Stripe webhook at us, paste the signing secret, and
each event lands in Slack, Telegram, or Microsoft Teams — enriched with the customer's company and
contact, plan changes, and decline reasons. See the [Stripe integration](/integrations/stripe/) for
the full event list.

Building it yourself first? Read
[how to test Stripe webhooks locally](/guides/testing-stripe-webhooks-locally/).
