import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Row, Card, Col, Button, Alert } from 'reactstrap';
//import Marca from 'assets/img/logo/marca-ejemplo.png';
import Authentication from 'cl-abstra-auth';
import autenticarse from '../core/useCases/autenticarse';
import credentials from '../core/frameworks/cognitoCredentials';


const Login = (props) => {
    const { history } = props;
    const newUserState = typeof history.location.state !== "undefined" && history.location.state !== "" ? history.location.state.newUser : false;

    const [values, setValues] = useState({ username: '', password: '' });
    const [estadoError, setEstadoError] = useState(false);
    const [mensajeError, setMensajeError] = useState('')
    const [loading, setLoading] = useState(false);

    const [newUser, setNewUser] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const callbackCorrecto = () => {
        setLoading(false);
        history.push('/inicio')
    }
    const errorCallback = (error) => {
        setEstadoError(true);
        setMensajeError(error);
        setLoading(false);
    }

    // oculta mensaje de error
    const onDismiss = () => {
        setEstadoError(false);
    };

    const login = (e) => {
        e.preventDefault();
        const { username, password } = values;
        setLoading(true)
        autenticarse({
            username,
            password,
            Authentication,
            credentials,
            callbackCorrecto: callbackCorrecto,
            errorCallback: errorCallback,
        });
    }

    useEffect(() => {
        if (newUserState) {
            console.log('Nuevo usuario registrado');
            setNewUser(newUserState)
        }
    }, [newUserState])

    return (
        <Row style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }} className="no-mar-h">
            <Col md={6} lg={4}>
                <Card body className="borde-login">
                    <Form>


                        <div className="text-center pb-4">
                            {/*  <img
                                src={Marca}
                                className=""
                                style={{ width: 250, height: 'auto', cursor: 'pointer' }}
                                alt="Plantilla abstrahere"
                                target='_blank' /> */}
                        </div>

                        {
                            newUser &&
                            <Alert variant="success">
                                <h6 className="alert-heading">¡Bienvenido!</h6>
                                <p>Registro exitoso. Ingresa con tu correo y contraseña</p>
                            </Alert>
                        }

                        {
                            estadoError &&
                            <Alert color="danger" isOpen={estadoError} toggle={onDismiss} >
                                <h6 className="alert-heading">Error</h6>
                                <p>{mensajeError}</p>
                            </Alert>
                        }

                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="usuario@abstrahere.com" name="username" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input placeholder="Contraseña" type="password" name="password" onChange={handleChange} />
                        </FormGroup>
                        <hr />
                        <Button disabled={loading} size="lg" type="submit" className="bg-gradient-theme-left border-0 btn-block" onClick={login}>
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </Button>
                    </Form>
                    <div className="text-center pt-1">
                        <h6>o</h6>
                        <h6> <Link to="/registro">Registrarse</Link> </h6>
                    </div>

                </Card>
            </Col>
        </Row>
    );

};

export default Login; 