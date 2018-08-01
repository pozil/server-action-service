({
    displayError : function(errorMessage, actionParams) {
        // Display error in console
        console.error('Server Error: ', errorMessage);
        console.error('Action: ', actionParams.action.getName(), ' Params: ', actionParams.params);
        // Fire error toast if available
        const toastEvent = $A.get("e.force:showToast");
        if (typeof toastEvent !== 'undefined') {
            toastEvent.setParams({
                title : 'Server Error',
                message : errorMessage,
                type : 'error',
                mode: 'sticky'
            });
            toastEvent.fire();
        }
    }
})