import { Injectable, Inject} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { DataSource, Repository } from 'typeorm';
import { Player } from 'src/domain/Player/player.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class PlayerService extends Repository<Player> {
  constructor(
    private dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  //  @Inject('REDIS_SERVICE') private client: ClientProxy,
  private microserviceService: MicroserviceService,
  ) {
    super(Player, dataSource.createEntityManager());
  }

  async createPlayer(payload: CreatePlayerDto) {
    const player = await this.save(payload);
    if(player){
      //this.client.emit('player_created', player);
      console.log("first")
      this.microserviceService.publish('player_created', player);
    }
    await this.cacheManager.set(`player_${player?.id}`, player,  3600 );
    return player;
  }

  async getPlayer(id: number): Promise<Player> {

    const cachedPlayer = await this.cacheManager.get<Player>(`player_${id}`);
    console.log('cachedPlayer: ', cachedPlayer);
    if (cachedPlayer) {
      return cachedPlayer;
    }

    const player = await this.findOne({ where: { id } });
    if (player) {
      await this.cacheManager.set(`player_${id}`, player, 3600 ); 
    }
    return player;
  }


  // findAll() {
  //   return `This action returns all player`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} player`;
  // }

  // update(id: number, updatePlayerDto: UpdatePlayerDto) {
  //   return `This action updates a #${id} player`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} player`;
  // }
}
