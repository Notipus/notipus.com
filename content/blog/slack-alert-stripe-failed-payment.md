---
title: 'How to Get a Slack Alert When a Stripe Payment Fails'
description:
  'A failed Stripe payment is a customer about to churn. Here are three ways to get a real-time
  Slack alert when one happens — from the raw webhook to a one-click setup.'
eyebrow: 'playbook'
date: 2026-08-05
author: 'Notipus'
ctaTitle: 'Failed-payment alerts in Slack, in two minutes'
ctaText:
  'Connect Stripe to Notipus and every failed payment posts to your channel with the customer, the
  decline reason, and the retry schedule — no code to maintain.'
---

When a Stripe subscription payment fails, a clock starts. Stripe will retry the charge a few times
over the next couple of weeks, and if none succeed, the subscription cancels. That window is your
best — often only — chance to save the customer. But it only helps if someone _knows_ the payment
failed. Here are three ways to get that into Slack.

## Why failed payments deserve their own alert

A failed payment is rarely the customer's decision. Most are **involuntary**: an expired card, a hit
credit limit, or a bank declining a routine charge. The customer still wants your product; the
payment just didn't go through. A quick, friendly "hey, your card didn't go through" often fixes it
in minutes — but only if your team sees it in time. Buried in a monthly Stripe report, it's already
churn.

The event you care about is [`invoice.payment_failed`](/guides/stripe-webhook-events/). It carries
everything you need to act: the customer, the amount, the **decline reason**, how many times Stripe
has retried, and when it will try again.

## Option 1: Build it yourself

Register a webhook endpoint, subscribe to `invoice.payment_failed`, verify the signing secret, and
post to Slack with an [incoming webhook](https://api.slack.com/messaging/webhooks):

```js
if (event.type === 'invoice.payment_failed') {
  const inv = event.data.object;
  await postToSlack({
    text: `⚠️ Payment failed: ${inv.customer_email} — ${formatMoney(inv.amount_due, inv.currency)}`,
  });
}
```

This works, but a genuinely useful alert needs more than a line of text: the customer's name and
company (not just `cus_ABC123`), the decline reason in plain English, the retry date, and
deduplication so three retries don't post three near-identical messages. That's the part that takes
real time to build and maintain — see the [webhook guide](/guides/stripe-webhook-events/) for the
details you'd need to handle.

## Option 2: Zapier or a workflow tool

A Stripe → Slack Zap avoids hosting an endpoint, but it forwards raw fields: you'll see `cus_ABC123`
and a decline code like `insufficient_funds`, not "Jane Cooper at Initech — card declined
(insufficient funds), Stripe retries in 3 days." You also can't easily consolidate retries into one
thread. It's fine for a bare ping; it won't give the team enough to act without opening Stripe.

## Option 3: Notipus (the two-minute version)

[Notipus](https://app.notipus.com) is a purpose-built Stripe-to-Slack bridge. Point a Stripe webhook
at it, paste the signing secret, and failed-payment alerts arrive already enriched:

- **Who** — customer name, company background, and contact, not just an ID.
- **Why** — the decline reason translated into plain English.
- **What's next** — the retry count and next retry date, so you know how much time you have.
- **One message, not five** — related retries are consolidated instead of spamming the channel.

It delivers the same alerts to Telegram and Microsoft Teams too, and the same enrichment applies to
new subscriptions, upgrades, and cancellations. See the [Stripe integration](/integrations/stripe/)
to set it up.

## Whichever route you pick

The point isn't the tool — it's the reaction time. Involuntary churn is one of the most recoverable
kinds of churn there is, and the difference between saving a customer and losing them is often just
whether someone saw the alert. If you want to understand the underlying problem, read
[what involuntary churn is and how to reduce it](/blog/what-is-involuntary-churn/).
