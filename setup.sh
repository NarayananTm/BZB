#!/bin/bash

# BZB Platform - Quick Setup Script
# This script automates the initial setup

echo "🚀 BZB Platform - Initialization Script"
echo "========================================"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node.js: $NODE_VERSION"

# Check npm version
echo "✓ Checking npm version..."
NPM_VERSION=$(npm -v)
echo "  npm: $NPM_VERSION"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔍 Running TypeScript check..."
npm run type-check

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Visit: http://localhost:3000"
echo "3. Read: PROJECT_SUMMARY.md for next steps"
echo ""
echo "Happy coding! 🎉"
