# Real-time Events Integration Guide for Frontend

## Overview

This document describes how to integrate with the Velazco Real-time Service to receive live updates for all business entities in your frontend application.

## Connection Setup

### Server-Sent Events (SSE) Endpoint

Connect to the SSE endpoint to receive real-time events:

```javascript
const eventSource = new EventSource("http://localhost:3001/sse/events");

eventSource.onmessage = function (event) {
  const eventData = JSON.parse(event.data);
  handleRealtimeEvent(eventData);
};

eventSource.onerror = function (error) {
  console.error("SSE connection error:", error);
  // Implement reconnection logic here
};
```

### Event Structure

All events follow this structure:

```typescript
interface EventPayload {
  type: string; // Event type (see events list below)
  data: any; // Event-specific data
  timestamp?: string; // ISO timestamp (if available)
}
```

## Available Events

### Product Events

#### `product.created`

Triggered when a new product is created.

```json
{
  "type": "product.created",
  "data": {
    "id": 123,
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "stock": 100,
    "categoryId": 1,
    "createdAt": "2025-07-11T10:00:00Z"
  }
}
```

#### `product.updated`

Triggered when a product is updated.

```json
{
  "type": "product.updated",
  "data": {
    "id": 123,
    "name": "Updated Product Name",
    "description": "Updated Description",
    "price": 109.99,
    "stock": 95,
    "categoryId": 1,
    "updatedAt": "2025-07-11T10:30:00Z"
  }
}
```

#### `product.deleted`

Triggered when a product is deleted.

```json
{
  "type": "product.deleted",
  "data": {
    "id": 123
  }
}
```

#### `product.stock.changed`

Triggered when product stock changes (separate from updates).

```json
{
  "type": "product.stock.changed",
  "data": {
    "productId": 123,
    "oldStock": 100,
    "newStock": 95,
    "change": -5,
    "reason": "ORDER_STARTED" // or "PRODUCTION_COMPLETED", "MANUAL_ADJUSTMENT"
  }
}
```

### Category Events

#### `category.created`

