---
title: 'Privacy Policy - Notipus'
description: 'How Notipus collects, uses, and protects your data. UK GDPR compliant privacy policy.'
---

**Last updated: January 2026**

## Introduction

This privacy policy explains how Notipus ("we", "us", "our") collects, uses, stores, and protects your personal data when you use our service.

Notipus is a multi-tenant SaaS notification service that receives webhook events from business tools (such as payment processors and e-commerce platforms) and delivers formatted notifications to team communication platforms. We are committed to protecting your privacy and handling your data transparently and in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

## Data Controller

The data controller responsible for your personal data is:

**Viktopia UK Ltd**  
17-18 Berkeley Square  
Clifton, Bristol  
BS8 1HB  
England

For any privacy-related enquiries, please contact us at: **support@notipus.com**

## Our Role: Controller and Processor

We act in different capacities depending on the type of data:

- **Data Controller**: For account holder information (your registration details, authentication credentials, and workspace settings), we determine the purposes and means of processing.
- **Data Processor**: For business event data received via webhooks from your connected third-party services, we process this data on your behalf according to your instructions.

## Data We Collect

### Account Holder Data (Controller)

When you create an account and use Notipus, we collect:

- **Account information**: Email address, name, and username
- **Authentication credentials**: Passkey/WebAuthn credentials (public keys and credential IDs) and device information (user agent string)
- **Single Sign-On (SSO) data**: Slack user ID and profile information obtained via Slack OpenID Connect
- **Workspace/organisation details**: Organisation name, subscription plan, and billing status
- **Integration credentials**: OAuth tokens and webhook secrets for connected services (stored securely)

**We do not collect or store passwords.** Authentication is exclusively via Single Sign-On (Slack) and Passkeys (WebAuthn), which significantly reduces the risk of credential breaches.

### Business Event Data (Processor)

When you connect third-party services to Notipus, we receive business event data on your behalf, which may include:

- Customer identifiers and email addresses
- Transaction amounts, currencies, and payment status
- Subscription and order details, including lifecycle events
- Payment method information (card type and last 4 digits only)
- Order line items and fulfilment status

The specific data received depends on which services you connect and how you configure your integrations.

## How We Use Your Data

We process your data for the following purposes:

1. **Service delivery**: Receiving, validating, and parsing webhook events into a standardised format
2. **Data enrichment**: Using customer email domains to retrieve publicly available company information (such as logos, industry, and company descriptions) from third-party enrichment services
3. **Cross-referencing**: Correlating events from different connected platforms to provide unified insights
4. **Notification formatting**: Transforming data into human-readable notifications
5. **Notification delivery**: Sending formatted notifications to your configured destinations (such as Slack)
6. **Account management**: Managing your account, authentication, and workspace settings
7. **Service improvement**: Analysing usage patterns to improve our service (using aggregated, anonymised data where possible)
8. **Security and fraud prevention**: Protecting our service and users from malicious activity

## Legal Bases for Processing

We process personal data under the following legal bases:

- **Contract performance**: Processing necessary to provide the Notipus service as agreed when you sign up
- **Legitimate interests**: Service improvement, security monitoring, and fraud prevention, where these interests are not overridden by your rights
- **Consent**: For optional features and marketing communications, where applicable. You may withdraw consent at any time

## Third-Party Services

We use the following categories of third-party services to operate Notipus:

| Service Type | Purpose | Data Shared |
|--------------|---------|-------------|
| **Slack** | Authentication (SSO) and notification delivery | User email and profile for login; formatted notification content for delivery |
| **Brandfetch** | Company and brand enrichment | Domain names only (to retrieve publicly available company information) |
| **Sentry** | Error monitoring and diagnostics | Error logs, request context, and IP addresses |
| **Infrastructure providers** | Hosting and data storage | All service data (processed within secure data centres) |

We may use additional services in these categories as our service evolves. All third-party services are selected based on their security practices and compliance with applicable data protection laws.

## Data Storage and Security

### Where We Store Data

- **Database**: Persistent storage of accounts, workspaces, integration settings, and processed event records
- **Cache**: Temporary storage (with time-to-live expiration) for rate limiting, recent activity tracking, and enrichment data
- **Credentials**: OAuth tokens and webhook secrets are stored securely in our database
- **Passkey data**: Only public keys and credential identifiers are stored; private keys never leave your device

### Security Measures

We implement appropriate technical and organisational measures to protect your data:

- **Passwordless authentication only**: Using Passkeys (WebAuthn) and Slack SSO eliminates password-related vulnerabilities
- **Webhook signature validation**: All incoming webhooks are validated using HMAC/SHA-256 signatures
- **OAuth security**: State parameters for CSRF protection on all OAuth flows
- **Multi-tenant isolation**: Strict separation ensures workspaces cannot access each other's data
- **Secure credential storage**: WebAuthn credentials are stored as public keys only; private keys remain on your devices

## Data Retention

We retain data for the following periods:

| Data Type | Retention Period |
|-----------|------------------|
| Invitation tokens | 7 days (then automatically deleted) |
| Authentication challenges | 1 hour (then automatically deleted) |
| Cached enrichment data | Retained indefinitely (refreshed periodically) |
| Event and transaction records | Retained until deleted by you or upon workspace deletion |
| Account data | Retained until account deletion; workspace deletion cascades to all associated data |

You can request deletion of your data at any time by contacting us or deleting your workspace through the application.

## International Data Transfers

Our infrastructure providers may process data in locations outside the United Kingdom. Where personal data is transferred internationally, we ensure appropriate safeguards are in place, such as:

- Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office
- Transfers to countries with adequate data protection laws
- Other legally approved transfer mechanisms

## Your Rights

Under UK GDPR, you have the following rights regarding your personal data:

- **Right of access**: Request a copy of the personal data we hold about you
- **Right to rectification**: Request correction of inaccurate or incomplete data
- **Right to erasure**: Request deletion of your personal data (the "right to be forgotten")
- **Right to restrict processing**: Request limitation of how we process your data
- **Right to data portability**: Receive your data in a structured, commonly used format
- **Right to object**: Object to processing based on legitimate interests
- **Rights related to automated decision-making**: We do not currently make solely automated decisions with legal or significant effects

To exercise any of these rights, please contact us at **support@notipus.com**. We will respond to your request within one month.

If you are not satisfied with how we handle your request, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at [ico.org.uk](https://ico.org.uk).

## Cookies and Tracking

The Notipus marketing website uses Google Analytics to understand how visitors use our site. This involves cookies that collect anonymised usage data. You can opt out of Google Analytics by using browser extensions or adjusting your browser settings.

The Notipus application itself uses only essential cookies required for authentication and session management.

## Children's Privacy

Notipus is a business service not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us immediately.

## Changes to This Policy

We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will:

- Update the "Last updated" date at the top of this policy
- Notify registered users via email or through the application where appropriate

We encourage you to review this policy periodically.

## Contact Us

If you have any questions about this privacy policy or our data practices, please contact us:

**Email**: support@notipus.com

**Post**:  
Viktopia UK Ltd  
17-18 Berkeley Square  
Clifton, Bristol  
BS8 1HB  
England
