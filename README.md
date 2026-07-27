# notipus.com

Notipus is a real-time customer intelligence platform that sends instant, contextual notifications
to Slack about customer events from various services.

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Notipus/Notipus)

## Development

First, install dependencies:

```bash
bun install
```

To run the site locally:

```bash
# Start Tailwind CSS build in watch mode
bun run dev

# In another terminal, start the server:
docker-compose up
```

For production build:

```bash
# Build and minify CSS
bun run build
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the master branch. The
deployment process is handled by GitHub Actions and consists of two main jobs:

### Build Job

1. Sets up Bun and Hugo (extended)
2. Installs dependencies using `bun install`
3. Lints and format-checks (`bun run lint`, `bun run format:check`)
4. Builds the static site with `hugo --minify`

### Deploy Job

1. Takes the built artifacts
2. Deploys to GitHub Pages
3. Updates the environment URL

You can view the deployment status and history in the Actions tab of the repository.

## Structure

- `index.html` - Landing page
- `form.html` - Sign up form
- `css/` - Stylesheets
  - `input.css` - Source Tailwind CSS
  - `style.css` - Built CSS (generated)
- `img/` - Images and assets
- `js/` - JavaScript files
  - `analytics.js` - Google Analytics and event tracking
- `.github/workflows/` - CI/CD configuration
  - `deploy.yml` - GitHub Actions workflow

## Form Integration

The sign-up form integrates with Google Forms for data collection. The form submission is handled by
Google Apps Script.

## Analytics

The site uses Google Analytics 4 for tracking:

- Page views
- "Get Started" button clicks (tracked by location: hero or navigation)
- Form submissions (tracked with status: attempt, success, or error)

## Technologies

- Tailwind CSS for styling
- Google Analytics 4 for tracking
- Google Apps Script for form handling
- Docker for local development
- Hugo (extended) as the static site generator
- Bun as the package manager and JS runtime
- GitHub Actions for CI/CD
  - GitHub Pages deployment

## Contributing

Before submitting a PR:

1. Build the project locally to verify changes
2. Test your changes manually in different browsers
