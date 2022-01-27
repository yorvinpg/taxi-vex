import React, { useState } from "react";
import { Button, Card, Col, Divider, Input, notification, Row, Table, Form, Switch, Avatar, Image } from "antd";
import { CheckCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import ModalDetalles from "./modalDetalles";

export const ListarUsuario = ({
  setMostrarVentana,
  setEditar,
  state,
  traerDatos,
  setUsuarioActivo,
  usuarioActivo,
  deshabilitarUsuario,
}) => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [datosModal, setDatosModal] = useState(null);
  const [estadoUsuario, setEstadoUsuario] = useState(false);
  const [pagination, setPagination] = useState({
    current:1,
    pageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20],
  });
  const [buscador, setBuscador] = useState({
    ruc: "",
    razon_social: "",
    nro_telefono: "",
  });

  const handleAgregar = () => {
    setMostrarVentana(true);
    setEditar(null);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    traerDatos(pagination, buscador, usuarioActivo);
  };

  const mostrarModalDetalle = (record) => {
    setAbrirModal(true);
    setDatosModal(record);
  };

  const handleBuscar = () => {
    traerDatos(pagination, buscador, usuarioActivo);
  };

  const openNotificacionEstado = () => {
    const key = `open${Date.now()}`;
    notification.open({
      duration: 2,
      style: { color: "#52c41a" },
      icon: <CheckCircleOutlined />,
      message: `Usuario ${estadoUsuario === true ? "Habilitado" : "Deshabilitado"
        }`,
      description: `El Usuario se ha ${estadoUsuario === true ? "habilitado" : "deshabilitado"
        } correctamente`,
      key,
    });
  };

  const columns1 = [
    {
      title: "ID",
      dataIndex: "idEmpresa",
      key: "idEmpresa",
    },
    {
      title: "Nombre",
      dataIndex: "nombreE",
      key: "nombreE",
      // width: 200,
    },
    {
      title: "Activo",
      dataIndex: "idActive",
      key: "idActive",
    },
    {
      title: "Accion",
      key: "action",
      width: 150,
      render: (text, record) => (
        <span>
          <span className="gx-link">
            {" "}
            <i
              onClick={() => mostrarModalDetalle(record)}
              className="icon icon-view-o"
              style={{ fontSize: 20 }}
            />
          </span>
          <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => {
                setMostrarVentana(true);
                setEditar(record);
              }}
              className="icon icon-edit"
              style={{ fontSize: 20, color: "green" }}
            />
          </span>
          <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => {
                setEstadoUsuario(!estadoUsuario);
                openNotificacionEstado();
                deshabilitarUsuario({
                  id_usuario: record.idUsuario,
                });
                traerDatos(pagination, buscador, true);
              }}
              className="icon icon-trash"
              style={{ fontSize: 20, color: "red" }}
            />
          </span>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <h2 style={{ margin: 0, padding: 0 }}>Empresas</h2>
            </Col>
            {/*//*Switch inactivos
                         <Col
                            lg={12}
                            md={12}
                            sm={12}
                            xs={24}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                            }}
                        >
                            <Form.Item
                                style={{ width: "auto", margin: "0" }}
                                name="tipoModenda"
                                label="Usuarios Activos"
                            >
                                <Switch
                                    checked={usuarioActivo}
                                    defaultChecked
                                    size="large"
                                    onChange={(e) => setUsuarioActivo(e)}
                                />
                            </Form.Item>
                        </Col> */}
          </Row>
        }
      >
        <Table
          size="default"
          style={{
            width: "100%",
            textAlign: "center",
          }}
          className="gx-table-responsive"
          columns={columns1}
          loading={state.loading}
          pagination={state.pagination}
          onChange={handleTableChange}
          dataSource={state.data}
        />
      </Card>
      <div
        onClick={handleAgregar}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          marginBottom: "40px",
          marginRight: "15px",
          borderRadius: '50px',
          backgroundColor: '#044cbf',
          width: '50px',
          height: '50px',
          boxShadow: '1px 5px 18px 0px rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <PlusOutlined style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px' }} />
      </div>
      {abrirModal ?
        <ModalDetalles datosModal={datosModal} abrirModal={abrirModal} setAbrirModal={setAbrirModal} />
        : null}
    </div>
  );
};
