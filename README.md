# notipus.com

Notipus is a real-time customer intelligence platform that sends instant, contextual notifications
to Slack about customer events from various services.

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Notipus/Notipus)

## Development

First, install dependencies:

```bash
npm install
```

To run the site locally:

```bash
# Start Tailwind CSS build in watch mode
npm run dev

# In another terminal, start the server:
docker-compose up
```

For production build:

```bash
# Build and minify CSS
npm run build
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the master branch. The
deployment process is handled by GitHub Actions and consists of two main jobs:

### Build Job

1. Sets up Node.js 20
2. Installs dependencies using `npm ci`
3. Builds the Tailwind CSS (`npm run build`)
4. Creates deployment directory with:
   - HTML files
   - Built CSS
   - Images
   - JavaScript files

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
- GitHub Actions for CI/CD
  - Node.js 20
  - GitHub Pages deployment

## Contributing

Before submitting a PR:

1. Build the project locally to verify changes
2. Test your changes manually in different browsers
