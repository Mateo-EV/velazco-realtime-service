enum PRODUCTS_EVENTS {
  UPDATED = "product.updated",
  DELETED = "product.deleted",
  CREATED = "product.created",
}

enum ORDERS_EVENTS {
  UPDATED = "order.updated",
  DELETED = "order.deleted",
  CREATED = "order.created",
}

export const EVENTS = {
  PRODUCTS: PRODUCTS_EVENTS,
  ORDERS: ORDERS_EVENTS,
} as const;

export type EventType = PRODUCTS_EVENTS | ORDERS_EVENTS;

export interface EventPayload {
  type: EventType;
  data: unknown;
}
