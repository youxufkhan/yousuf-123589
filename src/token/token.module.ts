import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Activity } from 'src/activity/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token,Activity])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService, TypeOrmModule],
})
export class TokenModule {}
