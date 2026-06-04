import React, { useState } from 'react'
import { Row, Col, Card, Tag, Select, Typography, Table } from 'antd'
import { productosMasVendidos } from '../services/mockData.js'
import '../styles/Reports.css'

const { Title, Text } = Typography
const { Option } = Select

const topProductsColumns = [
  {
    title: '#',
    key: 'index',
    render: (_, __, i) => <Text type="secondary">{i + 1}</Text>,
  },
  {
    title: 'Producto',
    dataIndex: 'name',
    key: 'name',
    render: (v) => <Text strong>{v}</Text>,
  },
  {
    title: 'Unidades',
    dataIndex: 'value',
    key: 'value',
    sorter: (a, b) => a.value - b.value,
  },
]

export default function Reports() {
  const [period, setPeriod] = useState('mes')

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <Title level={4}>Reportes</Title>
          <Text type="secondary">
            Análisis de desempeño del negocio
          </Text>
        </div>

        <Select
          value={period}
          onChange={setPeriod}
          style={{ width: 140 }}
        >
          <Option value="semana">Esta semana</Option>
          <Option value="mes">Este mes</Option>
          <Option value="trimestre">Trimestre</Option>
          <Option value="año">Este año</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Title level={3}>$125,000</Title>
            <Text>Ingresos del mes</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Title level={3}>1,250</Title>
            <Text>Productos vendidos</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Title level={3}>320</Title>
            <Text>Clientes atendidos</Text>
          </Card>
        </Col>
      </Row>

      <Card
        title="Productos Más Vendidos"
        className="reports-card"
        style={{ marginTop: 20 }}
      >
        <Table
          dataSource={productosMasVendidos}
          columns={topProductsColumns}
          rowKey="name"
          pagination={false}
        />
      </Card>

      <Card
        title="Estado de Gráficas"
        className="reports-card"
        style={{ marginTop: 20 }}
      >
        <Tag color="orange">
          Gráficas desactivadas temporalmente
        </Tag>
      </Card>
    </div>
  )
}