#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci

echo "Building Next.js app..."
npm run build

echo "Build complete! Output directory: out"
ls -la out/
