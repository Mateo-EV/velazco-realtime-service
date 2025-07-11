# Guía de Integración de Eventos en Tiempo Real para Frontend

## Descripción General

Este documento describe cómo integrar con el Servicio de Tiempo Real de Velazco para recibir actualizaciones en vivo de todas las entidades de negocio en tu aplicación frontend.

## Configuración de Conexión

### Endpoint de Server-Sent Events (SSE)

Conéctate al endpoint SSE para recibir eventos en tiempo real:

```javascript
const eventSource = new EventSource("http://localhost:3001/sse/events");

eventSource.onmessage = function (event) {
  const eventData = JSON.parse(event.data);
  handleRealtimeEvent(eventData);
};

eventSource.onerror = function (error) {
  console.error("Error de conexión SSE:", error);
  // Implementa lógica de reconexión aquí
};
```

### Estructura del Evento

Todos los eventos siguen esta estructura:

```typescript
interface EventPayload {
  type: string; // Tipo de evento (ver lista de eventos a continuación)
  data: any; // Datos específicos del evento
  timestamp?: string; // Timestamp ISO (si está disponible)
}
```

## Eventos Disponibles

### Eventos de Productos

#### `product.created`

Se dispara cuando se crea un nuevo producto.

```json
{
  "type": "product.created",
  "data": {
    "id": 123,
    "name": "Nombre del Producto",
    "description": "Descripción del Producto",
    "price": 99.99,
    "stock": 100,
    "categoryId": 1,
    "createdAt": "2025-07-11T10:00:00Z"
  }
}
```

#### `product.updated`

Se dispara cuando se actualiza un producto.

```json
{
  "type": "product.updated",
  "data": {
    "id": 123,
    "name": "Nombre del Producto Actualizado",
    "description": "Descripción Actualizada",
    "price": 109.99,
    "stock": 95,
    "categoryId": 1,
    "updatedAt": "2025-07-11T10:30:00Z"
  }
}
```

#### `product.deleted`

Se dispara cuando se elimina un producto.

```json
{
  "type": "product.deleted",
  "data": {
    "id": 123
  }
}
```

#### `product.stock.changed`

Se dispara cuando cambia el stock del producto (separado de las actualizaciones).

```json
{
  "type": "product.stock.changed",
  "data": {
    "productId": 123,
    "oldStock": 100,
    "newStock": 95,
    "change": -5,
    "reason": "ORDER_STARTED" // o "PRODUCTION_COMPLETED", "MANUAL_ADJUSTMENT"
  }
}
```

### Eventos de Categorías

#### `category.created`

```json
{
  "type": "category.created",
  "data": {
    "id": 1,
    "name": "Nombre de Categoría",
    "description": "Descripción de Categoría",
    "createdAt": "2025-07-11T10:00:00Z"
  }
}
```

#### `category.updated`

```json
{
  "type": "category.updated",
  "data": {
    "id": 1,
    "name": "Nombre de Categoría Actualizado",
    "description": "Descripción Actualizada",
    "updatedAt": "2025-07-11T10:30:00Z"
  }
}
```

#### `category.deleted`

```json
{
  "type": "category.deleted",
  "data": {
    "id": 1
  }
}
```

### Eventos de Órdenes

#### `order.started`

Se dispara cuando se inicia una orden (no cuando se crea).

```json
{
  "type": "order.started",
  "data": {
    "id": 456,
    "userId": 789,
    "total": 299.99,
    "status": "STARTED",
    "orderDetails": [
      {
        "id": 1,
        "productId": 123,
        "quantity": 2,
        "price": 99.99
      }
    ],
    "createdAt": "2025-07-11T11:00:00Z"
  }
}
```

#### `order.sale.confirmed`

Se dispara cuando se confirma la venta de una orden.

```json
{
  "type": "order.sale.confirmed",
  "data": {
    "id": 456,
    "status": "SALE_CONFIRMED",
    "confirmedAt": "2025-07-11T11:15:00Z"
  }
}
```

#### `order.dispatch.confirmed`

Se dispara cuando se confirma el despacho de una orden.

```json
{
  "type": "order.dispatch.confirmed",
  "data": {
    "id": 456,
    "status": "DISPATCH_CONFIRMED",
    "dispatchedAt": "2025-07-11T12:00:00Z"
  }
}
```

#### `order.cancelled`

Se dispara cuando se cancela una orden.

```json
{
  "type": "order.cancelled",
  "data": {
    "id": 456,
    "status": "CANCELLED",
    "cancelledAt": "2025-07-11T11:30:00Z"
  }
}
```

### Eventos de Producción

#### `production.created`

```json
{
  "type": "production.created",
  "data": {
    "id": 789,
    "status": "PENDING",
    "productionDetails": [
      {
        "id": 1,
        "productId": 123,
        "quantity": 50
      }
    ],
    "createdAt": "2025-07-11T09:00:00Z"
  }
}
```

#### `production.updated`

```json
{
  "type": "production.updated",
  "data": {
    "id": 789,
    "status": "IN_PROGRESS",
    "updatedAt": "2025-07-11T09:30:00Z"
  }
}
```

#### `production.finalized`

Se dispara cuando la producción se completa (no solo cuando se actualiza).

```json
{
  "type": "production.finalized",
  "data": {
    "id": 789,
    "status": "COMPLETED",
    "finalizedAt": "2025-07-11T14:00:00Z"
  }
}
```

#### `production.deleted`

```json
{
  "type": "production.deleted",
  "data": {
    "id": 789
  }
}
```

### Eventos de Usuarios

#### `user.created`

```json
{
  "type": "user.created",
  "data": {
    "id": 321,
    "username": "nuevoUsuario",
    "email": "usuario@example.com",
    "role": "USER",
    "createdAt": "2025-07-11T08:00:00Z"
  }
}
```

#### `user.updated`

```json
{
  "type": "user.updated",
  "data": {
    "id": 321,
    "username": "usuarioActualizado",
    "email": "actualizado@example.com",
    "updatedAt": "2025-07-11T08:30:00Z"
  }
}
```

#### `user.deleted`

```json
{
  "type": "user.deleted",
  "data": {
    "id": 321
  }
}
```

### Eventos de Ventas

#### `sale.created`

```json
{
  "type": "sale.created",
  "data": {
    "id": 654,
    "orderId": 456,
    "amount": 299.99,
    "saleDate": "2025-07-11T11:15:00Z"
  }
}
```

### Eventos de Despacho

#### `dispatch.created`

```json
{
  "type": "dispatch.created",
  "data": {
    "id": 987,
    "orderId": 456,
    "dispatchDate": "2025-07-11T12:00:00Z",
    "trackingNumber": "VLZ123456789"
  }
}
```
