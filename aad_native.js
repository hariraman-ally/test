const msalConfig = {
    auth: {
      clientId: "d06ede80-5e88-4536-9e63-7691340099a4",
      authority: "https://login.microsoftonline.com/organizations",
      // navigateToLoginRequestUrl: true,
      redirectUri: "http://localhost:3000/aad_index"
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case msal.LogLevel.Error:
              console.error(message);
              return;
            case msal.LogLevel.Info:
              console.info(message);
              return;
            case msal.LogLevel.Verbose:
              console.debug(message);
              return;
            case msal.LogLevel.Warning:
              console.warn(message);
              return;
          }
        }
      }
    }
  };

  const loginRequest = {
    scopes: ["User.Read"]
  };

  const myMSALObj = new msal.PublicClientApplication(msalConfig);
  function init() {
    myMSALObj.handleRedirectPromise()
      .then((response) => {
        console.log('came inside promise ' + response);
        handleResponse(response)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    init()
    myMSALObj.loginRedirect(loginRequest);
  }

  function handleResponse(response) {
    if (response !== null) {
      console.log("response is " + response)

    } else {
      // selectAccount();
    }
  }

  function seeProfile() {
    getTokenRedirect(loginRequest)
      .then(response => {
        console.log(response)
      }).catch(error => {
      console.error(error);
    });
  }
