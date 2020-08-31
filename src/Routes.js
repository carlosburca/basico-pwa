import React, { Component, lazy, Suspense } from 'react';
import { withRouter, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Authentication from 'cl-abstra-auth';
import PropTypes from 'prop-types';

import Login from './views/Login';
import Register from './views/Registro';
import ConfirmarCuenta from './views/ConfirmarCuenta';
//import Boleta from './views/Boleta'

import credentials from './core/frameworks/cognitoCredentials';
const Boleta = lazy(() => import('./views/Boleta'));
const Auth = new Authentication(credentials);

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isAuthenticated: false,
            user: ''
        }
    };

    componentDidMount() {
        this.autenticar();
    };

    autenticar = async () => {
        try {
            let cognitoUser = await Auth.getCurrentUser();
            let userData = {
                username: cognitoUser.username,
                idToken: cognitoUser.signInUserSession.idToken.jwtToken,
                rutEmpresa: cognitoUser.attributes['custom:rutEmpresa'],
                profile: cognitoUser.attributes['custom:profile'],
                razonSocial: typeof cognitoUser.attributes['custom:razonSocial'] !== "undefined" ? cognitoUser.attributes['custom:razonSocial'] : '',
                firstLogin: cognitoUser.attributes['custom:firstLogin'],
            }
            //localStorage.setItem('ud', JSON.stringify(userData) );
            this.setState({ user: userData, loaded: true, isAuthenticated: true })
        } catch (e) {
            this.props.history.push('/');

            /* const data = localStorage.getItem('ud');
            console.log(data);
            if (!!data) {
                this.setState({ user: JSON.parse(data), loaded: true, isAuthenticated: true })
            } else {
                this.props.history.push('/');
            } */
        }

    }

    render() {
        const { component: Component, type, ...rest } = this.props;
        const { loaded, isAuthenticated, user } = this.state;

        if (!loaded) {
            return null;
        } else if (isAuthenticated) {
            return <Route
                {...rest}
                render={props => (
                    <div user={user} >
                        <Component {...props} />
                    </div>
                )}
            />


        } else {
            return <Redirect to={{ pathname: "/" }} />;
        }
    };
};

PrivateRoute = withRouter(PrivateRoute);

const Routes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>

                    {/* Rutas no protegidas */}
                    <Route exact path="/" component={Login} />
                    <Route exact path="/registro" component={Register} />
                    <Route exact path="/confirmarcuenta" component={ConfirmarCuenta} />

                    {/* Rutas protegidas */}
                    <PrivateRoute path="/inicio" component={Boleta} />


                </Switch>
            </Suspense>
        </Router>
    );
}

export default Routes;

PrivateRoute.propTypes = {
    history: PropTypes.instanceOf(Object),
    component: PropTypes.elementType.isRequired,
};

PrivateRoute.defaultProps = {
    history: {},
};


