// ==================== PRODUCTS ====================
export const productos = [
  { id: 1,  nombre: 'Arroz Extra',           categoria: 'Granos',       precio: 28.50, stock: 145, imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80', estado: 'activo' },
  { id: 2,  nombre: 'Frijol Negro',           categoria: 'Granos',       precio: 32.00, stock: 8,   imagen: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=200&q=80', estado: 'bajo' },
  { id: 3,  nombre: 'Aceite Vegetal 1L',      categoria: 'Aceites',      precio: 45.00, stock: 60,  imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80', estado: 'activo' },
  { id: 4,  nombre: 'Azúcar Morena 1kg',      categoria: 'Endulzantes',  precio: 22.00, stock: 5,   imagen: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=200&q=80', estado: 'bajo' },
  { id: 5,  nombre: 'Harina de Trigo 1kg',    categoria: 'Harinas',      precio: 18.50, stock: 90,  imagen: 'https://images.unsplash.com/photo-1627485937980-22d45c7b98f3?w=200&q=80', estado: 'activo' },
  { id: 6,  nombre: 'Leche Entera 1L',        categoria: 'Lácteos',      precio: 26.00, stock: 42,  imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80', estado: 'activo' },
  { id: 7,  nombre: 'Sal de Mesa 1kg',        categoria: 'Condimentos',  precio: 8.50,  stock: 200, imagen: 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=200&q=80', estado: 'activo' },
  { id: 8,  nombre: 'Pasta Espagueti 500g',   categoria: 'Pastas',       precio: 14.00, stock: 75,  imagen: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&q=80', estado: 'activo' },
  { id: 9,  nombre: 'Atún en Lata 140g',      categoria: 'Enlatados',    precio: 18.00, stock: 120, imagen: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=200&q=80', estado: 'activo' },
  { id: 10, nombre: 'Jabón de Barra',         categoria: 'Limpieza',     precio: 12.00, stock: 3,   imagen: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f33e?w=200&q=80', estado: 'agotado' },
  { id: 11, nombre: 'Café Molido 250g',       categoria: 'Bebidas',      precio: 55.00, stock: 30,  imagen: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80', estado: 'activo' },
  { id: 12, nombre: 'Papel Higiénico 4 Rol.', categoria: 'Higiene',      precio: 35.00, stock: 18,  imagen: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=200&q=80', estado: 'activo' },
  { id: 13, nombre: 'Galletas Marinelas',     categoria: 'Botanas',      precio: 12.50, stock: 88,  imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&q=80', estado: 'activo' },
  { id: 14, nombre: 'Detergente 1kg',         categoria: 'Limpieza',     precio: 42.00, stock: 7,   imagen: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&q=80', estado: 'bajo' },
  { id: 15, nombre: 'Aceite de Oliva 500ml',  categoria: 'Aceites',      precio: 85.00, stock: 22,  imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80', estado: 'activo' },
  { id: 16, nombre: 'Cereal de Maíz 500g',    categoria: 'Cereales',     precio: 36.00, stock: 55,  imagen: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&q=80', estado: 'activo' },
]

// ==================== CLIENTS ====================
export const clientes = [
  { id: 1, nombre: 'María García',      correo: 'maria@email.com',   telefono: '55-1234-5678', compras: 42, total: 3850.00, fecha: '2024-01-15', estado: 'activo' },
  { id: 2, nombre: 'José Martínez',     correo: 'jose@email.com',    telefono: '55-2345-6789', compras: 28, total: 2100.50, fecha: '2024-02-10', estado: 'activo' },
  { id: 3, nombre: 'Ana López',         correo: 'ana@email.com',     telefono: '55-3456-7890', compras: 15, total: 980.00,  fecha: '2024-03-05', estado: 'inactivo' },
  { id: 4, nombre: 'Luis Hernández',    correo: 'luis@email.com',    telefono: '55-4567-8901', compras: 67, total: 5620.75, fecha: '2023-12-20', estado: 'activo' },
  { id: 5, nombre: 'Carmen Rodríguez', correo: 'carmen@email.com',  telefono: '55-5678-9012', compras: 9,  total: 450.00,  fecha: '2024-04-18', estado: 'activo' },
  { id: 6, nombre: 'Pedro Sánchez',     correo: 'pedro@email.com',   telefono: '55-6789-0123', compras: 53, total: 4320.00, fecha: '2024-01-08', estado: 'activo' },
  { id: 7, nombre: 'Laura González',    correo: 'laura@email.com',   telefono: '55-7890-1234', compras: 3,  total: 145.50,  fecha: '2024-05-12', estado: 'inactivo' },
  { id: 8, nombre: 'Carlos Díaz',       correo: 'carlos@email.com',  telefono: '55-8901-2345', compras: 31, total: 2780.25, fecha: '2024-02-28', estado: 'activo' },
]

// ==================== SALES ====================
export const ventas = [
  { id: '#V-1001', cliente: 'María García',    productos: 5, total: 185.50, fecha: '2024-06-01', hora: '09:15', metodo: 'Efectivo',  estado: 'completada' },
  { id: '#V-1002', cliente: 'José Martínez',   productos: 3, total: 92.00,  fecha: '2024-06-01', hora: '10:30', metodo: 'Tarjeta',   estado: 'completada' },
  { id: '#V-1003', cliente: 'Luis Hernández',  productos: 8, total: 340.00, fecha: '2024-06-01', hora: '11:45', metodo: 'Efectivo',  estado: 'completada' },
  { id: '#V-1004', cliente: 'Carmen Rodríguez',productos: 2, total: 55.00,  fecha: '2024-06-01', hora: '12:20', metodo: 'Transferencia', estado: 'pendiente' },
  { id: '#V-1005', cliente: 'Pedro Sánchez',   productos: 6, total: 215.00, fecha: '2024-06-01', hora: '13:05', metodo: 'Tarjeta',   estado: 'completada' },
  { id: '#V-1006', cliente: 'Carlos Díaz',     productos: 4, total: 128.00, fecha: '2024-06-01', hora: '14:15', metodo: 'Efectivo',  estado: 'completada' },
  { id: '#V-1007', cliente: 'Ana López',        productos: 7, total: 295.50, fecha: '2024-05-31', hora: '09:00', metodo: 'Tarjeta',   estado: 'completada' },
  { id: '#V-1008', cliente: 'Laura González',  productos: 1, total: 28.50,  fecha: '2024-05-31', hora: '10:45', metodo: 'Efectivo',  estado: 'cancelada' },
  { id: '#V-1009', cliente: 'María García',    productos: 9, total: 412.00, fecha: '2024-05-31', hora: '11:30', metodo: 'Transferencia', estado: 'completada' },
  { id: '#V-1010', cliente: 'José Martínez',   productos: 3, total: 87.50,  fecha: '2024-05-30', hora: '16:00', metodo: 'Efectivo',  estado: 'completada' },
]

// ==================== CHARTS DATA ====================
export const ventasSemanales = [
  { dia: 'Lun', ventas: 1850, meta: 2000 },
  { dia: 'Mar', ventas: 2340, meta: 2000 },
  { dia: 'Mié', ventas: 1760, meta: 2000 },
  { dia: 'Jue', ventas: 2890, meta: 2000 },
  { dia: 'Vie', ventas: 3200, meta: 2000 },
  { dia: 'Sáb', ventas: 4150, meta: 2000 },
  { dia: 'Dom', ventas: 2700, meta: 2000 },
]

export const productosMasVendidos = [
  { name: 'Arroz Extra',      value: 342 },
  { name: 'Aceite Vegetal',   value: 287 },
  { name: 'Leche Entera',     value: 265 },
  { name: 'Frijol Negro',     value: 198 },
  { name: 'Azúcar Morena',    value: 176 },
  { name: 'Pasta Espagueti',  value: 154 },
]

export const ingresosMensuales = [
  { mes: 'Ene', ingresos: 42500, gastos: 18200 },
  { mes: 'Feb', ingresos: 38900, gastos: 16400 },
  { mes: 'Mar', ingresos: 51200, gastos: 20100 },
  { mes: 'Abr', ingresos: 47800, gastos: 19300 },
  { mes: 'May', ingresos: 55600, gastos: 22500 },
  { mes: 'Jun', ingresos: 62100, gastos: 24800 },
  { mes: 'Jul', ingresos: 58400, gastos: 23100 },
  { mes: 'Ago', ingresos: 64900, gastos: 25600 },
  { mes: 'Sep', ingresos: 59300, gastos: 23800 },
  { mes: 'Oct', ingresos: 67800, gastos: 27100 },
  { mes: 'Nov', ingresos: 72400, gastos: 29200 },
  { mes: 'Dic', ingresos: 85600, gastos: 34100 },
]

// ==================== DASHBOARD STATS ====================
export const dashboardStats = {
  totalProductos: 248,
  ventasHoy: 1349.50,
  ganancias: 72400,
  bajosStock: 4,
  clientesActivos: 186,
  pedidosPendientes: 12,
}
