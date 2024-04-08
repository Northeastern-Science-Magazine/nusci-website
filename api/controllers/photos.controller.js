import PhotosAccessor from "../database_accessor/photos.accessor.js";
import Errors from "../error/errors.js";
import handleError from "../error/error.handler.js";

/**
 * Photos Controller class
 */
export default class PhotosCTRL {
  static async apiGetPhoto(req, res, next) {
    try {
      let id = req.params.id || {};

      let photo = await PhotosAccessor.getPhoto(id);

      if (photo) {
        res.render("photo", { photo });
      } else {
        return handleError(res, Errors[404].NotFound);
      }
    } catch (e) {
      return handleError(res, Errors[500].DataPOST);
    }
  }

  static async apiGetPhotos(req, res, next) {
    try {
      let photos = await PhotosAccessor.getAllPhotos();

      return res.json({ photos });
    } catch (e) {
      return handleError(res, Errors[500].DataGET);
    }
  }
}
