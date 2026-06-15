import React, { useState } from 'react'
import {
    Row, Col, Card, Tag, Button, Input, Select,
    Typography, Badge, Tooltip, Space, Empty,
} from 'antd'
import {
    SearchOutlined, EditOutlined, PlusOutlined,
    ShopOutlined,
} from '@ant-design/icons'
import { productos } from '../services/mockData.js'
import '../styles/Products.css'

const { Text, Title } = Typography
const { Option } = Select

const CATEGORIAS = ['Todas', 'Granos', 'Aceites', 'Endulzantes', 'Harinas', 'Lácteos', 'Condimentos', 'Pastas', 'Enlatados', 'Limpieza', 'Bebidas', 'Higiene', 'Botanas', 'Cereales']

const estadoColor = { activo: '#22C55E', bajo: '#F59E0B', agotado: '#EF4444' }
const estadoLabel = { activo: 'Activo', bajo: 'Bajo Stock', agotado: 'Agotado' }

function ProductCard({ product }) {
    return (
        <Card
            className="product-card"
            cover={
                <div className="product-card-img-wrapper">
                    <img
                        alt={product.nombre}
                        src={product.imagen}
                        className="product-card-img"
                    />
                    <div
                        className="product-card-badge"
                        style={{ background: estadoColor[product.estado] }}
                    >
                        {estadoLabel[product.estado]}
                    </div>
                </div>
            }
            actions={[
                <Tooltip key="edit" title="Editar producto">
                    <Button type="text" icon={<EditOutlined />} size="small">
                        Editar
                    </Button>
                </Tooltip>,
            ]}
            hoverable
        >
            <div className="product-card-content">
                <Tag color="blue" style={{ marginBottom: 6 }}>{product.categoria}</Tag>
                <Title level={5} style={{ margin: '0 0 4px', color: 'var(--color-text)', lineHeight: 1.3 }}>
                    {product.nombre}
                </Title>
                <div className="product-card-footer">
                    <span className="product-price">${product.precio.toFixed(2)}</span>
                    <span
                        className="product-stock"
                        style={{ color: product.stock <= 10 ? '#EF4444' : '#22C55E' }}
                    >
                        {product.stock} uds.
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default function Products() {
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('Todas')
    const [sortBy, setSortBy] = useState('nombre')

    const filtered = productos
        .filter(p => {
            const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
            const matchCat = catFilter === 'Todas' || p.categoria === catFilter
            return matchSearch && matchCat
        })
        .sort((a, b) => {
            if (sortBy === 'precio-asc') return a.precio - b.precio
            if (sortBy === 'precio-desc') return b.precio - a.precio
            if (sortBy === 'stock') return a.stock - b.stock
            return a.nombre.localeCompare(b.nombre)
        })

    return (
        <div className="products-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <Title level={4} style={{ margin: 0, color: 'var(--color-text)' }}>Productos</Title>
                    <Text type="secondary">{productos.length} productos en catálogo</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} style={{ background: '#14532D' }}>
                    Agregar Producto
                </Button>
            </div>

            {/* Filters */}
            <Card className="products-filters-card">
                <Space wrap style={{ width: '100%' }}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        allowClear
                        style={{ width: 260 }}
                    />
                    <Select value={catFilter} onChange={setCatFilter} style={{ width: 160 }}>
                        {CATEGORIAS.map(c => <Option key={c} value={c}>{c}</Option>)}
                    </Select>
                    <Select value={sortBy} onChange={setSortBy} style={{ width: 160 }}>
                        <Option value="nombre">A-Z Nombre</Option>
                        <Option value="precio-asc">Precio: Menor</Option>
                        <Option value="precio-desc">Precio: Mayor</Option>
                        <Option value="stock">Menos Stock</Option>
                    </Select>
                    <Text type="secondary">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</Text>
                </Space>
            </Card>

            {/* Category chips */}
            <div className="category-chips">
                {CATEGORIAS.map(c => (
                    <button
                        key={c}
                        className={`category-chip ${catFilter === c ? 'active' : ''}`}
                        onClick={() => setCatFilter(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
                <Card>
                    <Empty
                        image={<ShopOutlined style={{ fontSize: 64, color: 'var(--color-text-secondary)' }} />}
                        description="No se encontraron productos"
                    />
                </Card>
            ) : (
                <Row gutter={[16, 16]}>
                    {filtered.map(p => (
                        <Col key={p.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <ProductCard product={p} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}
