import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

/**
 * Approved Article Schema
 */
const PhotoSchema = new Schema(
  {
    images: [{ type: String }],
  },
  {
    collection: "photos",
  }
);

const db = mongoose.connection.useDb("photos");

// article model
const Photo = db.model("Photo", PhotoSchema);

export default Photo;