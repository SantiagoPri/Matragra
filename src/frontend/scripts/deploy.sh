#!/usr/bin/env bash
ENVIRONMENT=production
FRONTEND_BUCKET_NAME=matragra-frontend
REGION=us-east-2
PROFILE=personal
# FRONTEND_DISTRIBUTION=E10N9TXNDSE5BW
echo "Prebuild starting..."
echo 'Removing current build folder'
rm -rf deploy 
echo 'Installing all dependencies in production mode'
npm install --production=true
echo "Building package..."
npm run build #:$ENVIRONMENT
echo "Updating s3..."s3://$FRONTEND_BUCKET_NAME
aws --profile $PROFILE --region $REGION s3 cp build s3://$FRONTEND_BUCKET_NAME/ --recursive --acl public-read
# echo "Creating invalidation for cloudfront..."
# aws --profile $PROFILE --region $REGION cloudfront create-invalidation --distribution-id $FRONTEND_DISTRIBUTION --paths "/*"
echo "Installing packages again"
npm install
echo "ALL DONE"