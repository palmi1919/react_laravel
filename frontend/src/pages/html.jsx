import React, { useState } from 'react'
import {
    Card, Table, Tag, Button, Input, Space,
    Typography, Avatar, Tooltip, Popconfirm, message, Row, Col, Statistic,
} from 'antd'
import {
    SearchOutlined, UserAddOutlined, EditOutlined, DeleteOutlined,
    TeamOutlined, StarOutlined, UserOutlined,
} from '@ant-design/icons'
import { clientes } from '../services/mockData.js'
import '../styles/Clients.css'

const { Title, Text } = Typography

const AVATAR_COLORS = ['#14532D', '#1d4ed8', '#7c3aed', '#b45309', '#be123c', '#0369a1', '#374151', '#065f46']

const activos = clientes.filter(c => c.estado === 'activo').length
const topClient = [...clientes].sort((a, b) => b.total - a.total)[0]

export default function Clients() {
    const [data, setData] = useState(clientes)
    const [search, setSearch] = useState('')
    const [estado, setEstado] = useState('todos')

    const filtered = data.filter(c => {
        const matchSearch =
            c.nombre.toLowerCase().includes(search.toLowerCase()) ||
            c.correo.toLowerCase().includes(search.toLowerCase())
        const matchEstado = estado === 'todos' || c.estado === estado
        return matchSearch && matchEstado
    })

    const handleDelete = (id) => {
        setData(prev => prev.filter(c => c.id !== id))
        message.success('Cliente eliminado')
    }

    const columns = [
        {
            title: 'Cliente',
            key: 'cliente',
            render: (_, row) => (
                <Space>
                    <Avatar
                        size={38}
                        style={{
                            background: AVATAR_COLORS[row.id % AVATAR_COLORS.length],
                            fontWeight: 700,
                            fontSize: 15,
                        }}
                    >
                        {row.nombre.charAt(0)}
                    </Avatar>
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 13 }}>{row.nombre}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{row.correo}</Text>
                    </Space>
                </Space>
            ),
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
            render: v => <Text type="secondary">{v}</Text>,
        },
        {
            title: 'Compras',
            dataIndex: 'compras',
            key: 'compras',
            render: v => <Tag color="geekblue">{v} compras</Tag>,
            sorter: (a, b) => a.compras - b.compras,
        },
        {
            title: 'Total Gastado',
            dataIndex: 'total',
            key: 'total',
            render: v => <Text strong>${v.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</Text>,
            sorter: (a, b) => a.total - b.total,
        },
        {
            title: 'Cliente desde',
            dataIndex: 'fecha',
            key: 'fecha',
            render: v => <Text type="secondary">{v}</Text>,
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: v => <Tag color={v === 'activo' ? 'success' : 'default'}>{v === 'activo' ? 'Activo' : 'Inactivo'}</Tag>,
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <Button type="text" icon={<EditOutlined />} style={{ color: '#3B82F6' }} size="small" />
                    </Tooltip>
                    <Popconfirm
                        title="¿Eliminar este cliente?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Eliminar"
                        cancelText="Cancelar"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Eliminar">
                            <Button type="text" icon={<DeleteOutlined />} danger size="small" />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div className="clients-page">
            <div className="page-header">
                <div>
                    <Title level={4} style={{ margin: 0, color: 'var(--color-text)' }}>Clientes</Title>
                    <Text type="secondary">{data.length} clientes registrados</Text>
                </div>
                <Button type="primary" icon={<UserAddOutlined />} style={{ background: '#14532D' }}>
                    Nuevo Cliente
                </Button>
            </div>

            {/* Quick stats */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card className="clients-stat-card">
                        <Statistic
                            title="Clientes Activos"
                            value={activos}
                            prefix={<TeamOutlined style={{ color: '#22C55E' }} />}
                            valueStyle={{ color: '#14532D', fontWeight: 700 }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="clients-stat-card">
                        <Statistic
                            title="Total Clientes"
                            value={data.length}
                            prefix={<UserOutlined style={{ color: '#3B82F6' }} />}
                            valueStyle={{ color: '#3B82F6', fontWeight: 700 }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="clients-stat-card">
                        <div className="top-client">
                            <StarOutlined style={{ color: '#F59E0B', fontSize: 18 }} />
                            <div>
                                <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>Cliente Destacado</Text>
                                <Text strong style={{ color: 'var(--color-text)' }}>{topClient.nombre}</Text>
                                <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                                    ${topClient.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card className="clients-table-card">
                <div className="filters-bar">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Buscar por nombre o correo..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        allowClear
                        style={{ width: 280 }}
                    />
                    <Button.Group>
                        <Button onClick={() => setEstado('todos')} type={estado === 'todos' ? 'primary' : 'default'} style={estado === 'todos' ? { background: '#14532D', borderColor: '#14532D' } : {}}>
                            Todos
                        </Button>
                        <Button onClick={() => setEstado('activo')} type={estado === 'activo' ? 'primary' : 'default'} style={estado === 'activo' ? { background: '#14532D', borderColor: '#14532D' } : {}}>
                            Activos
                        </Button>
                        <Button onClick={() => setEstado('inactivo')} type={estado === 'inactivo' ? 'primary' : 'default'} style={estado === 'inactivo' ? { background: '#14532D', borderColor: '#14532D' } : {}}>
                            Inactivos
                        </Button>
                    </Button.Group>
                    <Text type="secondary" style={{ marginLeft: 'auto' }}>
                        {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                    </Text>
                </div>

                <Table
                    dataSource={filtered}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 8, showTotal: t => `${t} clientes` }}
                    scroll={{ x: 'max-content' }}
                    size="middle"
                />
            </Card>
        </div>
    )
}
