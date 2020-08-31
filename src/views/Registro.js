import React, { useState } from 'react';
//import Marca from 'assets/img/logo/marca-ejemplo.png';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Row, Card, Col, Button, Alert } from 'reactstrap';
import Authentication from 'cl-abstra-auth';
import credentials from '../core/frameworks/cognitoCredentials';
import registrarse from '../core/useCases/registrarse';

const Registro = (props) => {

	const [values, setValues] = useState({ nombreUsuario: '', email: '', password: '', rpassword: '' });
	const [conditions, setConditions] = useState(false);
	const [estadoError, setEstadoError] = useState(false);
	const [mensajeError, setMensajeError] = useState('')
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	}

	const handleRadioButton = () => {
		setConditions(!conditions)
	};


	const successCallback = () => {
		setLoading(false);
		const { history } = props;
		const { email } = values;
		history.push('/confirmarcuenta', { user: email });
	}
	const errorCallback = (error) => {
		setEstadoError(true);
		setMensajeError(error);
		setLoading(false);
	}

	const registerUser = (e) => {
		e.preventDefault();
		setLoading(true);
		const { nombreUsuario, email, password, rpassword } = values;
		registrarse({
			nombreUsuario,
			email,
			password,
			rpassword,
			credentials,
			conditions,
			Authentication,
			successCallback: successCallback,
			errorCallback: errorCallback
		});
	}

	// oculta mensaje de error
	const onDismiss = () => {
		setEstadoError(false);
	};


	return (
		<Row style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }} className="no-mar-h">
			<Col md={6} lg={4}>
				<Card body className="borde-login">
					<Form >
						<div className="text-center pb-4">
							{/* <img
								src={Marca}
								className=""
								style={{ width: 250, height: 'auto', cursor: 'pointer' }}
								alt="Plantilla abstrahere"
								target='_blank' /> */}
						</div>
						{
							estadoError &&
							<Alert color="danger" isOpen={estadoError} toggle={onDismiss} >
								<h6 className="alert-heading">Error</h6>
								<p>{mensajeError}</p>
							</Alert>
						}

						<FormGroup>
							<Label>Nombre usuario</Label>
							<Input onChange={handleChange} placeholder="usuario" type="text" name="nombreUsuario" />
						</FormGroup>

						<FormGroup>
							<Label>Email</Label>
							<Input onChange={handleChange} placeholder="usuario@abstrahere.com" type="email" name="email" />
						</FormGroup>

						<FormGroup>
							<Label>Contraseña</Label>
							<Input onChange={handleChange} placeholder="Contraseña" type="password" name="password" />
						</FormGroup>

						<FormGroup>
							<Label>Confirmar contraseña</Label>
							<Input onChange={handleChange} placeholder="Repetir contraseña" type="password" name="rpassword" />
						</FormGroup>

						<FormGroup check>
							<Label check>
								<Input type="checkbox" onClick={handleRadioButton} />
            					Estoy de acuerdo con los términos y la política
          					</Label>
						</FormGroup>
						<hr />
						<Button disabled={loading} size="lg" type="submit" className="bg-gradient-theme-left border-0 btn-block" onClick={registerUser}>
							{loading ? 'Cargando...' : 'Registrar'}
						</Button>
					</Form>

					<div className="text-center pt-1">
						<h6>o</h6>
						<h6> <Link to="/">Ingresar</Link> </h6>
					</div>

				</Card>
			</Col>
		</Row>
	)

};

export default Registro; 