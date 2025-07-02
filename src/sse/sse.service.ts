import { EventPayload } from "@/events/event.types";
import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class SseService {
  private readonly subject = new Subject<EventPayload>();
  public readonly stream$ = this.subject.asObservable();

  public emitEvent(type: EventPayload["type"], data: unknown): void {
    this.subject.next({ type, data });
  }
}
