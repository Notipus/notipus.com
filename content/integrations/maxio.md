---
title: 'Maxio (Chargify) Slack Notifications — Subscription & Dunning Alerts'
description:
  'Get Maxio (formerly Chargify) subscription, renewal, and dunning notifications in Slack —
  enriched with customer context, lifetime value, and churn-risk flags.'
weight: 3
provider: 'Maxio'
logo: '/images/maxio.svg'
cardTitle: 'Maxio (Chargify) + Slack'
cardText:
  'Renewals, dunning, plan changes, and component usage — the deepest event coverage of any
  Maxio-to-Slack integration.'
cardCta: 'See Maxio events'
heroTitle:
  'Maxio subscription alerts in Slack — <span class="highlight">renewals, dunning, churn risk</span>'
heroIntro:
  'Notipus speaks fluent Chargify: renewals, failed payments and retries, plan and state changes,
  refunds, and component allocations all land in your channel with customer context attached. Setup
  takes about two minutes.'
ctaLabel: 'Connect Maxio'
ctaTitle: 'Stop living in the Maxio dashboard.'
trustLine:
  'Works with Maxio Advanced Billing (Chargify) · Replay-protected webhooks · Free plan available'
setupTitle: 'Connected in about two minutes'
eventsIntro:
  'Maxio’s webhook vocabulary is the richest of the providers Notipus supports — and it’s all
  covered, from signups to dunning to component usage.'
mock:
  time: '3:15 PM'
  headline: '✅ $499.00 from Initrode'
  milestone: '🔄 Renewal — 2 years a customer!'
  meta: '💳 Maxio • 🔄 Renewal (Annual) • Amex ••••1007'
  details:
    - label: 'Plan'
      value: 'Business'
    - label: 'ID'
      value: 'sub_initrode_889'
  company: 'Initrode'
  companyMeta: 'Industrial software • Founded 1979'
  badge: '⭐ VIP'
  email: 'snagheenanajar@initrode.com'
  since: 'Since Aug 2023'
  ltv: '$11.2k'
  buttons:
    - 'View in Maxio'
    - 'LinkedIn'
events:
  - event: 'payment_success / payment_failure'
    becomes: 'Payments in and payments failed, with retry tracking'
  - event: 'renewal_success / renewal_failure'
    becomes: 'Renewals — anniversaries and VIP customers are called out'
  - event: 'refund_success'
    becomes: 'Refund issued, with the customer’s history attached'
  - event: 'subscription_state_change'
    becomes: 'Cancellations, reactivations, expirations, and holds'
  - event: 'subscription_product_change'
    becomes: 'Upgrades and downgrades, including the previous plan'
  - event: 'signup_success / signup_failure'
    becomes: 'New signups — and signups that failed before they became customers'
  - event: 'customer_create / customer_update'
    becomes: 'New and changed customers, enriched with company background'
  - event: 'component_allocation_change'
    becomes: 'Usage component changes, so expansion revenue is visible'
  - event: 'invoice / statement events'
    becomes: 'Invoice and statement activity worth knowing about'
steps:
  - title: 'Sign in with Slack'
    text: 'One click with your Slack account. Pick the channel your alerts should land in.'
  - title: 'Add the webhook in Maxio'
    text:
      'Copy your workspace’s webhook URL from Notipus into Maxio’s webhook settings, and paste the
      shared secret back into Notipus. About two minutes, once.'
  - title: 'Get your first alert'
    text:
      'The next Maxio event posts to your channel, enriched with company background, lifetime value,
      and risk flags.'
faq:
  - q: 'Does this work with Chargify, or only Maxio?'
    a:
      'Both — they’re the same product. Maxio Advanced Billing is the current name for Chargify, and
      Notipus supports its webhook format in full.'
  - q: 'How are webhooks secured?'
    a:
      'Every delivery is validated with HMAC signatures (SHA-256, with legacy MD5 support) and
      timestamp-based replay protection.'
  - q: 'Why use this instead of a Zapier zap?'
    a:
      'Zapier can relay a Maxio event; Notipus understands it. Dunning retries, plan changes with
      the previous plan, anniversaries, VIP and at-risk flags, and component usage changes come
      through as readable alerts with the customer’s full context — and duplicates are consolidated.'
  - q: 'What does it cost?'
    a:
      'There’s a free plan (20 events/month), and paid plans from $29/month with a 14-day trial. See
      [pricing](/pricing/).'
---
