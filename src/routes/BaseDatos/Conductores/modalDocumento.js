import { Col, Modal, Row, Button, Image, Table, Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { httpClient } from "../../../util/Api";

const ModalDocumento = ({ abrirModal, setAbrirModal, datosModal }) => {

  const impresionRef = useRef();
  console.log(datosModal);
  const [dataSource, setDataSource] = useState([]);
  const [cargando, setCargando] = useState(false);


  const traerRegistros = async () => {
    setCargando(true);
    const res = await httpClient.post("/listar/getDocCond", { idConductor: datosModal.idUsuario });
    console.log(res.data.data);
    setDataSource(res.data.data);
    setCargando(false);
  }

  useEffect(() => {
    traerRegistros();
  }, [])

  const column = [
    {
      title: "Licencia de Conducir",
      dataIndex: "nroLicenciaConducir",
      key: "nroLicenciaConducir",
      // width: 200,
    },
    {
      title: "Antecedentes Penales",
      dataIndex: "urlAntecedentesPenales",
      key: "urlAntecedentesPenales",
    },
    {
      title: "Empresa",
      dataIndex: "urlEmpresa",
      key: "urlEmpresa",
    },
    {
      title: "Costo kilometro",
      dataIndex: "costoKilometro",
      key: "costokilometro",
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
export default ModalDocumento;
