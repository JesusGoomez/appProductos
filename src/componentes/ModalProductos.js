import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { InputText, InputNumber, InputDecimal } from '.'


function ModalProductos({ show, setShow, producto, setProducto, setRegistroModificado, opcion }) {
  
  const [showRegistroDuplicado, setShowRegistroDuplicado] = useState(false);

  
  //state encargado de mostrar campos obligatorios
  const [showAlert, setShowAlert] = useState({
    number: false,
    sku: false,
    name: false,
    quantity: false,
    price: false,
  });

  //Cierra el modal
  const handleClose = () => {
    setShowAlert({
      number: false,
      sku: false,
      name: false,
      quantity: false,
      price: false,
    });

    setShow(false);
    setShowRegistroDuplicado(false);
  };


  //Procedemos a verificar si existen campos vacios
  const comprueboSiExistenErrores = () => {
    
    let ExistenErrores = false;

    Object.keys(producto).forEach((value, index) => {
      
      if (producto[value] === "") 
      {
        //el campo esta vacio
        setShowAlert((state) => ({ ...state, [value]: true })); //capturamos el error a true
        ExistenErrores = true;
      }
    });

    return ExistenErrores;
  };

  //asignamos los valores al state general
  const handleChange = (prop, valor)=> {
    setProducto ({...producto, [prop] : valor.target.value})
  }
  

  const mostrarAlerta = () => {

    if (showRegistroDuplicado) {
      return (
        <Alert variant="danger" onClose={() => setShowRegistroDuplicado(false)} dismissible>
          <Alert.Heading>Vaya esto es incomodo </Alert.Heading>
          <p>
            Ya existe un producto, con el mismo número.
          </p>
        </Alert>
      );
    }
  }


  const agregoDatos = async (e) => {

    //Si no hay ningun campo vacio
    if (comprueboSiExistenErrores() === false)
    {      
      e.preventDefault();
      
      //obtenemos el listado de los productos de la memoria local
      const listadoTemp = JSON.parse(localStorage.getItem("listadoProductos"));
      
      //Verificamos si existe el producto antes de agregar
      let productoExists = listadoTemp.filter((item) => item.number === producto.number);

      //Agregamos el producto, solo si este no existe
      if (productoExists.length === 0)
      {
        listadoTemp.push(producto);
    
        localStorage.removeItem('listadoProductos');
        localStorage.setItem("listadoProductos",JSON.stringify( listadoTemp ));
        setRegistroModificado(true);
        setShow(false);
      }
      else
      {
        //registro duplicado
        setShowRegistroDuplicado(true);
      }  
    }
  }


  //Mostramos el button agregar, solo cuando el modal fue llamado de la opcion de agregar nuevo producto
  const ButtonAgregar = () => {
    
    if (opcion === "Ver")
    {
      return null;
    }
    else
    {
      return (
        <Button variant="outline-danger" onClick={(e)=> (agregoDatos(e) ) }>
          Agregar
        </Button>  
      )
    }
  }


  return (
    
    <Modal className="bodyModal" show={show} onHide={handleClose} size="xl" centered>
      
      <Modal.Header closeButton className="modal-title">
        <Modal.Title> {opcion === "Ver" ? "Ver producto" : "Agregar producto"}</Modal.Title>
      </Modal.Header>
 
      <Modal.Body>
        <Form>
          <Form.Group className="form-group">

            {mostrarAlerta()}

            <Row className={opcion === "Ver" ? "disabled" : "false"}>
              <Col xl={6}>
                <InputNumber
                  label={"Numero"}
                  onChange={(value) => handleChange("number", value)}
                  defaultValue={producto.number}
                  campoObligatorio={true}
                  mensajeAdvertencia={"El número es obligatorio"}
                  showAlert={showAlert["number"]}
                  setShowAlert={setShowAlert}
                  idInputNumber={"number"}
                />
              </Col>

              <Col xl={6}>
                <InputText
                  label={"Sku"}
                  onChange={(value) => handleChange("sku", value)}
                  defaultValue={producto.sku}
                  campoObligatorio={true}
                  mensajeAdvertencia={"El sku es obligatorio"}
                  showAlert={showAlert["sku"]}
                  setShowAlert={setShowAlert}
                  idText={"sku"}
                />
              </Col>

              
              <Col xl={12}>
                <InputText
                  label={"Nombre"}
                  onChange={(value) => handleChange("name", value)}
                  defaultValue={producto.name}
                  campoObligatorio={true}
                  mensajeAdvertencia={"El nombre es obligatorio"}
                  showAlert={showAlert["name"]}
                  setShowAlert={setShowAlert}
                  idText={"name"}
                />
              </Col>

              <Col xl={6}>
                <InputNumber
                  label={"Cantidad"}
                  onChange={(value) => handleChange("quantity", value)}
                  defaultValue={producto.quantity}
                  campoObligatorio={true}
                  mensajeAdvertencia={"Escriba una cantidad válida"}
                  showAlert={showAlert["quantity"]}
                  setShowAlert={setShowAlert}
                  idInputNumber={"quantity"}
                />
              </Col>

              <Col xl={6}>
                <InputDecimal
                  label={"Precio"}
                  onChange={(value) => handleChange("price", value)}
                  defaultValue={producto.price}
                  campoObligatorio={true}
                  mensajeAdvertencia={"Escriba una cantidad válida"}
                  showAlert={showAlert["price"]}
                  setShowAlert={setShowAlert}
                  idInputNumber={"price"}
                />
              </Col>
            </Row>            
          </Form.Group>
        </Form>
      </Modal.Body>
                
      <Modal.Footer>  

        <ButtonAgregar />

        <Button variant="outline-secondary" onClick={()=> handleClose()}>
          Cerrar
        </Button>

      </Modal.Footer>
    </Modal>
  );
}

export default ModalProductos;