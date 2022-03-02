import { Col, Modal, Row, Button, Image } from "antd";
import React, { useRef } from "react";


const ModalDetalles = ({ abrirModal, setAbrirModal, datosModal }) => {

  const impresionRef = useRef();
  console.log(datosModal);

  return (
    <>
      <Modal
        visible={abrirModal}
        onCancel={() => setAbrirModal(false)}
        footer={
          [
            <Button type="primary" onClick={() => setAbrirModal(false)}>
              OK
            </Button>
          ]
        }
        width="70%"
        title={
          <div style={{ fontSize: "22px" }}>
            Detalles
          </div>
        }
      >
        <Row style={{ flexDirection: "row", padding: "15px 0 15px 0" }}>
          <Col lg={18}>
            <h2 style={{ fontWeight: "bold" }}>CLIENTE</h2>
            <Row>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "70%" }}>
                  <h3>NOMBRE</h3>
                  {<p>{datosModal.nombre}</p>}
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>CELULAR</h3>
                  {<p>{datosModal.celular}</p>}
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>PAIS</h3>
                  {<p>{datosModal.nombrePais}</p>}
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>CIUDAD</h3>
                  {<p>{datosModal.nameCiudad}</p>}
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>CORREO</h3>
                  {<p>{datosModal.correoElectronico}</p>}
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>FECHA NACIMIENTO</h3>
                  {<p>{datosModal.fechaNacimiento}</p>}
                </div>
              </Col>
              <Col lg={16} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>GENERO</h3>
                  {<p>{datosModal.sexoU}</p>}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalDetalles;
