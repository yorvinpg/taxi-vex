import React, { useState, useEffect, useCallback, createRef, useMemo } from "react";
import { Button, Card, Col, Form, Input, message, Row, Select, DatePicker } from "antd";
import { httpClient } from "../../../util/Api";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";

export const AgregarUsuario = ({
    setMostrarVentana,
    setMostrarAlerta,
    editar,
    traerDatos,
}) => {
    const [estado, setEstado] = useState({});
    const [imagenURL, setImagenURL] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [hover, setHover] = useState(false);

    const formRef = createRef();

    const pagination = useMemo(() => {
        return {
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
        };
    }, []);

    const guardarUsuario = async () => {
        // setCargando(true);
        if (imagen != null) {
            try {
                const data = new FormData();
                data.append('idUsuario', estado.idUsuario);
                data.append('nombre', estado.nombre);
                data.append('apellido', estado.apellido);
                data.append('genero', estado.genero);
                data.append('fechaNacimiento', estado.fechaNacimiento);
                data.append('correo', estado.correo);
                data.append('imagen', imagen);
                const resp = await httpClient.post("auth/saveUsu", data);
                console.log(resp);
                if (resp.data.success) {
                    message.success('Usuario modificado correctamente');
                    traerDatos(pagination, {}, true);
                    setMostrarVentana(false);
                    setMostrarAlerta(true);
                } else {
                    message.warning('Ocurrió un error, vuelva a intentarlo');
                }
            } catch (error) {
                message.error("Ocurrió un error con la imagen");
            }
        } else {
            console.log("errorrrrr")
        }
    };

    const handleVolver = () => {
        setMostrarVentana(false);
        setMostrarAlerta(false);
    };

    const handleChangeNombre = (value) => {
        setEstado({ ...estado, nombre: value.target.value });
        formRef.current.setFieldsValue({ ...estado, nombre: value.target.value });
    };

    const handleChangeApellido = (value) => {
        setEstado({ ...estado, apellido: value.target.value });
        formRef.current.setFieldsValue({ apellido: value.target.value });
    };

    const handleChangeEmail = (value) => {
        setEstado({ ...estado, correo: value.target.value });
        formRef.current.setFieldsValue({ correoElectronico: value.target.value });
    };

    const handleChangeGenero = (value) => {
        setEstado({ ...estado, genero: value });
        formRef.current.setFieldsValue({ genero: value });
    };

    const handleChangeFechaNacimiento = (e) => {
        const fechaNacimiento = e.format("YYYY-MM-DD");
        setEstado({ ...estado, fechaNacimiento: fechaNacimiento });
        formRef.current.setFieldsValue({ fechaN: e });
    };

    const handleFile = event => {
        setImagenURL(URL.createObjectURL(event.target.files[0]));
        setImagen(event.target.files[0]);
    }

    function changeBackgroundHover(e) {
        e.target.style.background = 'rgba(0,0,0,0.3)';
        setHover(true);
    }

    function changeBackgroundLeave(e) {
        e.target.style.background = 'rgba(255,255,255,0)';
        setHover(false);
    }

    const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        console.log(editar);
        if (editar !== null) {
            editar.fechaN = Moment(editar.fechaNacimiento, "YYYY/MM/DD");
            editar.genero = editar.generoU;
            editar.correo = editar.correoElectronico;
            editar.imagen = editar.urlFoto;
            formRef.current.setFieldsValue({ ...editar });
            setEstado({ ...editar });
            if (editar.urlFoto != null) {
                setImagenURL('http://34.136.36.44/public/' + editar.urlFoto);
                setImagen(editar.urlFoto);
            }
        }
    }, [editar]);

    return (
        <Card
            title={
                <Row style={{ flexDirection: "row" }}>
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            margin: "0",
                        }}
                    >
                        <Button
                            style={{ border: "none", margin: "0", }}
                            onClick={handleVolver}
                            icon={<ArrowLeftOutlined />}
                        >

                        </Button>
                        <h1
                            style={{
                                paddingBottom: "0px",
                                paddingTop: "5px",
                                margin: "0 0 0 5px",
                            }}
                        >
                            {editar ? <>Editar</> : <>Registrar</>} Usuario
                        </h1>
                    </Col>
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={guardarUsuario} style={{ margin: "0" }}>
                            Guardar
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Form ref={formRef} layout="vertical" initialValues={estado}>
                <Row style={{ flexDirection: "row" }}>
                    <Col md={4} sm={8} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        {imagenURL == null ?
                            <>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleFile}
                                    ref={hiddenFileInput}
                                />
                                <Button
                                    style={{ height: '100px', width: '100px', whiteSpace: 'break-spaces', textAlign: 'center', lineHeight: '20px' }}
                                    onClick={() => hiddenFileInput.current.click()}
                                >
                                    Subir imagen
                                </Button>
                            </>
                            :
                            <div style={{ height: "100px", width: "100px", position: 'relative' }} onClick={() => { setImagenURL(null) }}>

                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-2px',
                                        bottom: '-2px',
                                        left: '-2px',
                                        right: '-2px',
                                        margin: 'auto',
                                        width: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', textAlign: 'center'
                                    }}
                                    onMouseOver={changeBackgroundHover}
                                    onMouseLeave={changeBackgroundLeave}
                                >
                                    {hover ?
                                        <DeleteOutlined style={{ color: 'white', fontSize: '20px', cursor: 'pointer', padding: '10px', borderRadius: '20px' }} />
                                        :
                                        null
                                    }
                                </div>
                                <img src={imagenURL} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt='imagen' />
                            </div>
                        }
                    </Col>
                    <Col md={10} sm={8} xs={24}>
                        <Form.Item name="nombre" label="Nombre">
                            <Input
                                type="text"
                                placeholder="Ingrese su Nombre"
                                onChange={handleChangeNombre}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={10} sm={8} xs={24}>
                        <Form.Item name="apellido" label="Apellido">
                            <Input
                                type="text"
                                placeholder="Ingrese su Apellido"
                                onChange={handleChangeApellido}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ flexDirection: "row", marginTop: "20px" }}>
                    <Col lg={8} md={8} sm={8} xs={24}>
                        <Form.Item name="correoElectronico" label="E_mail">
                            <Input
                                type="email"
                                placeholder="Ingrese su E_mail"
                                onChange={handleChangeEmail}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                        <Form.Item name="fechaN" label="Fecha de Nacimiento">
                            <DatePicker
                                onChange={handleChangeFechaNacimiento}
                                placeholder="Ingrese su Fecha de Nacimiento"
                                className="gx-mb-3 gx-w-100"
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                        <Form.Item name="generoU" label="Género">
                            <Select
                                showSearch
                                placeholder="Seleccione"
                                onChange={handleChangeGenero}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Select.Option key={1} value={1}>Hombre</Select.Option>
                                <Select.Option key={2} value={2}>Mujer</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AgregarUsuario;
