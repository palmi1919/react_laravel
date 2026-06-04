import React from 'react'
import { Row, Col, Card, Table, Tag, Avatar, Typography } from 'antd'
import {
  AppstoreOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

import StatCard from '../components/StatCard.jsx'
import { dashboardStats, ventasSemanales, ventas, productos } from '../services/mockData.js'
import '../styles/Dashboard.css'

const { Text } = Typography

const recentSalesColumns = [
  { title: 'Pedido',    dataIndex: 'id',       key: 'id',       render: v => <Text strong style={{ color: '#22C55E' }}>{v}</Text> },
  { title: 'Cliente',   dataIndex: 'cliente',  key: 'cliente',  render: v => <Text>{v}</Text> },
  { title: 'Productos', dataIndex: 'productos', key: 'productos', render: v => <Tag color="geekblue">{v} items</Tag> },
  { title: 'Total',     dataIndex: 'total',    key: 'total',    render: v => <Text strong>${v.toFixed(2)}</Text> },
  {
    title: 'Estado', dataIndex: 'estado', key: 'estado',
    render: (v) => {
      const map = { completada: 'success', pendiente: 'warning', cancelada: 'error' }
      const label = { completada: 'Completada', pendiente: 'Pendiente', cancelada: 'Cancelada' }
      return <Tag color={map[v]}>{label[v]}</Tag>
    },
  },
  { title: 'Hora', dataIndex: 'hora', key: 'hora', render: v => <Text type="secondary">{v}</Text> },
]

const lowStockProducts = productos.filter(p => p.estado === 'bajo' || p.estado === 'agotado')

const lowStockColumns = [
  {
    title: 'Producto', dataIndex: 'nombre', key: 'nombre',
    render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar src={row.imagen} size={36} shape="square" style={{ borderRadius: 6 }} />
        <Text>{v}</Text>
      </div>
    ),
  },
  { title: 'Categoría',  dataIndex: 'categoria', key: 'categoria', render: v => <Text type="secondary">{v}</Text> },
  { title: 'Stock',      dataIndex: 'stock',     key: 'stock',     render: v => <Text strong style={{ color: v <= 5 ? '#EF4444' : '#F59E0B' }}>{v} uds.</Text> },
  {
    title: 'Estado', dataIndex: 'estado', key: 'estado',
    render: (v) => {
      const map = { bajo: 'warning', agotado: 'error' }
      const label = { bajo: 'Stock bajo', agotado: 'Agotado' }
      return <Tag color={map[v]}>{label[v]}</Tag>
    },
  },
]

export default function Dashboard() {
  const stats = [
    {
      title: 'Productos Registrados',
      value: dashboardStats.totalProductos,
      icon: <AppstoreOutlined />,
      color: '#14532D',
      change: 5.2,
      changeType: 'up',
      description: '12 nuevos esta semana',
    },
    {
      title: 'Ventas del Día',
      value: `$${dashboardStats.ventasHoy.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      icon: <ShoppingCartOutlined />,
      color: '#22C55E',
      change: 12.8,
      changeType: 'up',
      description: '23 transacciones hoy',
    },
    {
      title: 'Ganancias Totales',
      value: `$${(dashboardStats.ganancias / 1000).toFixed(1)}k`,
      icon: <DollarOutlined />,
      color: '#3B82F6',
      change: 8.4,
      changeType: 'up',
      description: 'Junio 2024',
    },
    {
      title: 'Stock Bajo',
      value: dashboardStats.bajosStock,
      icon: <WarningOutlined />,
      color: '#F59E0B',
      change: 2,
      changeType: 'up',
      description: 'Requieren reabastecimiento',
    },
    {
      title: 'Clientes Activos',
      value: dashboardStats.clientesActivos,
      icon: <TeamOutlined />,
      color: '#8B5CF6',
      change: 3.1,
      changeType: 'up',
      description: 'Últimos 30 días',
    },
    {
      title: 'Pedidos Pendientes',
      value: dashboardStats.pedidosPendientes,
      icon: <ClockCircleOutlined />,
      color: '#EF4444',
      change: 4.5,
      changeType: 'down',
      description: 'Por procesar',
    },
  ]

  return (
    <div className="dashboard-page">
      {/* Welcome banner */}
      <div className="dashboard-banner">
        <div>
          <h2 className="dashboard-greeting">Buenos días, Administrador</h2>
          <p className="dashboard-date">
            Martes, 4 de junio de 2024 &mdash; Resumen diario de Abarrotes Guerrero
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <Row gutter={[16, 16]} className="stats-row">
        {stats.map((s, i) => (
          <Col key={i} xs={24} sm={12} md={12} lg={8} xl={4}>
            <StatCard {...s} />
          </Col>
        ))}
      </Row>

      {/* Charts row */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card
            title="Ventas de la Semana"
            className="chart-card"
            extra={<Tag color="green">Esta semana</Tag>}
          >

          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Actividad Reciente" className="chart-card activity-card">
            <div className="activity-list">
              {ventas.slice(0, 5).map((v, i) => (
                <div key={i} className="activity-item">
                  <Avatar size={36} style={{ background: '#22C55E20', color: '#14532D', fontWeight: 700, flexShrink: 0 }}>
                    {v.cliente.charAt(0)}
                  </Avatar>
                  <div className="activity-info">
                    <span className="activity-name">{v.cliente}</span>
                    <span className="activity-detail">{v.productos} productos &mdash; {v.hora}</span>
                  </div>
                  <span className="activity-amount">${v.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables row */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} xl={14}>
          <Card title="Ventas Recientes" className="table-card" extra={<Tag color="green">Hoy</Tag>}>
            <Table
              dataSource={ventas.slice(0, 6)}
              columns={recentSalesColumns}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card
            title="Productos con Stock Bajo"
            className="table-card"
            extra={<Tag color="warning">{lowStockProducts.length} alertas</Tag>}
          >
            <Table
              dataSource={lowStockProducts}
              columns={lowStockColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
