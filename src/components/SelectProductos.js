import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const data = [
    {
        id: '1',
        nombre: 'Producto 1',
        precio: 1000,
        cantidad: 1
    },
    {
        id: '2',
        nombre: 'Producto 2',
        precio: 2000,
        cantidad: 1
    },
    {
        id: '3',
        nombre: 'Producto 3',
        precio: 3000,
        cantidad: 1
    },
    {
        id: '4',
        nombre: 'Producto 4',
        precio: 4000,
        cantidad: 1
    }
]

const SelectProductos = ({ producto, handleProducto }) => {

    return (
        <>
            <FormGroup>
                <Label >Producto o servicio</Label>
                <Input type="select" name="producto" value={JSON.stringify(producto)} onChange={e => handleProducto(e)}>
                    <option defaultValue="">Selecione producto o servicio</option>
                    {
                        data.map((item, index) => {

                            return (<option key={item.id + index} value={JSON.stringify(item)} >{item.nombre}</option>)
                        })
                    }
                </Input>
            </FormGroup>
        </>
    )
}

export default SelectProductos
