import { useState } from 'react';

const useForm = (submit) => {

    const [compra, setCompra] = useState({
        documento: '',
        cliente: '',
        productos: []
    })

    const handleCompra = e => {
        const { name, value } = e.target;

        setCompra({
            ...compra,
            [name]: value
        })
    }

    const [producto, setProducto] = useState(
        {
            id: '',
            nombre: '',
            precio: 0,
            cantidad: 1,
            descuento: {},
            total: 0
        }
    )

    const handleProducto = (event) => {
        const { value } = event.target;
        const valor = JSON.parse(value)
        setProducto({
            id: valor.id,
            nombre: valor.nombre,
            precio: valor.precio,
            cantidad: 1,
            descuento: valor.descuento,
            total: valor.precio
        })

    }

    const [descuento, setDescuento] = useState({
        id: '0',
        nombre: 'Sin descuento',
        descuento: 0
    })

    const handleDescuento = (e, idProducto) => {
        const { value } = e.target;
        const valor = JSON.parse(value)

        setDescuento({
            id: valor.id,
            nombre: valor.nombre,
            descuento: valor.descuento
        })

        const productos = compra.productos.map(item => {
            if (item.id === idProducto) {
                return {
                    ...item,
                    descuento: { ...descuento },
                    total: valor.descuento !== 0 ? item.precio - ((item.precio * valor.descuento) / 100) : item.precio
                }
            } else {
                return item
            }
        })

        setCompra({
            ...compra,
            productos: productos
        })

    }



    const agregarProducto = () => {
        const prod = { ...producto }
        let arreglo = [...compra.productos]
        arreglo.push(prod)
        setCompra({
            ...compra,
            productos: arreglo
        })
    }

    const sumaProducto = (id) => {

        const productos = compra.productos.map(item => {
            if (item.id === id) {
                return { ...item, cantidad: item.cantidad + 1, total: (item.cantidad + 1) * item.precio }
            } else {
                return item
            }
        })

        setCompra({
            ...compra,
            productos: productos
        })

    }

    const restaProducto = (id) => {
        const productos = compra.productos.map(item => {
            if (item.id === id) {
                if (item.cantidad > 1) {
                    return { ...item, cantidad: item.cantidad - 1, total: (item.cantidad - 1) * item.precio }
                } else {
                    return { ...item, cantidad: 1, total: item.precio }
                }
            } else {
                return item
            }
        })
        setCompra({
            ...compra,
            productos: productos
        })
    }

    const quitarProducto = (id) => {
        const productos = compra.productos.filter(item => {
            return !item.id.includes(id)
        })
        setCompra({
            ...compra,
            productos: productos
        })
    }


    const handleSubmit = () => {
        submit();
    };

    return {
        producto,
        handleProducto,
        handleCompra,
        handleSubmit,
        compra,
        agregarProducto,
        sumaProducto,
        restaProducto,
        quitarProducto,

        descuento,
        handleDescuento
    };

}


export default useForm;