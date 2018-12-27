({
    onCallServer : function(component, event, helper) {
        component.set('v.response', '');
        const shouldFail = (component.get('v.responseType') !== 'success');

        // Get server action service
        const server = component.find('server');
        // Get server-side action
        const anAction = component.get('c.anAction');
        // Call server-side action
        server.callServer(
            anAction, // Action
            {shouldFail: shouldFail}, // Action parameters
            component.find('isStorable').get('v.checked'), // Toogles cache
            $A.getCallback(function(response) { // Success callback
                component.set('v.response', response);
            }),
            $A.getCallback(function(errors) { // Error callback
                // In this example, we only display the first error message because we triggered the error ourself
                // In all other use cases make sure to display ALL error message or leave the default error handling do it
                component.set('v.response', errors[0].message);
            }),
            false, // Keep built-in error handling
            component.find('isBackground').get('v.checked'), // Toggles background
            component.find('isAbortable').get('v.checked') // Toggles abortable
        );

        // Or use a promise to call server-side action (Not supported in IE11)
        /*
        server.callServerPromise(
            anAction, // Action
            {shouldFail: shouldFail}, // Action parameters
            component.find('isStorable').get('v.checked'), // Toogles cache
            false, // Keep built-in error handling
            component.find('isBackground').get('v.checked'), // Toggles background
            component.find('isAbortable').get('v.checked') // Toggles abortable
        ).then($A.getCallback(response => { // Success callback
            component.set('v.response', response);
        })).catch($A.getCallback(errors => {
            component.set('v.response', errors[0].message);
        }));
        */
    }
})
