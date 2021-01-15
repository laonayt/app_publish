'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const VersionSchema = new Schema({
    appId: { type: String, required: true },
    version: { type: String, required: true },
  });
  return mongoose.module('Version', VersionSchema);
};
