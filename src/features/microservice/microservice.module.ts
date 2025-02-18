import { Module } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([
    {
      name: 'REDIS_SERVICE',
      transport: Transport.REDIS,
      options: {
    host:'localhost',
    port:6379
      },
    },
  ]),],
  providers: [MicroserviceService],
  exports: [MicroserviceService],
})
export class MicroserviceModule {}
