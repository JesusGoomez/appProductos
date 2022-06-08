import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

function InputText({
  label = "",
  onChange = "",
  defaultValue = "",
  campoObligatorio = false,
  mensajeAdvertencia = "",
  showAlert,
  setShowAlert,
  onKeyUp,
  disabled = false,
  readOnly = false,
  idText = ""
})
{

  const handleChange=(value)=>{
    return onChange(value)
  }



  const ComprueboAdvertencias = () => {

    if (campoObligatorio === true && showAlert === true) {
      
      return (
        <Alert variant="danger" className="alert-danger" onClose={() => setShowAlert((state) => ({ ...state, [idText]: false }))} dismissible>
          <Alert.Heading></Alert.Heading>
          {mensajeAdvertencia}
        </Alert>
      );
    }
  };

  return (
    <>
      <Form.Label style={{marginTop: "15px"}}> {label} </Form.Label>
      <Form.Control
        type={"text"}
        onChange={(e) => handleChange(e)}
        value={defaultValue}
        onKeyUp = {onKeyUp}
        disabled = {disabled}
        readOnly = {readOnly}
        key = {idText}
      />

      { ComprueboAdvertencias() }
    </>
  );
}

export default InputText;
