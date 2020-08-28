import React from 'react'
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { FaPlus } from 'react-icons/fa'


import SelectProductos from './SelectProductos'

const FormProducto = ({ compra, handleCompra, producto, handleProducto, agregarProducto }) => {

    return (
        <>
            <Row>
                <Col lg={4} md={4} sm={12}>
                    <FormGroup>
                        <Label for="exampleSelect">Tipo documento</Label>
                        <Input type="select" name="documento" onChange={handleCompra} value={compra.documento}>
                            <option defaultValue="">Tipo de documento</option>
                            <option value="33">Factura electrónica</option>
                            <option value="39">Boleta electrónica</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col lg={4} md={4} sm={12}>
                    <FormGroup>
                        <Label for="exampleSelect">Cliente</Label>
                        <Input type="select" name="cliente" onChange={handleCompra} value={compra.cliente}>
                            <option defaultValue="">Seleccione cliente</option>
                            <option value="14885130-7" datarz="Juan Perez" data-gir="Giro 1" data-dir="calle 123" data-com="Concepción" data-ciu="Concepción" data-cont="Luis Hermosilla">76147852-6 - Empresa ltda.</option>
                            <option value="12312312-9" datarz="Lorenzo Perez" data-gir="Giro 2" data-dir="avenida lalala 132" data-com="Concepción" data-ciu="Concepción" data-cont="Lorenzo Perez">12312312-9 - Lorenzo Perez</option>
                            <option value="5123665-9" datarz="Romina Perez" data-gir="Giro 3" data-dir="pasaje lalala 123" data-com="Concepción" data-ciu="Concepción" data-cont="Julieta Perez"> 5123665-9 - Romina Perez asdadsasd limitada</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col lg={4} md={4} sm={12}>
                    <SelectProductos
                        producto={producto}
                        handleProducto={handleProducto}
                    />
                </Col>
            </Row>
            <div className="clearfix">
                <Button color="primary" className="float-right" onClick={agregarProducto}><FaPlus /> Agregar producto</Button>
            </div>
        </>
    )
}

export default FormProducto
