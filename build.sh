#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci

echo "Building Next.js app..."
npm run build

echo "Checking output directory..."
if [ -d "out" ]; then
  echo "✓ Output directory 'out' found"
  ls -la out/
  exit 0
else
  echo "✗ ERROR: Output directory 'out' not found"
  echo "Checking .next directory..."
  ls -la .next/ || true
  exit 1
fi
