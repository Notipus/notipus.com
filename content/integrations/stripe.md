---
title: 'Stripe Slack Notifications — Enriched Payment Alerts'
description:
  'Get Stripe payment, subscription, and failed-payment notifications in Slack — enriched with
  company and contact context, decline reasons, and retry schedules. One-click OAuth setup.'
weight: 1
provider: 'Stripe'
logo: '/images/stripe.svg'
cardTitle: 'Stripe + Slack'
cardText:
  'Subscriptions, invoices, failed payments, and trials — with one-click OAuth that creates the
  webhook endpoint for you.'
cardCta: 'See Stripe events'
heroTitle:
  'Stripe payment notifications in Slack — <span class="highlight">with customer context</span>'
heroIntro:
  "Every Stripe subscription, invoice, and failed payment lands in your channel with the customer's
  company and contact attached — plus decline reasons, retry schedules, trial conversions, and
  upgrade callouts straight from the event. Connect with one click — Stripe Connect creates the
  webhook endpoint for you."
ctaLabel: 'Connect Stripe'
ctaTitle: "If you could go ahead and connect Stripe, that'd be great."
trustLine: 'One-click OAuth · No webhook secrets to copy · Free plan available'
setupTitle: 'Connected in three steps'
eventsIntro:
  'Notipus subscribes to the Stripe events that matter for revenue and turns each one into a
  readable alert — no raw webhook JSON.'
mock:
  time: '9:41 AM'
  headline: '⬆️ $199.00 from Initech'
  milestone: '🎉 Upgraded from $99/mo!'
  meta: '💳 Stripe • 🔄 Recurring (Monthly) • Visa ••••5555'
  details:
    - label: 'Plan'
      value: 'Business (was Pro)'
    - label: 'ID'
      value: 'sub_bolton_789'
  company: 'Initech'
  companyMeta: 'Software development • Founded 1988'
  email: 'mbolton@initech.com'
  buttons:
    - 'View in Stripe'
    - 'LinkedIn'
events:
  - event: 'customer.subscription.created'
    becomes: 'New subscription, with plan, amount, and billing interval'
  - event: 'customer.subscription.updated'
    becomes: 'Upgrade or downgrade, including the previous plan and price'
  - event: 'customer.subscription.deleted'
    becomes: 'Cancellation, with plan and customer details so you can reach out'
  - event: 'customer.subscription.trial_will_end'
    becomes: 'Trial-ending heads-up before the customer converts or churns'
  - event: 'invoice.payment_succeeded / invoice.paid'
    becomes: 'Payment received — trial conversions are called out'
  - event: 'invoice.payment_failed'
    becomes: 'Failed payment with the decline reason, retry count, and next retry date'
  - event: 'invoice.payment_action_required'
    becomes: '3-D Secure action needed, so you can nudge the customer'
  - event: 'checkout.session.completed'
    becomes: 'Checkout completed, with what was bought'
steps:
  - title: 'Sign in with Slack'
    text: 'One click with your Slack account. Pick the channel your alerts should land in.'
  - title: 'Connect Stripe'
    text:
      'Approve the Stripe Connect prompt. Notipus creates the webhook endpoint in your Stripe
      account automatically — nothing to copy or paste.'
  - title: 'Get your first alert'
    text:
      'The next Stripe event posts to your channel, enriched with company background and contact
      details.'
faq:
  - q: 'How is this different from Stripe’s official Slack app?'
    a:
      'Stripe’s app posts the event. Notipus posts the event plus who the customer is: company
      background, contact name and role, email domain badges, and callouts for trial conversions and
      plan changes with the previous plan. Related events are also consolidated into one message
      instead of several.'
  - q: 'Do I need to configure webhooks in the Stripe dashboard?'
    a:
      'No. When you connect via Stripe Connect OAuth, Notipus creates the webhook endpoint for you
      and validates every delivery with Stripe’s official signature scheme.'
  - q: 'Which Stripe events are supported?'
    a:
      'Subscription lifecycle (created, updated, deleted, trial ending), invoice payments
      (succeeded, failed, action required), and completed checkouts — see the table above. Upgrades,
      downgrades, and trial conversions are detected automatically.'
  - q: 'Does it handle currencies other than USD?'
    a:
      'Yes. Amounts are converted and formatted per currency’s real minor unit — including
      zero-decimal currencies like JPY and KRW and three-decimal currencies like BHD and KWD — so
      ¥5,000 never shows up as ¥50.00.'
  - q: 'What does it cost?'
    a:
      'There’s a free plan (20 events/month), and paid plans from $29/month with a 14-day trial. See
      [pricing](/pricing/).'
---
