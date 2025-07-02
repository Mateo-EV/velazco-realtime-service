import { SseService } from "@/sse/sse.service";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EVENTS } from "./event.types";

@Controller()
export class EventsController {
  constructor(private readonly sseService: SseService) {}

  @EventPattern(EVENTS.PRODUCTS.CREATED)
  handleProductCreated(@Payload() data: unknown) {
    this.sseService.emitEvent(EVENTS.PRODUCTS.CREATED, data);
  }

  // @EventPattern()
  // fallback(@Payload() data: any, @Ctx() context: RmqContext) {
  //   console.log("⚠️ Sin patrón específico:", data);
  //   console.log("Contexto de RMQ:", context.getArgs());
  //   console.log("Contexto de RMQ:", context.getPattern());
  // }
}
