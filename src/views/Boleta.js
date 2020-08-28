import React from 'react'
import { Container, Button } from 'reactstrap'
import { FaCheck, FaTimesCircle } from 'react-icons/fa';
import useForm from './../hooks/useFormBoleta'

import FormProducto from './../components/FormProducto'
import TablaProductos from './../components/TablaProductos'

const Boleta = () => {
    const { handleCompra, producto, handleProducto, agregarProducto, compra,
        sumaProducto, restaProducto, quitarProducto } = useForm(null)

    return (
        <Container>
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
                <Button color="danger" ><FaTimesCircle /> Cancelar</Button>
                <Button color="success" ><FaCheck /> Pagar</Button>
            </div>
        </Container>
    )
}

export default Boleta
