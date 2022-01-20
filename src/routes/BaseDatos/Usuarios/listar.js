import React, { useState } from "react";
import { Button, Card, Col, Divider, Input, notification, Row, Table, Form, Switch, Avatar, Image } from "antd";
import { CheckCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import ModalDetalles from "./modalDetalles";
// import { Fab } from "@material-ui/core";
// import { Add } from "@material-ui/icons";

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
    current: 1,
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
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      // width: 150,
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <Avatar
            size="large"
            icon={
              <Image
                preview={false}
                src={process.env.REACT_APP_URL_BACKEND_IMAGENES + record.urlFoto}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
            }
          />
          <p style={{ margin: 0 }}>
            {text}
          </p>
        </div>
      ),
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      // width: 200,
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
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
              <h2 style={{ margin: 0, padding: 0 }}>Usuarios</h2>
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
