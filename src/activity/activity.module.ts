import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityHttpService } from './activity.http.service';
import { HttpModule } from '@nestjs/axios';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Token]), HttpModule],
  providers: [ActivityService, ActivityHttpService, TokenService],
  controllers: [ActivityController],
  exports: [ActivityService, TypeOrmModule],
})
export class ActivityModule {}
