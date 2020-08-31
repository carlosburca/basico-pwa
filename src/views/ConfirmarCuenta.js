import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Row, Card, Col, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
//import Marca from 'assets/img/logo/marca-ejemplo.png';
import Authentication from 'cl-abstra-auth';
import credentials from '../core/frameworks/cognitoCredentials';
import confirmarCuenta from '../core/useCases/confirmarCuenta';


const ConfirmAccount = (props) => {
	const { history } = props;
	const usernameState = typeof history.location.state !== "undefined" && history.location.state !== "" ? history.location.state.user : false;

	const [username, setUsername] = useState(false)
	const [confirmCode, setConfirmCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [estadoError, setEstadoError] = useState(false);
	const [mensajeError, setMensajeError] = useState('')

	const handleConfirmCode = (e) => {
		const { value } = e.target;
		setConfirmCode(value);
	}


	const successCallback = () => {
		setLoading(false);
		console.log('Código confirmado');
		history.push('/', { newUser: true });
	}
	const errorCallback = (error) => {
		setEstadoError(true);
		setMensajeError(error);
		setLoading(false);
	}

	const confirm = (e) => {
		e.preventDefault();

		confirmarCuenta({
			username,
			confirmCode,
			credentials,
			Authentication,
			successCallback: successCallback,
			errorCallback: errorCallback
		});

	}

	// oculta mensaje de error
	const onDismiss = () => {
		setEstadoError(false);
	};

	useEffect(() => {

		if (usernameState) {
			setUsername(usernameState)
		} else {
			history.push('/');
		}
	}, [usernameState, history])


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

						<Alert variant="success">
							<h6 className="alert-heading">Registro exitoso</h6>
							<p>Se ha enviado un código a tu correo. Ingrésalo para continuar</p>
						</Alert>

						{
							estadoError &&
							<Alert color="danger" isOpen={estadoError} toggle={onDismiss} >
								<h6 className="alert-heading">Error</h6>
								<p>{mensajeError}</p>
							</Alert>
						}

						<FormGroup>
							<Input placeholder="Ingrese su código de confirmación" onChange={handleConfirmCode} />
						</FormGroup>

						<hr />
						<Button disabled={loading} size="lg" type="submit" className="bg-gradient-theme-left border-0 btn-block" onClick={confirm}>
							{loading ? 'Cargando...' : 'Confirmar'}
						</Button>
					</Form>

					<div className="text-center pt-1">
						<h6>o</h6>
						<h6> <Link to="/">Ingresar</Link> </h6>
					</div>

				</Card>
			</Col>
		</Row>
	);

};

export default ConfirmAccount; 