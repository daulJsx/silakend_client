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
        name="password"
        class="form-control"
        placeholder="Password"
        id="floatingPassword"
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        value={passwordValue}
      />
      <label className="color-primary" htmlFor="floatingPassword">
        Password
      </label>

      <i className="eye-icon fs-5" onClick={toggle}>
        {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
      </i>
      <p className="text-danger">{passwordError}</p>
    </Form.Group>
  );
}

export default PasswordInputField;
