import { Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) { }

  async processActivities(): Promise<void> {
    console.log('TokenService - processActivities');
    const activities = await this.activityRepository.find();
    for (const activity of activities) {
      await this.processActivity(activity);
    }
  }

  private async processActivity(activity: Activity): Promise<void> {
    console.log('TokenService - processActivity');

    let token = await this.tokenRepository.findOne({
      where: { index: activity.token_index, contract_address: activity.contract_address }
    }
    );

    if (!token) {
      token = this.tokenRepository.create({
        index: activity.token_index,
        contract_address: activity.contract_address,
        current_price: activity.listing_price,
      });
      await this.tokenRepository.save(token);
    } else {
      if (activity.listing_price < token.current_price) {
        token.current_price = activity.listing_price;
        await this.tokenRepository.save(token);
      }
    }
    if (activity.listing_to < new Date()) {
      const otherListings = await this.activityRepository.find({
        where: { token_index: activity.token_index, contract_address: activity.contract_address },
        order: { listing_to: 'DESC' },
        take: 1,
      });

      if (otherListings.length === 0 || otherListings[0].id === activity.id) {
        token.current_price = null;
        await this.tokenRepository.save(token);
      }
    }
  }
}
