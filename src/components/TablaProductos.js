import React from 'react'
import { Button, Table } from 'reactstrap'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'



const TablaProductos = ({ compra, sumaProducto, restaProducto, quitarProducto }) => {
    const { productos } = compra;
    const totalProductos = () => {
        let total = 0;
        productos.forEach(item => {
            let producto = item.precio * item.cantidad;
            total = total + producto;
        });
        return total;
    }



    return (
        <>
            {
                productos.length > 0

                    ? <Table>
                        <tbody>
                            {
                                productos.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div> {item.cantidad}</div>
                                                <div>
                                                    <Button className="agregaItem" onClick={() => sumaProducto(item.id)}><FaPlus /></Button>
                                                    <Button className="quitaItem" onClick={() => restaProducto(item.id)}><FaMinus /></Button>
                                                </div>
                                                <div>
                                                    {item.nombre}
                                                </div>
                                                <div>
                                                    $ {item.precio}
                                                </div>

                                            </td>
                                            <td>
                                                ${item.precio * item.cantidad}
                                            </td>
                                            <td>
                                                <Button onClick={() => quitarProducto(item.id)}><FaTrash /></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>

                    : <span>No se han agregado productos</span>
            }

            <div className="text-right">
                $ <span>{totalProductos()}</span>
            </div>
        </>
    )
}

export default TablaProductos
