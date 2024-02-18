export class CreateActivityDto {
  contractAddress: string;
  tokenIndex: string;
  listingPrice: number;
  maker: string;
  listingFrom: Date;
  listingTo: Date;
  eventTimestamp: Date;
}
