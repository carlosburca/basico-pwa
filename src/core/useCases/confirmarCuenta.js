export default async ({
	username, 
	confirmCode, 
	credentials,
	Authentication,
	successCallback,
	errorCallback
}) => {
	if(confirmCode) {	
		const Auth = new Authentication(credentials);

		try {
			await Auth.confirmSignUp(username, confirmCode);
			successCallback();
		} catch(error) {
			errorCallback(error);	
		}

	} else {
		errorCallback('Para continuar debe ingresar su código de confirmación');
	}
};