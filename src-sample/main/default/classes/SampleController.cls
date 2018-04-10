public with sharing class SampleController {
    
    @AuraEnabled
    public static String anAction(Boolean shouldFail) {
        if (shouldFail) {
            String message = 'The server call failed but that was expected.\n\n'
                +'You should see error details in your browser\'s developer console\n'
                +'If you are running this component in the Lightning Experience, you should also see a toast notification.';
            throw new AuraHandledException(message);
        }
        return 'It worked as expected.';
    }
}