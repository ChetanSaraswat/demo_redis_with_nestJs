import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from 'src/domain/Player/player.entity';

@Injectable()
export class PlayerService extends Repository<Player> {
  createPlayer(payload: CreatePlayerDto) {
    return this.save(payload);
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
