import React, { useState } from 'react'
import {
  Row, Col, Card, Form, Input, Button, Switch, Select,
  Typography, Divider, Avatar, Upload, message, Tabs,
} from 'antd'
import {
  UserOutlined, ShopOutlined, BellOutlined, LockOutlined,
  UploadOutlined, SaveOutlined, KeyOutlined,
} from '@ant-design/icons'
import '../styles/Settings.css'

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

export default function Settings() {
  const [generalForm] = Form.useForm()
  const [profileForm] = Form.useForm()
  const [securityForm] = Form.useForm()

  const [notifications, setNotifications] = useState({
    stockBajo: true,
    nuevaVenta: true,
    nuevoCliente: false,
    reporteDiario: true,
    alertasEmail: true,
  })

  const handleSave = (formName) => {
    message.success(`${formName} guardada correctamente`)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <Title level={4} style={{ margin: 0, color: 'var(--color-text)' }}>Configuración</Title>
          <Text type="secondary">Administra las preferencias del sistema</Text>
        </div>
      </div>

      <Tabs defaultActiveKey="general" type="card" className="settings-tabs">

        {/* ===== GENERAL ===== */}
        <TabPane tab={<span><ShopOutlined /> Negocio</span>} key="general">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Información de la Tienda" className="settings-card">
                <Form
                  form={generalForm}
                  layout="vertical"
                  initialValues={{
                    nombre: 'Abarrotes Guerrero',
                    direccion: 'Calle Principal #123, Col. Centro',
                    ciudad: 'Ciudad de México',
                    telefono: '55-1234-5678',
                    rfc: 'GUER800101ABC',
                    moneda: 'MXN',
                    idioma: 'es',
                  }}
                  onFinish={() => handleSave('Información')}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="nombre" label="Nombre de la Tienda" rules={[{ required: true }]}>
                        <Input prefix={<ShopOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="rfc" label="RFC">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="direccion" label="Dirección">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="ciudad" label="Ciudad">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="telefono" label="Teléfono">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="moneda" label="Moneda">
                        <Select>
                          <Option value="MXN">MXN — Peso Mexicano</Option>
                          <Option value="USD">USD — Dólar Americano</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="idioma" label="Idioma">
                        <Select>
                          <Option value="es">Español</Option>
                          <Option value="en">Inglés</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ background: '#14532D' }}>
                    Guardar Cambios
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Logotipo de la Tienda" className="settings-card">
                <div className="logo-upload">
                  <Avatar
                    size={100}
                    icon={<ShopOutlined />}
                    style={{ background: '#14532D', fontSize: 42 }}
                  />
                  <Upload showUploadList={false} accept="image/*">
                    <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                      Cambiar Logo
                    </Button>
                  </Upload>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: 'center' }}>
                    PNG, JPG o SVG. Máx 2MB.
                  </Text>
                </div>
              </Card>

              <Card title="Sobre el Sistema" className="settings-card" style={{ marginTop: 16 }}>
                <div className="system-info">
                  <div className="info-row">
                    <Text type="secondary">Versión:</Text>
                    <Text strong>v1.0.0</Text>
                  </div>
                  <div className="info-row">
                    <Text type="secondary">Última actualización:</Text>
                    <Text strong>Jun 2024</Text>
                  </div>
                  <div className="info-row">
                    <Text type="secondary">Plan:</Text>
                    <Text strong style={{ color: '#22C55E' }}>Profesional</Text>
                  </div>
                  <div className="info-row">
                    <Text type="secondary">Soporte:</Text>
                    <Text strong>Activo</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* ===== PERFIL ===== */}
        <TabPane tab={<span><UserOutlined /> Perfil</span>} key="perfil">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Datos del Administrador" className="settings-card">
                <div className="profile-avatar-row">
                  <Avatar
                    size={80}
                    style={{ background: '#22C55E', color: '#14532D', fontSize: 30, fontWeight: 700 }}
                  >
                    AG
                  </Avatar>
                  <div>
                    <Text strong style={{ fontSize: 16, display: 'block', color: 'var(--color-text)' }}>
                      Admin Guerrero
                    </Text>
                    <Text type="secondary">Administrador Principal</Text>
                  </div>
                </div>
                <Divider />
                <Form
                  form={profileForm}
                  layout="vertical"
                  initialValues={{
                    nombre: 'Admin',
                    apellido: 'Guerrero',
                    correo: 'admin@abarrotes-guerrero.mx',
                    telefono: '55-0000-0000',
                    rol: 'admin',
                  }}
                  onFinish={() => handleSave('Perfil')}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="apellido" label="Apellido">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="correo" label="Correo Electrónico" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="telefono" label="Teléfono">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="rol" label="Rol">
                        <Select disabled>
                          <Option value="admin">Administrador</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ background: '#14532D' }}>
                    Actualizar Perfil
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* ===== SEGURIDAD ===== */}
        <TabPane tab={<span><LockOutlined /> Seguridad</span>} key="seguridad">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card title="Cambiar Contraseña" className="settings-card">
                <Form
                  form={securityForm}
                  layout="vertical"
                  onFinish={() => handleSave('Contraseña')}
                >
                  <Form.Item name="actual" label="Contraseña Actual" rules={[{ required: true }]}>
                    <Input.Password prefix={<KeyOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="nueva"
                    label="Nueva Contraseña"
                    rules={[{ required: true, min: 8, message: 'Mínimo 8 caracteres' }]}
                  >
                    <Input.Password prefix={<KeyOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="confirmar"
                    label="Confirmar Contraseña"
                    dependencies={['nueva']}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('nueva') === value) return Promise.resolve()
                          return Promise.reject('Las contraseñas no coinciden')
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<KeyOutlined />} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" icon={<LockOutlined />} style={{ background: '#14532D' }}>
                    Actualizar Contraseña
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* ===== NOTIFICACIONES ===== */}
        <TabPane tab={<span><BellOutlined /> Notificaciones</span>} key="notificaciones">
          <Col xs={24} lg={14}>
            <Card title="Preferencias de Notificación" className="settings-card">
              {[
                { key: 'stockBajo',      label: 'Alerta de stock bajo',       desc: 'Notificar cuando un producto tenga poco stock' },
                { key: 'nuevaVenta',     label: 'Nueva venta completada',      desc: 'Recibir alerta por cada venta registrada' },
                { key: 'nuevoCliente',   label: 'Nuevo cliente registrado',    desc: 'Alerta cuando se agregue un cliente nuevo' },
                { key: 'reporteDiario',  label: 'Reporte diario automático',   desc: 'Envío automático del reporte al final del día' },
                { key: 'alertasEmail',   label: 'Alertas por correo',          desc: 'Recibir notificaciones en el correo registrado' },
              ].map(n => (
                <div key={n.key} className="notification-row">
                  <div>
                    <Text strong style={{ color: 'var(--color-text)', display: 'block' }}>{n.label}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{n.desc}</Text>
                  </div>
                  <Switch
                    checked={notifications[n.key]}
                    onChange={(v) => setNotifications(prev => ({ ...prev, [n.key]: v }))}
                    style={{ flexShrink: 0 }}
                  />
                </div>
              ))}
              <Divider />
              <Button type="primary" icon={<SaveOutlined />} style={{ background: '#14532D' }}
                onClick={() => message.success('Notificaciones guardadas')}>
                Guardar Preferencias
              </Button>
            </Card>
          </Col>
        </TabPane>
      </Tabs>
    </div>
  )
}
