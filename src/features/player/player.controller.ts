import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';




@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('add-player')
  create(@Body() payload: CreatePlayerDto) {
    return this.playerService.createPlayer(payload);
  }

  // @Get()
  // findAll() {
  //   return this.playerService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.playerService.getPlayer(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
  //   return this.playerService.update(+id, updatePlayerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.playerService.remove(+id);
  // }
}
