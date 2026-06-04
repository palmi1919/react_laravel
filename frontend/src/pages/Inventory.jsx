import React, { useState } from 'react'
import {
  Card, Table, Tag, Button, Input, Select, Space,
  Typography, Modal, Form, InputNumber, message, Tooltip, Popconfirm,
} from 'antd'
import {
  SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  FilterOutlined, ExportOutlined,
} from '@ant-design/icons'
import { productos as initialProductos } from '../services/mockData.js'
import '../styles/Inventory.css'

const { Title, Text } = Typography
const { Option } = Select

const CATEGORIAS = ['Todos', 'Granos', 'Aceites', 'Endulzantes', 'Harinas', 'Lácteos', 'Condimentos', 'Pastas', 'Enlatados', 'Limpieza', 'Bebidas', 'Higiene', 'Botanas', 'Cereales']

const estadoConfig = {
  activo:  { color: 'success', label: 'Activo'     },
  bajo:    { color: 'warning', label: 'Stock Bajo'  },
  agotado: { color: 'error',   label: 'Agotado'    },
}

export default function Inventory() {
  const [data, setData]               = useState(initialProductos)
  const [search, setSearch]           = useState('')
  const [catFilter, setCatFilter]     = useState('Todos')
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [editModal, setEditModal]     = useState(false)
  const [editItem, setEditItem]       = useState(null)
  const [form] = Form.useForm()

  const filtered = data.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) ||
                        p.categoria.toLowerCase().includes(search.toLowerCase())
    const matchCat    = catFilter === 'Todos' || p.categoria === catFilter
    const matchEstado = estadoFilter === 'todos' || p.estado === estadoFilter
    return matchSearch && matchCat && matchEstado
  })

  const openEdit = (record) => {
    setEditItem(record)
    form.setFieldsValue(record)
    setEditModal(true)
  }

  const handleSave = () => {
    form.validateFields().then(values => {
      setData(prev => prev.map(p => p.id === editItem.id ? { ...p, ...values } : p))
      message.success('Producto actualizado correctamente')
      setEditModal(false)
    })
  }

  const handleDelete = (id) => {
    setData(prev => prev.filter(p => p.id !== id))
    message.success('Producto eliminado')
  }

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text) => <Text strong>{text}</Text>,
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      render: (v) => <Tag color="blue">{v}</Tag>,
      sorter: (a, b) => a.categoria.localeCompare(b.categoria),
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (v) => <Text strong>${v.toFixed(2)}</Text>,
      sorter: (a, b) => a.precio - b.precio,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (v, row) => (
        <Text strong style={{ color: row.estado === 'agotado' ? '#EF4444' : row.estado === 'bajo' ? '#F59E0B' : '#22C55E' }}>
          {v} uds.
        </Text>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (v) => <Tag color={estadoConfig[v]?.color}>{estadoConfig[v]?.label}</Tag>,
      filters: [
        { text: 'Activo',     value: 'activo'  },
        { text: 'Stock Bajo', value: 'bajo'    },
        { text: 'Agotado',   value: 'agotado' },
      ],
      onFilter: (value, record) => record.estado === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#3B82F6' }}
              onClick={() => openEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="¿Eliminar este producto?"
            description="Esta acción no se puede deshacer."
            onConfirm={() => handleDelete(record.id)}
            okText="Eliminar"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Eliminar">
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="inventory-page">
      {/* Page header */}
      <div className="page-header">
        <div>
          <Title level={4} style={{ margin: 0, color: 'var(--color-text)' }}>Inventario</Title>
          <Text type="secondary">{data.length} productos registrados</Text>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>Exportar</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: '#14532D' }}>
            Nuevo Producto
          </Button>
        </Space>
      </div>

      <Card className="inventory-card">
        {/* Filters bar */}
        <div className="filters-bar">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar por nombre o categoría..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            style={{ width: 280 }}
          />
          <Select value={catFilter} onChange={setCatFilter} style={{ width: 160 }} prefix={<FilterOutlined />}>
            {CATEGORIAS.map(c => <Option key={c} value={c}>{c}</Option>)}
          </Select>
          <Select value={estadoFilter} onChange={setEstadoFilter} style={{ width: 140 }}>
            <Option value="todos">Todos los estados</Option>
            <Option value="activo">Activos</Option>
            <Option value="bajo">Stock Bajo</Option>
            <Option value="agotado">Agotados</Option>
          </Select>
          <Text type="secondary" style={{ marginLeft: 'auto' }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </Text>
        </div>

        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `${t} productos` }}
          scroll={{ x: 'max-content' }}
          size="middle"
          className="inventory-table"
        />
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Editar Producto"
        open={editModal}
        onOk={handleSave}
        onCancel={() => setEditModal(false)}
        okText="Guardar Cambios"
        cancelText="Cancelar"
        okButtonProps={{ style: { background: '#14532D' } }}
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="nombre" label="Nombre del Producto" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoria" label="Categoría" rules={[{ required: true }]}>
            <Select>
              {CATEGORIAS.filter(c => c !== 'Todos').map(c => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="precio" label="Precio (MXN)" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.5} prefix="$" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="estado" label="Estado" rules={[{ required: true }]}>
            <Select>
              <Option value="activo">Activo</Option>
              <Option value="bajo">Stock Bajo</Option>
              <Option value="agotado">Agotado</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
