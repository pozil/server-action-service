# Salesforce Lightning Server Side Actions Service Component

## About
This is a generic and reusable Lightning component that calls server-side actions.<br/>
This is a service component so it has no user interface of it's own: it is meant to be called by other components.

<b>Features</b>

The component provides the following features:
- integrated error notifications (developer console + toast notifications in Lightning Experience)
- support for storable actions (cached)
- custom success and error callbacks

## Documentation
The component is documented using Aura documentation.<br/>
You can access it from this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/auradocs/reference.app#reference?descriptor=c:ServerActionService&defType=component

Use the service by adding the component to a parent component's markup:
```xml
<!-- Add dependency to server side action service -->
<c:ServerActionService aura:id="server"/>
```

Then, simply call a server-side action from the parent's component controller like this:
```js
// Get server action service
const server = component.find('server');
// Get server-side action
const action = component.get('c.anAction');
// Call server-side action with no parameters
server.callServer(action);
```

Server-side actions can also be called with parameters, custom success and error handlers:
```js
server.callServer(
    action, // Server-side action
    parameters, // Action parameters
    false, // Disable cache
    $A.getCallback(response => { // Custom success callback
        // Handle response
    }),
    $A.getCallback(errors => { // Custom error callback
        // Handle errors
    })
);
```


## Salesforce DX setup instructions
Deploy the sample application with Salesforce DX by clicking on this button:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)


## Sample application
The default installation installs the component and a sample application available under this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/c/SampleApp.app

If you wish to install the project without the sample application, edit `sfdx-project.json` and remove the `src-sample` path.
