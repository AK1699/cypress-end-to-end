#!/bin/bash

echo "BITBUCKET_BRANCH value is::$BITBUCKET_BRANCH"


PIPELINE_NAME=$1
if [ ! -z "$1" ]; then
  PIPELINE_NAME=$1
else
  PIPELINE_NAME=$BITBUCKET_BRANCH
fi

echo "Running pipelines for::$PIPELINE_NAME"

set_environment_variables() {
    export AWS_ACCESS_KEY_ID=$1
    export AWS_SECRET_ACCESS_KEY=$2
    export AWS_DEFAULT_REGION=$3
    export S3_BUCKET=$4
    export APPLICATION_PROFILE=$5
    export APPLICATION_ENVIRONMENT=$6
}

###
# Main body of script starts here
####

if [ "$PIPELINE_NAME" == "cypress" ]; then
    set_environment_variables "$DEV_1PS_AWS_ACCESS_KEY_ID" "$DEV_1PS_AWS_SECRET_ACCESS_KEY" "$DEV_DEFAULT_REGION" "$DEV_1PS_S3_BUCKET" "$CYPRESS_APPLICATION_PROFILE" "$CYPRESS_APPLICATION_ENVIRONMENT"
else
    echo "Something went wrong"
fi
echo "S3_BUCKET while leaving:: $S3_BUCKET"
echo "APPLICATION_ENVIRONMENT while leaving:: $APPLICATION_ENVIRONMENT"