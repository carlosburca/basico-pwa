import React from 'react'
import { Input } from 'reactstrap'

const data = [
    {
        id: '0',
        nombre: 'Sin descuento',
        descuento: 0
    },
    {
        id: '1',
        nombre: 'Descuento 1',
        descuento: 10
    },
    {
        id: '2',
        nombre: 'Amigos',
        descuento: 15
    },
    {
        id: '3',
        nombre: 'Familia',
        descuento: 20
    },
    {
        id: '4',
        nombre: 'Día de la mujer',
        descuento: 25
    }
]

const SelectDescuentos = ({ descuento, handleDescuento, idProducto }) => {
    return (
        <Input type="select" name="descuento" value={JSON.stringify(descuento)} onChange={e => handleDescuento(e, idProducto)}>
            {
                data.map((item, index) => {
                    return (<option key={item.id + index} value={JSON.stringify(item)} >{`${item.nombre} (${item.descuento}%)`}</option>)
                })
            }
        </Input>
    )
}

export default SelectDescuentos
