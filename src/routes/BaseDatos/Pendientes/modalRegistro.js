import { Col, Modal, Row, Button, Image, Table, Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { httpClient } from "../../../util/Api";

const ModalRegistro = ({ abrirModal, setAbrirModal, datosModal }) => {

  const impresionRef = useRef();
  console.log(datosModal);
  const [dataSource, setDataSource] = useState([]);
  const [cargando, setCargando] = useState(false);


  const traerRegistros = async () => {
    setCargando(true);
    const res = await httpClient.post("/listar/getDocPen", { idUsuario: datosModal.idUsuario });
    console.log(res.data.data);
    setDataSource(res.data.data);
    setCargando(false);
  }

  useEffect(() => {
    traerRegistros();
  }, [])

  const column = [
    {
      title: "Tipo Documentación",
      dataIndex: "tipoDocumentacion",
      key: "tipoDocumentacion",
      // width: 200,
    },
    {
      title: "Documentación",
      dataIndex: "documentacion",
      key: "documentacion",
    },
    {
      title: "Observación",
      dataIndex: "observacion",
      key: "observacion",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Accion",
      key: "action",
      width: 180,
      render: (text, record) => (
        <span>
          <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => {
              }}
              className="icon icon-check"
              style={{ fontSize: 20, color: "blue" }}
            />
          </span>
          {/* <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => {
              }}
              className="icon icon-trash"
              style={{ fontSize: 20, color: "red" }}
            />
          </span> */}
        </span>
      ),
    },
  ];

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
            Registros
          </div>
        }
      >
        <Table
          size="default"
          style={{
            width: "100%",
            textAlign: "center",
          }}
          className="gx-table-responsive"
          columns={column}
          loading={cargando}
          // pagination={state.pagination}
          // onChange={handleTableChange}
          dataSource={dataSource}
        />

      </Modal>
    </>
  );
};
export default ModalRegistro;
