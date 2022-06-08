import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

function InputNumber({
  label = "",
  onChange = "",
  defaultValue = "",
  campoObligatorio = false,
  mensajeAdvertencia = "",
  showAlert,
  setShowAlert,
  onKeyUp,
  maxLength,
  idInputNumber = "",
  style
}) 

{
  const ComprueboAdvertencias = () => {

    if (campoObligatorio === true && showAlert === true) {
      return (
        <Alert variant="danger" className="alert-danger" onClose={() => setShowAlert((state) => ({ ...state, [idInputNumber]: false }))} dismissible >
          <Alert.Heading></Alert.Heading>
          {mensajeAdvertencia}
        </Alert>
      );
    }
  };

  const permitirSoloNumero =(event)=> {
    
    let onlyNumbers =  /^[0-9]*$/;

    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

     if (!onlyNumbers.test(keyValue))
          event.preventDefault();
     
   }


   const handleChange=(value)=>{
  
    if (value.target.value === "")
    {
      value.target.value = "1";
    }
    else
    {
      value.target.value = value.target.value.replaceAll(/\b0+/g, "");

      return onChange(value)
    }
  }


  const reseteoValorUno=(value)=>{
  
    if(value.target.value === "")
    {
      value.target.value = "1";
    }  
  }


  return (
    <>
      <Form.Label style ={{marginTop: "15px"}}> {label} </Form.Label>
      <Form.Control
        type="number"
        min="1"
        onChange={(e) => handleChange(e)}
        defaultValue = {defaultValue}
        pattern="/[0-9]+/"
        onKeyPress={(e) => permitirSoloNumero(e)}
        onMouseLeave={(e) => reseteoValorUno(e)}
        onKeyUp={onKeyUp}
        key = {idInputNumber}
        maxLength= {maxLength}
        className = {style}
      
      />

      { ComprueboAdvertencias() }
    </>
  );
}

export default InputNumber;