import React from 'react'
import { Container, Button } from 'reactstrap'
import { FaCheck/* , FaTimesCircle */ } from 'react-icons/fa';
import useForm from './../hooks/useFormBoleta'

import FormProducto from './../components/FormProducto'
import TablaProductos from './../components/TablaProductos'
import Authentication from 'cl-abstra-auth';
import credentials from './../core/frameworks/cognitoCredentials';

const Boleta = (props) => {
    const { handleCompra, producto, handleProducto, agregarProducto, compra,
        sumaProducto, restaProducto, quitarProducto } = useForm(null)

    const logout = async () => {
        const Auth = new Authentication(credentials);

        try {
            await Auth.signOut();
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <div>
                <Button outline color="primary" size="sm" onClick={logout} className="btn-salir float-right" tutorial="btn-salir">
                    Salir
                </Button>
                <br /><br /><br /><br />
            </div>



            <FormProducto
                compra={compra}
                handleCompra={handleCompra}
                producto={producto}
                handleProducto={handleProducto}
                agregarProducto={agregarProducto}

            />
            <hr />

            <TablaProductos
                compra={compra}
                sumaProducto={sumaProducto}
                restaProducto={restaProducto}
                quitarProducto={quitarProducto}

            />

            <div className="text-right">
                {/* <Button color="danger" ><FaTimesCircle /> Cancelar</Button> */}
                <Button color="success" ><FaCheck /> Pagar</Button>
            </div>
        </Container>
    )
}

export default Boleta
