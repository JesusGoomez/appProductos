import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

function InputDecimal({
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


  


  return (
    <>
      <Form.Label style ={{marginTop: "15px"}}> {label} </Form.Label>
      <Form.Control
        type="number"
        min="1"
        onChange={(e) => handleChange(e)}
        defaultValue = {defaultValue}
        step="0.01"
        key = {idInputNumber}
        maxLength= {maxLength}
        className = {style}
      
      />

      { ComprueboAdvertencias() }
    </>
  );
}

export default InputDecimal;