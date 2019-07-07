import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  thirdPartyId: String,
  provider: String,
});
