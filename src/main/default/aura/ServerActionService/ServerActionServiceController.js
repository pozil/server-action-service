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
            if (state === 'SUCCESS') {
                // Call custom success callback if applicable
                if (params.successCallback) {
                    params.successCallback(response.getReturnValue());
                }
            }
            else if (state === 'ERROR') {
                const errors = response.getError();
                helper.handleErrors(params, errors);
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

        // Set action to execute in background if applicable
        if (params.isBackground) {
            action.setBackground();
        }

        // Set action as abortable if applicable
        if (params.isAbortable) {
            action.setAbortable();
        }

        // Call server-side action
        $A.enqueueAction(action);
    },

    callServerPromise : function(component, event, helper) {
        const that = this;
        return new Promise(function(resolve,reject) {
            const params = event.getParam('arguments');
        
            const action = params.action;
            
            // Pass action parameters if applicable
            if (params.params !== null) {
                action.setParams(params.params);
            }

            action.setCallback(that, function(response) {
                const state = response.getState();
                if (state === 'SUCCESS') {
                    resolve(response.getReturnValue());
                }
                else if (state === 'ERROR') {
                    const errors = response.getError();
                    helper.handleErrors(params, errors);
                    reject(errors);
                }
            });

            // Set action as storable if applicable
            if (params.isStorable) {
                action.setStorable();
            }

            // Set action to execute in background if applicable
            if (params.isBackground) {
                action.setBackground();
            }

            // Set action as abortable if applicable
            if (params.isAbortable) {
                action.setAbortable();
            }

            // Call server-side action
            $A.enqueueAction(action);
        });
    }
})