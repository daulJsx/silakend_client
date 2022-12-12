import React from "react";
import Toast from "react-bootstrap/Toast";
import { VscError } from "react-icons/vsc";

function Notif() {
  return (
    <Toast position={"bottom-end"}>
      <Toast.Header>
        <VscError />
        <strong className="me-auto">Message</strong>
      </Toast.Header>
      <Toast.Body>Ups login error</Toast.Body>
    </Toast>
  );
}

export default Notif;
