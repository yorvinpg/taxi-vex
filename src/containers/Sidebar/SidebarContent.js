import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";

import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const SubMenu = Menu.SubMenu;
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div> */}
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="home">
              <Link to="/home"><i className="icon icon-widgets" />
                <span>Inicio</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="baseDatos"
              popupClassName={getNoHeaderClass(navStyle)}
              title={
                <span>
                  {/* {" "} */}
                  <i className="icon icon-profile2" />
                  <span>USUARIOS</span>
                </span>
              }
            >
              <Menu.Item key="baseDatos/usuarios">
                <Link to="/baseDatos/usuarios">
                  <i className="icon icon-user-o" />
                  <span>Pasajeros</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="baseDatos/conductores">
                <Link to="/baseDatos/conductores">
                  <i className="icon icon-chart-composed" />
                  <span>Conductores</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="baseDatos/pendientes">
                <Link to="/baseDatos/pendientes">
                  <i className="icon icon-auth-screen" />
                  <span>Pendientes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="baseDatos/rechazados">
                <Link to="/baseDatos/rechazados">
                  <i className="icon icon-close-circle" />
                  <span>Rechazados</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Empresas"
              popupClassName={getNoHeaderClass(navStyle)}
              title={
                <span>
                  {/* {" "} */}
                  <i className="icon icon-company" />
                  <span>EMPRESAS</span>
                </span>
              }
            >
              <Menu.Item key="Empresas/Registros">
                <Link to="/Empresas/Registros">
                  <i className="icon icon-editor" />
                  <span>Registros</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Configuraciones"
              popupClassName={getNoHeaderClass(navStyle)}
              title={
                <span>
                  {/* {" "} */}
                  <i className="icon icon-setting" />
                  <span>Configuraciones</span>
                </span>
              }
            >
              <Menu.Item key="Configuraciones/Registro">
                <Link to="/Configuraciones/Registro">
                  <i className="icon icon-editor" />
                  <span>Registros</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="FormaPago"
              popupClassName={getNoHeaderClass(navStyle)}
              title={
                <span>
                  {/* {" "} */}
                  <i className="icon icon-card" />
                  <span>Forma de Pago</span>
                </span>
              }
            >
              <Menu.Item key="FormaPago/Registros">
                <Link to="/FormaPago/Registros">
                  <i className="icon icon-editor" />
                  <span>Registros</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

