import { SseService } from "@/sse/sse.service";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS } from "./event.types";

@Controller()
export class EventsController {
  constructor(private readonly sseService: SseService) {}

  // Product events
  @EventPattern(EVENTS.PRODUCTS.CREATED)
  handleProductCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTS.CREATED, data);
  }

  @EventPattern(EVENTS.PRODUCTS.UPDATED)
  handleProductUpdated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTS.UPDATED, data);
  }

  @EventPattern(EVENTS.PRODUCTS.DELETED)
  handleProductDeleted(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTS.DELETED, data);
  }

  @EventPattern(EVENTS.PRODUCTS.STOCK_CHANGED)
  handleProductStockChanged(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTS.STOCK_CHANGED, data);
  }

  // Category events
  @EventPattern(EVENTS.CATEGORIES.CREATED)
  handleCategoryCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.CATEGORIES.CREATED, data);
  }

  @EventPattern(EVENTS.CATEGORIES.UPDATED)
  handleCategoryUpdated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.CATEGORIES.UPDATED, data);
  }

  @EventPattern(EVENTS.CATEGORIES.DELETED)
  handleCategoryDeleted(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.CATEGORIES.DELETED, data);
  }

  // Order events
  @EventPattern(EVENTS.ORDERS.STARTED)
  handleOrderStarted(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.ORDERS.STARTED, data);
  }

  @EventPattern(EVENTS.ORDERS.SALE_CONFIRMED)
  handleOrderSaleConfirmed(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.ORDERS.SALE_CONFIRMED, data);
  }

  @EventPattern(EVENTS.ORDERS.DISPATCH_CONFIRMED)
  handleOrderDispatchConfirmed(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.ORDERS.DISPATCH_CONFIRMED, data);
  }

  @EventPattern(EVENTS.ORDERS.CANCELLED)
  handleOrderCancelled(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.ORDERS.CANCELLED, data);
  }

  // Production events
  @EventPattern(EVENTS.PRODUCTION.CREATED)
  handleProductionCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTION.CREATED, data);
  }

  @EventPattern(EVENTS.PRODUCTION.UPDATED)
  handleProductionUpdated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTION.UPDATED, data);
  }

  @EventPattern(EVENTS.PRODUCTION.FINALIZED)
  handleProductionFinalized(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTION.FINALIZED, data);
  }

  @EventPattern(EVENTS.PRODUCTION.DELETED)
  handleProductionDeleted(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTION.DELETED, data);
  }

  // User events
  @EventPattern(EVENTS.USERS.CREATED)
  handleUserCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.USERS.CREATED, data);
  }

  @EventPattern(EVENTS.USERS.UPDATED)
  handleUserUpdated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.USERS.UPDATED, data);
  }

  @EventPattern(EVENTS.USERS.DELETED)
  handleUserDeleted(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.USERS.DELETED, data);
  }

  // Sale events
  @EventPattern(EVENTS.SALES.CREATED)
  handleSaleCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.SALES.CREATED, data);
  }

  // Dispatch events
  @EventPattern(EVENTS.DISPATCH.CREATED)
  handleDispatchCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.DISPATCH.CREATED, data);
  }

  // @EventPattern()
  // fallback(@Payload() data: any, @Ctx() context: RmqContext) {
  //   console.log("⚠️ Sin patrón específico:", data);
  //   console.log("Contexto de RMQ:", context.getArgs());
  //   console.log("Contexto de RMQ:", context.getPattern());
  // }
}
