module.exports = {
  // Environment configurations
  environments: {
    development: {
      API_BASE_URL: 'http://localhost:3000/api',
      NODE_ENV: 'development',
      REACT_APP_ENV: 'development'
    },
    staging: {
      API_BASE_URL: 'https://staging-api.fooddelight.com/api',
      NODE_ENV: 'production',
      REACT_APP_ENV: 'staging'
    },
    production: {
      API_BASE_URL: 'https://api.fooddelight.com/api',
      NODE_ENV: 'production',
      REACT_APP_ENV: 'production'
    }
  },

  // Build configurations
  build: {
    outputDir: 'build',
    sourceMap: false,
    minify: true,
    optimize: true
  },

  // Deployment platforms
  platforms: {
    netlify: {
      buildCommand: 'npm run build',
      publishDirectory: 'build',
      environmentVariables: {
        NODE_VERSION: '18'
      }
    },
    vercel: {
      buildCommand: 'npm run build',
      outputDirectory: 'build',
      framework: 'create-react-app'
    }
  },

  // Quality gates
  qualityGates: {
    testCoverage: 80,
    maxBuildTime: 300, // 5 minutes
    maxBundleSize: 5000000 // 5MB
  }
}; 