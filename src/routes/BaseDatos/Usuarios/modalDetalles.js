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
                <div style={{ width: "100%" }}>
                  <h3>Código del Activo</h3>
                  {/* <p>{datosModal.activo_fijo.codigo_activo}</p> */}
                </div>
              </Col>
              <Col lg={16} md={12} sm={12} xs={24}>
                <div style={{ width: "100%" }}>
                  <h3>Descripcion</h3>
                  {/* <p>{datosModal.activo_fijo.descripcion}</p> */}
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
