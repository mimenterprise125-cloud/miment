#!/usr/bin/env node

/**
 * Post-build hook for Cloudflare Workers deployment
 * 
 * This script runs after `npm run build` and ensures the Worker
 * has the correct configuration pointing to dist/server/server.js
 */

const fs = require('fs');
const path = require('path');

const distServerPath = path.join(__dirname, 'dist', 'server');
const wranglerJsonPath = path.join(distServerPath, 'wrangler.json');

// Configuration for Cloudflare Workers
const wranglerConfig = {
  name: 'miment',
  main: 'server.js', // Relative to dist/server
  compatibility_date: '2025-09-24',
  compatibility_flags: ['nodejs_compat_v2'],
  assets: {
    directory: '../client'
  },
  vars: {
    ENVIRONMENT: 'production'
  }
};

try {
  // Create wrangler.json in dist/server
  fs.writeFileSync(wranglerJsonPath, JSON.stringify(wranglerConfig, null, 2));
  console.log('✅ Created dist/server/wrangler.json with correct configuration');
  console.log(`   Main entry: ${wranglerConfig.main}`);
  console.log(`   Assets directory: ${wranglerConfig.assets.directory}`);
} catch (error) {
  console.error('❌ Failed to create dist/server/wrangler.json:', error.message);
  process.exit(1);
}
