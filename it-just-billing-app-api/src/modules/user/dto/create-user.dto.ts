import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CreateUser {
  @Field()
  readonly thirdPartyId: string;
  @Field()
  readonly provider: string;
}
