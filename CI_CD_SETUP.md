# CI/CD Setup Guide for Food Delight Frontend

This guide explains how to set up and use the CI/CD pipeline for the Food Delight frontend application.

## 🚀 Overview

The CI/CD pipeline includes:
- **Automated Testing**: Lint, type checking, and unit tests
- **Build Process**: Production-ready builds
- **Deployment**: Automatic deployment to staging and production
- **Code Quality**: ESLint, Prettier, and TypeScript checks

## 📁 Workflow Files

### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)
- Runs on push to `main` and `develop` branches
- Includes linting, testing, building, and deployment stages
- Supports both staging and production environments

### 2. Netlify Deployment (`.github/workflows/deploy-netlify.yml`)
- Specialized for Netlify hosting
- Includes preview URLs for pull requests
- Automatic deployment on push

### 3. Vercel Deployment (`.github/workflows/deploy-vercel.yml`)
- Alternative deployment option for Vercel
- Pre-built deployment for better performance

## 🔧 Setup Instructions

### 1. GitHub Repository Setup

1. **Enable GitHub Actions**:
   - Go to your repository settings
   - Navigate to "Actions" → "General"
   - Enable "Allow all actions and reusable workflows"

2. **Set up Environments** (Optional):
   - Go to Settings → Environments
   - Create `staging` and `production` environments
   - Add protection rules if needed

### 2. Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### For Netlify Deployment:
```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

#### For Vercel Deployment:
```
VERCEL_TOKEN=your_vercel_token
```

### 3. Local Development Setup

Install additional development dependencies:

```bash
npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## 🏃‍♂️ Running the Pipeline

### Automatic Triggers
- **Push to `main`**: Triggers production deployment
- **Push to `develop`**: Triggers staging deployment
- **Pull Request**: Runs tests and builds (no deployment)

### Manual Triggers
- Go to Actions tab in GitHub
- Select the workflow you want to run
- Click "Run workflow"

## 📊 Pipeline Stages

### 1. Lint and Test
- **ESLint**: Code quality checks
- **TypeScript**: Type checking
- **Jest Tests**: Unit tests with coverage
- **Code Coverage**: Uploads to Codecov

### 2. Build
- **Dependencies**: Install with `npm ci`
- **Build**: Create production build
- **Artifacts**: Upload build files

### 3. Deploy
- **Staging**: Deploy from `develop` branch
- **Production**: Deploy from `main` branch

## 🛠️ Available Scripts

```bash
# Development
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run test:watch # Run tests in watch mode

# Code Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run type-check # TypeScript type checking
npm run format     # Format code with Prettier
npm run format:check # Check code formatting
```

## 🔍 Monitoring and Debugging

### 1. GitHub Actions Logs
- Go to Actions tab in your repository
- Click on any workflow run
- View detailed logs for each step

### 2. Deployment Status
- Check deployment URLs in workflow comments
- Monitor deployment status in hosting platform

### 3. Test Coverage
- View coverage reports in Codecov
- Coverage thresholds can be configured

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Review ESLint configuration

2. **Deployment Failures**:
   - Verify secrets are correctly set
   - Check hosting platform configuration
   - Review deployment logs

3. **Test Failures**:
   - Run tests locally: `npm test`
   - Check test coverage
   - Review test configuration

### Debug Commands

```bash
# Local testing
npm run lint
npm run type-check
npm test -- --coverage --watchAll=false

# Build testing
npm run build
npm run build -- --verbose
```

## 🔄 Branch Strategy

### Recommended Workflow

1. **Feature Development**:
   - Create feature branch from `develop`
   - Make changes and push
   - Create pull request to `develop`

2. **Staging**:
   - Merge to `develop` triggers staging deployment
   - Test in staging environment
   - Create pull request to `main`

3. **Production**:
   - Merge to `main` triggers production deployment
   - Monitor production deployment

## 📈 Best Practices

1. **Code Quality**:
   - Always run `npm run lint` before committing
   - Fix all TypeScript errors
   - Maintain good test coverage

2. **Deployment**:
   - Test in staging before production
   - Monitor deployment logs
   - Use feature flags for risky changes

3. **Security**:
   - Never commit secrets to repository
   - Use environment variables for sensitive data
   - Regularly update dependencies

## 🆘 Support

For issues with the CI/CD pipeline:
1. Check GitHub Actions logs
2. Review this documentation
3. Check hosting platform documentation
4. Contact the development team

---

**Last Updated**: $(date)
**Version**: 1.0.0 