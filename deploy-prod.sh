#!/bin/bash

# Set parameters
PROD_ORG_ALIAS="sas-prod"
TEMP_DIR="mdapi"

echo ""
echo "Deploying Server Action Service (SAS) to production:"
echo "- Org alias:      $PROD_ORG_ALIAS"
echo ""

# Install script
./set-env.sh prod && \
rm -fr $TEMP_DIR && \
mkdir $TEMP_DIR && \
sfdx force:source:convert -r src -d $TEMP_DIR && \
sfdx force:mdapi:deploy -u $PROD_ORG_ALIAS -d $TEMP_DIR -w 10 && \
rm -fr $TEMP_DIR && \
./set-env.sh dev
EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Production deployment completed."
else
    echo "Production deployment failed."
fi
exit $EXIT_CODE
