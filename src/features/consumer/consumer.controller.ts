import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @EventPattern('player_created')
  handlePlayerCreated(data: any) {
    console.log('data: ', data);
    console.log('Player created:', data);
    
  }
}
