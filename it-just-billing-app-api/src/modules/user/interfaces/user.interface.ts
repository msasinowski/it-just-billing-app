import { Document } from 'mongoose';

export interface User extends Document {
  thirdPartyId: string;
  provider: string;
}
