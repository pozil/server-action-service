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
            component.find('isBackground').get('v.checked'), // Toggles background
            component.find('isAbortable').get('v.checked'), // Toggles background
            false,
            $A.getCallback(response => { // Success callback
                component.set('v.response', response);
            }),
            $A.getCallback(errors => { // Error callback
                // In this example, we only display the first error message because we triggered the error ourself
                // In all other use cases make sure to display ALL error message or leave the default error handling do it
                component.set('v.response', errors[0].message);
            })
        );
    }
})
