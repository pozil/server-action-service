#!/bin/bash

# Set parameters
ORG_ALIAS="sas-dev"

echo ""
echo "Installing Server Action Service (SAS):"
echo "- Org alias:      $ORG_ALIAS"
echo ""

# Install script
./set-env.sh dev && \
echo "Creating scratch org..." && \
sfdx force:org:create -s -f config/project-scratch-def.json -a $ORG_ALIAS -d 30 && \
echo "" && \
echo "Pushing source..." && \
sfdx force:source:push -u $ORG_ALIAS && \
echo "" && \
echo "Opening sample app..." && \
sfdx force:org:open -u $ORG_ALIAS -p /c/SampleServerActionApp.app
EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Installation completed."
else
    echo "Installation failed."
fi
exit $EXIT_CODE
