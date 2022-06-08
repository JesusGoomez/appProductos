import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ModalProductos from './componentes/ModalProductos';
import { EyeFill } from "react-bootstrap-icons";


function App() {

  //states

  //arreglo general de los productos
  const [datosProductos, setDatosProductos] = useState([]);

  //muestra el modal
  const [showModal, setShowModal] = useState(false);

  //State encargado de guardar el producto seleccionado
  const [producto, setProducto] = useState({});

  //Detecta si el listado sufrio cambio alguno
  const [registroModificado, setRegistroModificado] = useState(false);

  //state encargado ver detectar si fue una opcion de agregar datos, o ver datos
  const [opcion, setOpcion] = useState({});

  const [montado, setMontado] = useState(false);


  //Consultamos los datos del producto ya sea desde la api o desde el localstorage (si es que algun producto fuese agregado)
  useEffect(() => {
    
    const listadoTemp = JSON.parse(localStorage.getItem("listadoProductos"));
    
    //Si hay productos desde localstorage
    if (listadoTemp)
    {
      consultoDatosNuevos();
    }
    //Consulta en la api
    else
    {
      consultoDatosGenerales();
    }
    
  }, []);


  //Cargamos los nuevos productos agregados a la tabla de produtos
  useEffect(() => {

    if (registroModificado === true)
    {    
      consultoDatosNuevos();
      setRegistroModificado(false);
    }

  }, [registroModificado]);


  //obtenemos informacion de los productos atraves de la API
  const consultoDatosGenerales = async () => {
    
    let request = await fetch('https://eshop-deve.herokuapp.com/api/v2/orders', { 
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzM DZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_T C67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ',   
      }
    });

    let result = await request.json();

    //Dado el listado proporcionado, obtenemos solo la informacion necesaria
    const listProductos = result.orders.map((item, index) => ({
      number : item.number,
      sku: item.items[0].sku,
      name : item.items[0].name,
      quantity : item.items[0].quantity,
      price : item.items[0].price,
    }))

    console.log(listProductos);

    //Asignamos el listado anterior al state
    setDatosProductos(listProductos);

    //Guardamos el listado anterior en memoria local
    localStorage.setItem("listadoProductos", JSON.stringify(listProductos));
  }


  //Obtenemos el listado de productos que fueron agregados recientemente
  const consultoDatosNuevos = () => {
    
    //obtenemos el listado de alumnos de la memoria local
    const listadoTemp = JSON.parse(localStorage.getItem("listadoProductos"));

    //Asignamos el listado anterior al state
    setDatosProductos(listadoTemp);
  }

  
  //ASignamos el elemento seleccionado del listado, al state
  const envioDatosModal = (item, index) => {
    setProducto({
      number : item.number,
      sku: item.sku,
      name : item.name,
      quantity : item.quantity,
      price : item.price,
    })
  }

  //Limpiamos el state
  const limpioDatosModal = () => {
    setProducto({
      number : "1",
      sku: "",
      name : "",
      quantity : "1",
      price : "1.00",
    })
  }

  
  const imprimoTablaProductos = () => {
    return (
      <>
        <div className="table-responsive-xl" style={{marginTop: "80px"}}>
          <div className="responsive">
            <Table className="table is-fullwidth is-bordered">
              <thead>
                <tr className="tableHeader">
                  <th>Número</th>
                  <th>Sku</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody>
                {datosProductos.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.number}</td>
                      <td> {item.sku}</td>
                      <td> {item.name}</td>
                      <td> {item.quantity}</td>
                      <td> {item.price}</td>
                      <td>
                        <p className ="iconFromTable" onClick={() => ( setShowModal(true), envioDatosModal(item,index), setOpcion('Ver')  )}>
                          <EyeFill size={22} />
                        </p>   
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  };



  return (
    <Container>

      <ModalProductos show={showModal} setShow = {setShowModal}  producto = {producto} setProducto = {setProducto}  setRegistroModificado={setRegistroModificado} opcion={opcion}/>

      <h1 style= {{textAlign: 'center', marginTop: '20px'}}> Listado de productos </h1>
     
     {imprimoTablaProductos()}


      <Row>
        <div className='alinearDerecha'>
          <Button variant="primary" size="lg" className="button-success"  onClick={() => (localStorage.removeItem('listadoProductos'), consultoDatosGenerales(), limpioDatosModal() )}>
            Recargar API
          </Button>
      
          <Button variant="primary" size="lg" className="button-success"  onClick={() => (setShowModal(true),  setOpcion('Agregar'), limpioDatosModal() )}>
            Agregar
          </Button>
        </div>
      </Row> 
      

      
      

    </Container>
   

  );
}

export default App;
