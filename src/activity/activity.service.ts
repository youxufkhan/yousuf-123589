import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { TokenService } from 'src/token/token.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly tokenService: TokenService,
  ) { }

  async saveEventsToDatabase(events: CreateActivityDto[]) {
    console.log('saveEventsToDatabase - ActivityService');
    await this.activityRepository.save(events);
    await this.tokenService.processActivities()
    return true;
  }
}
