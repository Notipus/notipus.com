---
title: 'Shopify Webhooks Explained'
description:
  'How Shopify webhooks work — subscribing to topics, verifying the HMAC, the order and customer
  events that matter, and mandatory GDPR webhooks — a practical developer reference.'
eyebrow: 'shopify'
date: 2026-08-05
ctaTitle: 'Get Shopify orders in Slack — no endpoint to build'
ctaText:
  'Notipus verifies your Shopify webhooks and posts each order to Slack, Telegram, or Microsoft
  Teams with customer context. Connect your store and pick a channel.'
---

Shopify **webhooks** notify your app the moment something happens in a store — an order is paid, a
customer is created, a subscription renews. You subscribe to specific **topics**, and Shopify
`POST`s a JSON payload to your endpoint for each matching event. This guide covers the topics worth
subscribing to, how to verify deliveries, and the mandatory webhooks every app must handle.

## Subscribing to topics

A webhook subscription pairs a **topic** (like `orders/paid`) with an **endpoint URL**. You can
create subscriptions three ways:

- **Shopify admin** — Settings → Notifications → Webhooks, for a single store.
- **Admin API** — `POST` a `webhookSubscription` via GraphQL or REST, for apps managing many stores.
- **App config** — declare `[[webhooks.subscriptions]]` in `shopify.app.toml` so they're registered
  on install.

Each delivery arrives as a JSON body with headers telling you which store and topic it's for:
`X-Shopify-Topic`, `X-Shopify-Shop-Domain`, and `X-Shopify-Hmac-Sha256`.

## Verifying the HMAC

Verify every delivery before trusting it. Shopify signs the raw request body with your app's secret
and puts the result in the `X-Shopify-Hmac-Sha256` header. Recompute it and compare:

```js
const crypto = require('crypto');

function verify(rawBody, hmacHeader, secret) {
  const digest = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
}
```

As with Stripe, compute the HMAC over the **raw request body**, not a re-serialized version of the
parsed JSON — reformatting changes the bytes and the signature won't match. Use a constant-time
comparison (`timingSafeEqual`) rather than `===`.

## The events that matter

| Topic              | What it means                                            |
| ------------------ | -------------------------------------------------------- |
| `orders/create`    | A new order was placed (may not be paid yet)             |
| `orders/paid`      | Payment captured — the revenue signal for most stores    |
| `orders/fulfilled` | The order shipped                                        |
| `orders/cancelled` | An order was cancelled                                   |
| `refunds/create`   | A refund was issued                                      |
| `customers/create` | A new customer record                                    |
| `checkouts/create` | A checkout started — useful for abandoned-checkout flows |

For most stores, `orders/paid` is the one to alert on: it fires when money is actually captured,
whereas `orders/create` can fire for unpaid or draft orders.

## Retries and duplicates

Shopify expects a `2xx` response quickly. If your endpoint fails or is too slow, Shopify **retries
over ~48 hours**, then removes the subscription if it keeps failing. As with any webhook source,
deliveries can repeat, so dedupe on the order or event ID and keep your handler idempotent. Return
`2xx` first, then do the slow work.

## Don't forget the mandatory GDPR webhooks

Public apps in the Shopify App Store **must** implement three compliance topics or they'll fail
review:

- `customers/data_request` — a customer requested their data.
- `customers/redact` — delete a customer's data.
- `shop/redact` — delete a shop's data (sent 48 hours after an app is uninstalled).

These are easy to forget because they're not about your core feature — but they're required.

## Turn orders into alerts

If the goal is simply to see paid orders (and who placed them) in a team channel, you don't need to
build and host any of this. [Notipus](https://app.notipus.com) verifies the HMAC, enriches each
order with customer context, and posts it to Slack, Telegram, or Microsoft Teams. See the
[Shopify integration](/integrations/shopify/) for the full setup.
