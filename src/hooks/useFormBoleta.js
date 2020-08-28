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
            cantidad: 1
        }
    )

    const handleProducto = (event) => {
        const { value } = event.target;
        const valor = JSON.parse(value)
        setProducto({
            id: valor.id,
            nombre: valor.nombre,
            precio: valor.precio,
            cantidad: 1
        })

    }



    const agregarProducto = () => {
        const prod = { ...producto }
        let arreglo = [...compra.productos]

        const productoExistente = arreglo.find(item => item.id === prod.id)

        if (!!productoExistente) {
            sumaProducto(productoExistente.id)
        } else {
            arreglo.push(prod)
            setCompra({
                ...compra,
                productos: arreglo
            })
        }


    }


    const sumaProducto = (id) => {

        const productos = compra.productos.map(item => {
            if (item.id === id) {
                return { ...item, cantidad: item.cantidad + 1 }
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
                    return { ...item, cantidad: item.cantidad - 1 }
                } else {
                    return { ...item, cantidad: 1 }
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
        quitarProducto
    };

}


export default useForm;