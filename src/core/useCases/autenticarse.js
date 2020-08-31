import Utils from '../../utils/utils';

export default async ({
    username, 
    password, 
    credentials,
    Authentication,
    callbackCorrecto,
    errorCallback
}) => {
    if(username && password) {
        if(Utils.validateEmail(username)) {
            const Auth = new Authentication(credentials);
        
            try {
                await Auth.signIn(username, password);
                callbackCorrecto();
            } catch(error) {
                errorCallback(error);
            }
            
        } else {
            errorCallback('Correo inválido');
        }

    } else {
        errorCallback('Por favor complete todos los campos');
    }
};