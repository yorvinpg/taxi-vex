import React, { useCallback, useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { httpClient } from "../../../util/Api";
import { AgregarUsuario } from "./agregar";
import { ListarUsuario } from "./listar";

const Usuarios = () => {

    const [usuarioActivo, setUsuarioActivo] = useState(true);
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [editar, setEditar] = useState(null);
    const [state, setState] = useState({
        data: [],
        loading: false,
    });

    const traerDatos = useCallback(async () => {
        setState({
            ...state,
            loading: true,
        });
        try {
            setMostrarAlerta(false);
            const resp = await httpClient.post(`/listar/getUsu`, {});
            console.log('listarUsu:',resp);
            setState({
                loading: false,
                data: resp.data.data,
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const openNotificationExiste = () => {
        const key = `open${Date.now()}`;
        notification.open({
            duration: 2,
            style: { color: "#52c41a" },
            icon: <CheckCircleOutlined />,
            message: "Guardado Correctamente",
            description: "Se guardaron los cambios del Usuario",
            key,
        });
    };

    const deshabilitarUsuario = async (id) => {
        try {
            const resp = await httpClient.post("/deleteUsuario", id);
            console.log("Deshabilitar:", resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        traerDatos(state.pagination, {}, usuarioActivo);
    }, [usuarioActivo]);

    return (
        <div>
            <div>{mostrarAlerta ? openNotificationExiste() : null}</div>
            <div>
                {mostrarVentana ? (
                    <AgregarUsuario
                        setMostrarVentana={setMostrarVentana}
                        setMostrarAlerta={setMostrarAlerta}
                        editar={editar}
                        traerDatos={traerDatos}
                    />
                ) : (
                    <ListarUsuario
                        setState={setState}
                        setMostrarVentana={setMostrarVentana}
                        setEditar={setEditar}
                        state={state}
                        traerDatos={traerDatos}
                        setUsuarioActivo={setUsuarioActivo}
                        usuarioActivo={usuarioActivo}
                        deshabilitarUsuario={deshabilitarUsuario}
                    />
                )}
            </div>
        </div>
    );
};

export default Usuarios;
