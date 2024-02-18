import {
  Controller,
  Get,
} from '@nestjs/common';
import { ActivityHttpService } from './activity.http.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityHttpService: ActivityHttpService) {}


  @Get('/fetchData')
  fetchData() {
    console.log('fetchData - ActivityController');
    return this.activityHttpService.fetchData();
  }

}
