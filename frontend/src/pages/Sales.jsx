import React, { useState } from 'react'
import {
  Card, Table, Tag, Button, Input, Select,
  Typography, Space, Row, Col, Statistic, DatePicker,
} from 'antd'
import {
  SearchOutlined, PlusOutlined, DollarOutlined,
  ShoppingCartOutlined, CheckCircleOutlined, ClockCircleOutlined,
} from '@ant-design/icons'
import { ventas } from '../services/mockData.js'
import '../styles/Sales.css'

const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const estadoColor = { completada: 'success', pendiente: 'warning', cancelada: 'error' }
const estadoLabel = { completada: 'Completada', pendiente: 'Pendiente', cancelada: 'Cancelada' }
const metodoColor = { Efectivo: 'green', Tarjeta: 'blue', Transferencia: 'purple' }

const totalVentas  = ventas.reduce((s, v) => s + (v.estado === 'completada' ? v.total : 0), 0)
const completadas  = ventas.filter(v => v.estado === 'completada').length
const pendientes   = ventas.filter(v => v.estado === 'pendiente').length

export default function Sales() {
  const [search, setSearch]     = useState('')
  const [estado, setEstado]     = useState('todos')
  const [metodo, setMetodo]     = useState('todos')

  const filtered = ventas.filter(v => {
    const matchSearch = v.cliente.toLowerCase().includes(search.toLowerCase()) ||
                        v.id.toLowerCase().includes(search.toLowerCase())
    const matchEstado = estado === 'todos' || v.estado === estado
    const matchMetodo = metodo === 'todos' || v.metodo === metodo
    return matchSearch && matchEstado && matchMetodo
  })

  const columns = [
    {
      title: 'Pedido',
      dataIndex: 'id',
      key: 'id',
      render: v => <Text strong style={{ color: '#22C55E', fontFamily: 'monospace' }}>{v}</Text>,
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: v => <Text>{v}</Text>,
      sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    },
    {
      title: 'Productos',
      dataIndex: 'productos',
      key: 'productos',
      render: v => <Tag color="geekblue">{v} items</Tag>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: v => <Text strong>${v.toFixed(2)}</Text>,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Método',
      dataIndex: 'metodo',
      key: 'metodo',
      render: v => <Tag color={metodoColor[v]}>{v}</Tag>,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha, row) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 13 }}>{fecha}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{row.hora}</Text>
        </Space>
      ),
      sorter: (a, b) => a.fecha.localeCompare(b.fecha),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: v => <Tag color={estadoColor[v]}>{estadoLabel[v]}</Tag>,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      render: () => (
        <Button size="small" type="text" style={{ color: '#3B82F6' }}>
          Ver detalle
        </Button>
      ),
    },
  ]

  return (
    <div className="sales-page">
      <div className="page-header">
        <div>
          <Title level={4} style={{ margin: 0, color: 'var(--color-text)' }}>Ventas</Title>
          <Text type="secondary">{ventas.length} transacciones registradas</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#14532D' }}>
          Nueva Venta
        </Button>
      </div>

      {/* Summary stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="sales-stat-card">
            <Statistic
              title="Total en Ventas"
              value={totalVentas}
              precision={2}
              prefix={<DollarOutlined style={{ color: '#22C55E' }} />}
              valueStyle={{ color: '#14532D', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="sales-stat-card">
            <Statistic
              title="Ventas Completadas"
              value={completadas}
              prefix={<CheckCircleOutlined style={{ color: '#22C55E' }} />}
              valueStyle={{ color: '#22C55E', fontWeight: 700 }}
              suffix={`/ ${ventas.length}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="sales-stat-card">
            <Statistic
              title="Pendientes"
              value={pendientes}
              prefix={<ClockCircleOutlined style={{ color: '#F59E0B' }} />}
              valueStyle={{ color: '#F59E0B', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="sales-table-card">
        {/* Filters */}
        <div className="filters-bar">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar por cliente o pedido..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            style={{ width: 280 }}
          />
          <Select value={estado} onChange={setEstado} style={{ width: 160 }}>
            <Option value="todos">Todos los estados</Option>
            <Option value="completada">Completada</Option>
            <Option value="pendiente">Pendiente</Option>
            <Option value="cancelada">Cancelada</Option>
          </Select>
          <Select value={metodo} onChange={setMetodo} style={{ width: 160 }}>
            <Option value="todos">Todos los métodos</Option>
            <Option value="Efectivo">Efectivo</Option>
            <Option value="Tarjeta">Tarjeta</Option>
            <Option value="Transferencia">Transferencia</Option>
          </Select>
          <Text type="secondary" style={{ marginLeft: 'auto' }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </Text>
        </div>

        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8, showTotal: t => `${t} ventas` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </Card>
    </div>
  )
}
