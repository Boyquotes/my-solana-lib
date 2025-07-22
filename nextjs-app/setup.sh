#!/bin/bash

echo "Setting up CyberGold SDK Next.js demo app..."

# Navigate to library directory and build
echo "Building the CyberGold SDK library..."
cd ..
npm install
npm run build

# Navigate back to Next.js app and install dependencies
echo "Installing Next.js app dependencies..."
cd nextjs-app
npm install

echo "Setup complete!"
echo "You can now run 'npm run dev' to start the CyberGold SDK demo."
