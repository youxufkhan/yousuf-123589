import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'yousufkhan',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ActivityModule,
    ScheduleModule.forRoot(),
    TokenModule
  ],
})
export class AppModule {}
