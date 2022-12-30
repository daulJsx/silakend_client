import React, { useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";

// Icons
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

function PasswordInputField({
  props,
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
  isRequired,
}) {
  // Show/ hide password value
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Form.Label>Password</Form.Label>
      <Form.Control
        style={{
          backgroundColor: "#F5F7FC",
          border: "none",
        }}
        type={!isVisible ? "password" : "text"}
        {...props}
        required={isRequired}
        name="password"
        class="form-control"
        id="floatingPassword"
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        value={passwordValue}
        className="input form-custom"
      />

      <i className="eye-icon fs-5" onClick={toggle}>
        {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
      </i>
      <p className="text-danger">{passwordError}</p>
    </>
  );
}

export default PasswordInputField;
