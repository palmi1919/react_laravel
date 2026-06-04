import React, { useState } from 'react'
import { Layout, Menu, Avatar, Badge, Input, Button, Dropdown, Tooltip } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  LogoutOutlined,
  ShopOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import '../styles/MainLayout.css'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/dashboard',      icon: <DashboardOutlined />,    label: 'Inicio' },
  { key: '/inventario',     icon: <InboxOutlined />,        label: 'Inventario' },
  { key: '/productos',      icon: <AppstoreOutlined />,     label: 'Productos' },
  { key: '/ventas',         icon: <ShoppingCartOutlined />, label: 'Ventas' },
  { key: '/clientes',       icon: <TeamOutlined />,         label: 'Clientes' },
  { key: '/reportes',       icon: <BarChartOutlined />,     label: 'Reportes' },
  { key: '/configuracion',  icon: <SettingOutlined />,      label: 'Configuración' },
]

const profileMenu = [
  { key: 'profile', icon: <UserOutlined />, label: 'Mi Perfil' },
  { key: 'logout',  icon: <LogoutOutlined />, label: 'Cerrar sesión' },
]

export default function MainLayout({ darkMode, toggleDarkMode }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const siderWidth = collapsed ? 72 : 240

  return (
    <Layout className="main-layout">
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={240}
        collapsedWidth={72}
        className="main-sider"
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        {/* Logo */}
        <div className="sider-logo">
          <div className="sider-logo-icon">
            <ShopOutlined style={{ fontSize: 22, color: '#22C55E' }} />
          </div>
          {!collapsed && (
            <div className="sider-logo-text">
              <span className="sider-brand">Abarrotes</span>
              <span className="sider-sub">Guerrero</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.key),
          }))}
          className="sider-menu"
        />

        {/* Collapse button */}
        <div className="sider-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed
            ? <MenuUnfoldOutlined style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }} />
            : <MenuFoldOutlined   style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }} />
          }
        </div>
      </Sider>

      <Layout style={{ marginLeft: siderWidth, transition: 'margin-left 0.3s ease' }}>
        {/* HEADER */}
        <Header className="main-header" style={{ left: siderWidth }}>
          <div className="header-left">
            <span className="header-title">
              {menuItems.find(m => m.key === location.pathname)?.label ?? 'Panel Admin'}
            </span>
          </div>

          <div className="header-center">
            <Input
              prefix={<SearchOutlined style={{ color: 'var(--color-text-secondary)' }} />}
              placeholder="Buscar productos, clientes, pedidos..."
              className="header-search"
              allowClear
            />
          </div>

          <div className="header-right">
            <Tooltip title={darkMode ? 'Modo claro' : 'Modo oscuro'}>
              <Button
                type="text"
                shape="circle"
                icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleDarkMode}
                className="header-icon-btn"
              />
            </Tooltip>

            <Tooltip title="Notificaciones">
              <Badge count={5} size="small">
                <Button
                  type="text"
                  shape="circle"
                  icon={<BellOutlined />}
                  className="header-icon-btn"
                />
              </Badge>
            </Tooltip>

            <Dropdown
              menu={{ items: profileMenu }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="header-profile">
                <Avatar
                  size={36}
                  style={{ background: '#22C55E', color: '#14532D', fontWeight: 700, cursor: 'pointer' }}
                >
                  AG
                </Avatar>
                <div className="header-profile-info">
                  <span className="header-profile-name">Admin</span>
                  <span className="header-profile-role">Administrador</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* CONTENT */}
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
