import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MicroserviceService {
  constructor(
    @Inject('REDIS_SERVICE') private readonly client: ClientProxy,
  ) {}

  publish(event: string, message: any) {
    console.log('event: ', event);
    console.log('message: ', message);
    this.client.emit(event, message);
  }
}
