'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    appName: { type: String, required: true },
    appIcon: { type: String, required: true },
    appVersion: { type: String, required: true },
  });
  return mongoose.model('File', UserSchema);
};
