import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, mergeMap, throwError } from 'rxjs';
import { ActivityService } from './activity.service';
import { Interval } from '@nestjs/schedule';


@Injectable()
export class ActivityHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly activityService: ActivityService,
  ) { }

  @Interval(10000)
  async fetchData() {
    console.log('ActivityHttpService - fetchData');
    return this.httpService.get('https://api.reservoir.tools/events/asks/v3?limit=1000').pipe(
      map(response => response.data),
      map(data => data.events.filter(event => event.event.kind === 'new-order').map(event => ({
        contract_address: event.order.contract,
        token_index: event.order.criteria.data.token.tokenId,
        listing_price: event.order.price.amount.native,
        maker: event.order.maker,
        listing_from: new Date(event.order.validFrom * 1000),
        listing_to: new Date(event.order.validUntil * 1000),
        event_timestamp: new Date(event.event.createdAt)
      }))),
      mergeMap(transformedEvents => this.activityService.saveEventsToDatabase(transformedEvents)),
      catchError(error => {
        console.error('Error occurred while fetching or processing data:', error);
        return throwError(() => new Error('Error occurred while fetching or processing data'));
      })
    ).subscribe({
      next: result => {
        console.log('Data saved to database:',typeof result);
      },
      error: err => {
        console.error('Error occurred during database save:', err);
      }
    });
  }

}
