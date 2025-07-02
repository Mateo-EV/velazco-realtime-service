import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { EventsController } from "@/events/events.controller";
import { SseController } from "@/sse/sse.controller";
import { SseService } from "@/sse/sse.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [AppController, SseController, EventsController],
  providers: [AppService, SseService],
})
export class AppModule {}
