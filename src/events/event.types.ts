enum PRODUCTS_EVENTS {
  CREATED = "product.created",
  UPDATED = "product.updated",
  DELETED = "product.deleted",
  STOCK_CHANGED = "product.stock.changed",
}

enum CATEGORIES_EVENTS {
  CREATED = "category.created",
  UPDATED = "category.updated",
  DELETED = "category.deleted",
}

enum ORDERS_EVENTS {
  STARTED = "order.started",
  SALE_CONFIRMED = "order.sale.confirmed",
  DISPATCH_CONFIRMED = "order.dispatch.confirmed",
  CANCELLED = "order.cancelled",
}

enum PRODUCTION_EVENTS {
  CREATED = "production.created",
  UPDATED = "production.updated",
  FINALIZED = "production.finalized",
  DELETED = "production.deleted",
}

enum USERS_EVENTS {
  CREATED = "user.created",
  UPDATED = "user.updated",
  DELETED = "user.deleted",
}

enum SALES_EVENTS {
  CREATED = "sale.created",
}

enum DISPATCH_EVENTS {
  CREATED = "dispatch.created",
}

export const EVENTS = {
  PRODUCTS: PRODUCTS_EVENTS,
  CATEGORIES: CATEGORIES_EVENTS,
  ORDERS: ORDERS_EVENTS,
  PRODUCTION: PRODUCTION_EVENTS,
  USERS: USERS_EVENTS,
  SALES: SALES_EVENTS,
  DISPATCH: DISPATCH_EVENTS,
} as const;

export type EventType =
  | PRODUCTS_EVENTS
  | CATEGORIES_EVENTS
  | ORDERS_EVENTS
  | PRODUCTION_EVENTS
  | USERS_EVENTS
  | SALES_EVENTS
  | DISPATCH_EVENTS;

export interface EventPayload {
  type: EventType;
  data: unknown;
}
