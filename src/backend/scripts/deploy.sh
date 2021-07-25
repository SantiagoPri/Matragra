#!/usr/bin/env bash
PACKAGE_MANAGER=npm
ZIP_NAME=matragra.zip
ZIP_FOLDERS=node_modules\ App\ package.json\ lambda
REGION=us-east-2
PROFILE=personal
BUCKET_NAME=matragra-lambda-code
BACKEND_LAMBDA_NAME=matragra_api-handler
EMAIL_LAMBDA_NAME=matragra_email-sender
echo 'Removing current node_modules folder and others'
rm -rf node_modules
rm -rf deploy
rm -rf $ZIP_NAME
echo 'Making temporaly folder deploy'
mkdir deploy
echo 'Installing all dependencies in production mode'
$PACKAGE_MANAGER install --production=true
echo 'Copying neccesary files to the deploy folder'
cp -R $ZIP_FOLDERS deploy
cd deploy
echo 'Generating zip file for production'
zip -q -r $ZIP_NAME *
cp -r $ZIP_NAME ../
cd ..
echo 'Removing deploy folder'
rm -rf deploy
echo 'Deploy package has been generated'
echo "Updating s3..."
aws --profile $PROFILE --region $REGION s3 cp $ZIP_NAME  s3://$BUCKET_NAME
# echo "Updating lambda:" $BACKEND_LAMBDA_NAME
# aws --profile $PROFILE --region $REGION lambda update-function-code --function-name $BACKEND_LAMBDA_NAME --s3-bucket $BUCKET_NAME --s3-key $ZIP_NAME
echo "Updating lambda:" $EMAIL_LAMBDA_NAME
aws --profile $PROFILE --region $REGION lambda update-function-code --function-name $EMAIL_LAMBDA_NAME --s3-bucket $BUCKET_NAME --s3-key $ZIP_NAME
echo "Installing again all Dev Dependencies"
$PACKAGE_MANAGER install
echo "ALL DONE"