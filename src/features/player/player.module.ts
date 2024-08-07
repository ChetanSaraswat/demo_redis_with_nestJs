import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { MicroserviceModule } from '../microservice/microservice.module';
import { MicroserviceService } from '../microservice/microservice.service';

@Module({
  imports:[MicroserviceModule],
  controllers: [PlayerController],
  providers: [PlayerService],

})
export class PlayerModule {}
