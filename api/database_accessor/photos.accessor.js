import Photo from "../models/photo.js";
import Connection from "../db/connection.js";
import mongoose from "mongoose";

/**
 * Photos Accessor Class
 *
 * Accesses the articles
 */
export default class PhotosAccessor {
  /**
   * Posts a new article to the pending articles database
   *
   * @param {*} photoDoc
   * @returns {JSON} object
   */
  static async postPhoto(photoDoc) {
    try {
      await Connection.open("photos"); // changed
      const photo = await Photo.create(photoDoc); // changed
      return photo;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * getPhoto method
   *
   * Gets a photo based off of its Mongo ObjectID
   *
   * @param {String} photoID
   * @returns photo
   */
  static async getPhoto(photoID) {
    try {
      await Connection.open("photos");
      const photo = await Photo.findById(new mongoose.Types.ObjectId(photoID));
      return photo;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * getAllPhotos method
   *
   * gets all the photos
   *
   * @returns every single one of them as an array
   */
  static async getAllPhotos() {
    try {
      await Connection.open("photos");
      const photos = await Photo.find({});
      return photos;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
