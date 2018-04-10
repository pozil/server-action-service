({
    callServer : function(component, event, helper) {
        const params = event.getParam('arguments');
        
        const action = params.action;
        
        // Pass action parameters if applicable
        if (params.params !== null) {
            action.setParams(params.params);
        }

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                // Call custom success callback if applicable
                if (params.successCallback) {
                    const returnValue = response.getReturnValue();
                    params.successCallback(returnValue);
                }
            }
            else if (state === "ERROR") {
                const errors = response.getError();
                
                // Display error if applicable
                if (params.disableErrorNotification === null || !params.disableErrorNotification) {
                    let isUnknownError = true;
                    // Retrieve and display the error message(s) sent by the server
                    if (typeof errors !== 'undefined' && Array.isArray(errors) && errors.length > 0) {
                        errors.forEach(error => {
                            // Check for 'regular' errors
                            if (typeof error.message != 'undefined') {
                                helper.displayError(error.message);
                                isUnknownError = false;
                            }
                            // Check for 'pageError' errors
                            const pageErrors = error.pageErrors;
                            if (typeof pageErrors !== 'undefined' && Array.isArray(pageErrors) && pageErrors.length > 0) {
                                pageErrors.forEach(pageError => {
                                    if (typeof pageError.message !== 'undefined') {
                                        helper.displayError(pageError.message);
                                        isUnknownError = false;
                                    }
                                });
                            }
                        });
                    }
                    // Make sure that we display at least one error message
                    if (isUnknownError) {
                        helper.displayError('Unknown error');
                    }
                    // Display raw error stack in console
                    console.error(JSON.stringify(errors));
                }

                // Call custom error callback if applicable
                if (params.errorCallback) {
                    params.errorCallback(errors);
                }
            }
        });

        // Set action as storable if applicable
        if (params.isStorable) {
            action.setStorable();
        }

        // Call server-side action
        $A.enqueueAction(action);
    }
})