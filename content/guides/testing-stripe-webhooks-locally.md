---
title: 'How to Test Stripe Webhooks Locally'
description:
  'Use the Stripe CLI to forward webhook events to localhost, trigger test events, and verify your
  handler and signing secret before you ship — step by step.'
eyebrow: 'stripe'
date: 2026-08-05
ctaTitle: 'Skip the local setup entirely'
ctaText:
  'Notipus is a verified Stripe webhook endpoint out of the box — connect it and see real events in
  Slack in minutes, no tunnel or CLI required.'
---

Your webhook handler runs on `localhost`, but Stripe can only deliver to a public HTTPS URL. The
[Stripe CLI](https://stripe.com/docs/stripe-cli) closes that gap: it opens an authenticated tunnel
from Stripe to your local server and can fire test events on demand — no ngrok, no deploying to
staging just to see a payload.

## 1. Install and log in

```bash
# macOS
brew install stripe/stripe-cli/stripe

stripe login
```

`stripe login` opens your browser to authorize the CLI against your Stripe account.

## 2. Forward events to your local server

Point the CLI at wherever your handler listens:

```bash
stripe listen --forward-to localhost:4242/webhooks/stripe
```

The command prints a **webhook signing secret** that starts with `whsec_`. This is different from
your Dashboard endpoint's secret — use _this_ one in your local environment while `stripe listen` is
running:

```bash
export STRIPE_WEBHOOK_SECRET=whsec_...
```

Now any event in your account (test mode) is forwarded to your local handler with a valid signature,
so your `constructEvent` verification runs against real, correctly signed payloads.

## 3. Trigger test events

Rather than clicking around the Dashboard to make something happen, fire events directly:

```bash
stripe trigger invoice.payment_succeeded
stripe trigger customer.subscription.deleted
stripe trigger invoice.payment_failed
```

Each `trigger` creates the underlying objects in test mode and sends the matching event to your
forwarded endpoint — a fast loop for exercising every branch of your handler.

## 4. Confirm it worked

- The `stripe listen` terminal logs each event and the HTTP status your handler returned. Anything
  other than `2xx` means Stripe would retry in production — fix it now.
- Add a log line in your handler for `event.type` and the resource ID so you can confirm the payload
  parsed.
- Deliberately send an unsigned request (`curl` a raw JSON body) and confirm your endpoint
  **rejects** it. If it doesn't, your signature verification isn't wired up correctly.

## Common gotchas

- **Wrong signing secret.** The `whsec_` from `stripe listen` is not the same as your Dashboard
  endpoint's secret. Mixing them up is the top cause of "signature verification failed" locally.
- **Parsed body instead of raw.** Verification needs the exact raw request bytes. If your framework
  JSON-parses the body first, verification fails — see the
  [webhook events guide](/guides/stripe-webhook-events/) for the fix.
- **Test vs live mode.** `stripe trigger` fires **test-mode** events. Make sure your keys and the
  CLI are in the same mode.

Once your handler passes locally, register a real endpoint in the Dashboard and swap in its signing
secret — or skip endpoint maintenance entirely and let [Notipus](https://app.notipus.com) be the
verified endpoint that posts each event straight to Slack.
