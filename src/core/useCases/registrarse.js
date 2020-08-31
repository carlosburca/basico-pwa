import Utils from '../../utils/utils';

export default async ({
	nombreUsuario,
	email,
	password,
	rpassword,
	credentials,
	conditions,
	Authentication,
	successCallback,
	errorCallback
}) => {
	if (nombreUsuario && email && password && rpassword) {
		if (conditions) {
			if (password === rpassword) {
				if (Utils.validateEmail(email) && nombreUsuario) {
					const Auth = new Authentication(credentials);

					try {
						const custom = {
							nombreUsuario: nombreUsuario,
							email: email,
						};

						await Auth.signUp(email, password, custom);
						successCallback();
					} catch (error) {
						errorCallback(error);
					}

				} else {
					errorCallback('Correo inválido');
				}
			} else {
				errorCallback('Las contraseñas no coinciden');
			}
		} else {
			errorCallback('Para registrarse debe aceptar los terminos');
		}
	} else {
		errorCallback('Por favor complete todos los campos');
	}

};