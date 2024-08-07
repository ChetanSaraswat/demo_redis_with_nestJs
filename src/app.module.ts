import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { PlayerModule } from './features/player/player.module';
import { RedisOptions } from 'configs/redisConfig';
import { ConsumerController } from './features/consumer/consumer.controller';
import { MicroserviceModule } from './features/microservice/microservice.module';

@Module({
  imports: [  ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),PlayerModule,MicroserviceModule],
  controllers: [AppController,ConsumerController],
  providers: [AppService],
})
export class AppModule {}
