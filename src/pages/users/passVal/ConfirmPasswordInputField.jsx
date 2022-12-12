import React, { useState } from "react";
// Icons
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

// Bootstrap
import Form from "react-bootstrap/Form";

function ConfirmPasswordInputField({
  props,
  handleValidation,
  handlePasswordChange,
  confirmPasswordValue,
  confirmPasswordError,
}) {
  // Show/ hide password value
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!isVisible);
  };
  return (
    <Form.Group className="mb-3 form-floating">
      <input
        type={!isVisible ? "password" : "text"}
        {...props}
        required
        class="form-control"
        id="ConfirmPassword"
        value={confirmPasswordValue}
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        name="password_confirmation"
        placeholder="Password"
        className="form-control"
      />
      <label className="color-primary" htmlFor="ConfirmPassword">
        Konfirmasi Password
      </label>
      <i className="eye-icon fs-5" onClick={toggle}>
        {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
      </i>
      <p className="text-danger">{confirmPasswordError}</p>
    </Form.Group>
  );
}

export default ConfirmPasswordInputField;
