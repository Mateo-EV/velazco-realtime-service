import { Controller, Sse } from "@nestjs/common";
import { SseService } from "./sse.service";
import { map, Observable } from "rxjs";
import { EventPayload } from "@/events/event.types";

@Controller("sse")
export class SseController {
  constructor(private sseService: SseService) {}

  @Sse("events")
  public events(): Observable<EventPayload> {
    return this.sseService.stream$.pipe(
      map((event) => ({
        type: event.type,
        data: event.data,
      })),
    );
  }
}