```json
{
  "type": "category.created",
  "data": {
    "id": 1,
    "name": "Category Name",
    "description": "Category Description",
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
    "name": "Updated Category Name",
    "description": "Updated Description",
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

### Order Events

#### `order.started`

Triggered when an order is initiated (not created).

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

Triggered when an order sale is confirmed.

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

Triggered when an order dispatch is confirmed.

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

Triggered when an order is cancelled.

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

### Production Events

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

Triggered when production is completed (not just updated).

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

### User Events

#### `user.created`

```json
{
  "type": "user.created",
  "data": {
    "id": 321,
    "username": "newuser",
    "email": "user@example.com",
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
    "username": "updateduser",
    "email": "updated@example.com",
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

### Sales Events

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

### Dispatch Events

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

## Frontend Implementation Examples

### React Hook Example

```javascript
import { useState, useEffect } from "react";

export const useRealtimeEvents = () => {
  const [events, setEvents] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/sse/events");

    eventSource.onopen = () => {
      setConnectionStatus("connected");
      console.log("Connected to real-time events");
    };

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setEvents((prev) => [...prev, eventData]);

      // Handle specific events
      handleEvent(eventData);
    };

    eventSource.onerror = (error) => {
      setConnectionStatus("error");
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
      setConnectionStatus("disconnected");
    };
  }, []);

  const handleEvent = (eventData) => {
    switch (eventData.type) {
      case "product.stock.changed":
        // Update product stock in your state management
        updateProductStock(eventData.data);
        break;
      case "order.started":
        // Show notification or update orders list
        showNotification("New order started");
        break;
      case "production.finalized":
        // Update production status
        updateProductionStatus(eventData.data);
        break;
      // Add more cases as needed
    }
  };

  return { events, connectionStatus };
};
```

### Vue.js Composition API Example

```javascript
import { ref, onMounted, onUnmounted } from "vue";

export function useRealtimeEvents() {
  const events = ref([]);
  const connectionStatus = ref("disconnected");
  let eventSource = null;

  const connectToEvents = () => {
    eventSource = new EventSource("http://localhost:3001/sse/events");

    eventSource.onopen = () => {
      connectionStatus.value = "connected";
    };

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      events.value.push(eventData);
      handleEvent(eventData);
    };

    eventSource.onerror = () => {
      connectionStatus.value = "error";
    };
  };

  const handleEvent = (eventData) => {
    // Implement your event handling logic
    console.log("Received event:", eventData);
  };

  onMounted(() => {
    connectToEvents();
  });

  onUnmounted(() => {
    if (eventSource) {
      eventSource.close();
    }
  });

  return {
    events,
    connectionStatus,
  };
}
```

### Angular Service Example

```typescript
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export interface RealtimeEvent {
  type: string;
  data: any;
  timestamp?: string;
}

@Injectable({
  providedIn: "root",
})
export class RealtimeEventsService {
  private eventSource: EventSource | null = null;
  private eventsSubject = new Subject<RealtimeEvent>();
  private connectionStatusSubject = new Subject<string>();

  public events$ = this.eventsSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  connect(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource("http://localhost:3001/sse/events");

    this.eventSource.onopen = () => {
      this.connectionStatusSubject.next("connected");
    };

    this.eventSource.onmessage = (event) => {
      const eventData: RealtimeEvent = JSON.parse(event.data);
      this.eventsSubject.next(eventData);
    };

    this.eventSource.onerror = () => {
      this.connectionStatusSubject.next("error");
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.connectionStatusSubject.next("disconnected");
    }
  }
}
```

## Error Handling and Reconnection

### Implementing Reconnection Logic

```javascript
class RealtimeEventManager {
  constructor(url, options = {}) {
    this.url = url;
    this.maxRetries = options.maxRetries || 5;
    this.retryDelay = options.retryDelay || 1000;
    this.retryCount = 0;
    this.eventSource = null;
    this.listeners = new Map();
  }

  connect() {
    try {
      this.eventSource = new EventSource(this.url);

      this.eventSource.onopen = () => {
        console.log("Connected to real-time events");
        this.retryCount = 0; // Reset retry count on successful connection
        this.emit("connected");
      };

      this.eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        this.emit("event", eventData);
        this.emit(eventData.type, eventData.data);
      };

      this.eventSource.onerror = () => {
        console.error("SSE connection error");
        this.handleConnectionError();
      };
    } catch (error) {
      console.error("Failed to create EventSource:", error);
      this.handleConnectionError();
    }
  }

  handleConnectionError() {
    this.emit("error");

    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      const delay = this.retryDelay * Math.pow(2, this.retryCount - 1); // Exponential backoff

      console.log(
        `Retrying connection in ${delay}ms (attempt ${this.retryCount}/${this.maxRetries})`,
      );

      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error("Max retry attempts reached. Please refresh the page.");
      this.emit("maxRetriesReached");
    }
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  emit(eventType, data = null) {
    const callbacks = this.listeners.get(eventType) || [];
    callbacks.forEach((callback) => callback(data));
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

// Usage
const eventManager = new RealtimeEventManager(
  "http://localhost:3001/sse/events",
  {
    maxRetries: 5,
    retryDelay: 1000,
  },
);

// Listen to specific events
eventManager.on("product.stock.changed", (data) => {
  console.log("Product stock changed:", data);
});

eventManager.on("order.started", (data) => {
  console.log("New order started:", data);
});

// Listen to connection events
eventManager.on("connected", () => {
  console.log("Successfully connected to real-time events");
});

eventManager.on("error", () => {
  console.log("Connection error occurred");
});

eventManager.on("maxRetriesReached", () => {
  alert("Real-time connection lost. Please refresh the page.");
});

// Start connection
eventManager.connect();
```

## Best Practices

### 1. Event Filtering

Filter events based on your component's needs:

```javascript
const handleEvent = (eventData) => {
  // Only handle events relevant to current view
  if (isProductPage() && eventData.type.startsWith("product.")) {
    updateProductData(eventData);
  } else if (isOrdersPage() && eventData.type.startsWith("order.")) {
    updateOrdersData(eventData);
  }
};
```

### 2. State Management Integration

Integrate with your state management solution:

```javascript
// Redux example
const handleEvent = (eventData) => {
  switch (eventData.type) {
    case "product.updated":
      store.dispatch(updateProduct(eventData.data));
      break;
    case "order.started":
      store.dispatch(addOrder(eventData.data));
      break;
    // ...
  }
};

// Vuex example
const handleEvent = (eventData) => {
  switch (eventData.type) {
    case "product.stock.changed":
      this.$store.commit("UPDATE_PRODUCT_STOCK", eventData.data);
      break;
    case "production.finalized":
      this.$store.commit("UPDATE_PRODUCTION_STATUS", eventData.data);
      break;
    // ...
  }
};
```

### 3. User Notifications

Show appropriate notifications to users:

```javascript
const handleEvent = (eventData) => {
  switch (eventData.type) {
    case "product.stock.changed":
      if (eventData.data.newStock < 10) {
        showWarningNotification(
          `Low stock alert: ${eventData.data.productName}`,
        );
      }
      break;
    case "order.started":
      showSuccessNotification("New order received!");
      break;
    case "production.finalized":
      showInfoNotification("Production completed successfully");
      break;
  }
};
```

### 4. Performance Considerations

- Debounce rapid updates to avoid excessive re-renders
- Use event batching for multiple related updates
- Implement lazy loading for large datasets

```javascript
import { debounce } from "lodash";

const debouncedUpdate = debounce((events) => {
  // Batch process multiple events
  const productUpdates = events.filter((e) => e.type.startsWith("product."));
  const orderUpdates = events.filter((e) => e.type.startsWith("order."));

  if (productUpdates.length) updateProducts(productUpdates);
  if (orderUpdates.length) updateOrders(orderUpdates);
}, 300);

let eventBuffer = [];

const handleEvent = (eventData) => {
  eventBuffer.push(eventData);
  debouncedUpdate(eventBuffer);
  eventBuffer = []; // Clear buffer after processing
};
```

## Testing

### Testing SSE Connection

```javascript
// Mock EventSource for testing
global.EventSource = jest.fn(() => ({
  onopen: jest.fn(),
  onmessage: jest.fn(),
  onerror: jest.fn(),
  close: jest.fn(),
}));

// Test event handling
test("should handle product stock change event", () => {
  const mockEvent = {
    type: "product.stock.changed",
    data: {
      productId: 123,
      oldStock: 100,
      newStock: 95,
      change: -5,
      reason: "ORDER_STARTED",
    },
  };

  const handler = jest.fn();
  eventManager.on("product.stock.changed", handler);
  eventManager.emit("product.stock.changed", mockEvent.data);

  expect(handler).toHaveBeenCalledWith(mockEvent.data);
});
```

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the NestJS service is running on port 3001
2. **CORS Issues**: Check that your frontend domain is allowed in the NestJS CORS configuration
3. **Event Not Received**: Verify the event type matches exactly (case-sensitive)
4. **Memory Leaks**: Always close EventSource connections when components unmount
5. **Duplicate Events**: Implement event deduplication if necessary

### Debug Mode

Enable debug logging:

```javascript
const DEBUG = true; // Set to false in production

const handleEvent = (eventData) => {
  if (DEBUG) {
    console.log("Received event:", eventData);
  }
  // Your event handling logic
};
```

## Configuration

### Environment Variables

```javascript
const SSE_URL =
  process.env.REACT_APP_SSE_URL || "http://localhost:3001/sse/events";
const SSE_RETRY_ATTEMPTS =
  parseInt(process.env.REACT_APP_SSE_RETRY_ATTEMPTS) || 5;
const SSE_RETRY_DELAY = parseInt(process.env.REACT_APP_SSE_RETRY_DELAY) || 1000;
```

### Production Considerations

- Use HTTPS for production deployments
- Implement proper authentication if required
- Consider load balancing for multiple frontend clients
- Monitor connection limits on the server side

## Support

For questions or issues with the real-time events integration, please:

1. Check this documentation first
2. Verify the NestJS service is running and accessible
3. Check browser console for any JavaScript errors
4. Contact the backend team if events are not being triggered from the Spring Boot application

---

**Last Updated**: July 11, 2025  
**Service Version**: 1.0.0  
**Compatible Frontend Frameworks**: React, Vue.js, Angular, Vanilla JavaScript
