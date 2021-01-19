'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const VersionSchema = new Schema({
    appName: { type: String, required: true },
    appId: { type: String, required: true },
    appVersion: { type: String, required: true },
    appIcon: { type: String, required: true },
    platform: { type: String, required: true },
    packageId: { type: String, required: true },
  });
  return mongoose.model('Version', VersionSchema);
};
