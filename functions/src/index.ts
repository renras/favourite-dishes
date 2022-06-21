import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import * as sharp from "sharp";
import * as path from "path";
// import { homedir } from "os";
admin.initializeApp();

export const createThumbnail = functions.storage
  .object()
  .onFinalize(async (object) => {
    try {
      const bucket = getStorage().bucket();
      const file = bucket.file(object.name as string);
      const fileName = path.basename(object.name as string);

      if (fileName.startsWith("_thumb")) {
        return functions.logger.log("Already a Thumbnail.");
      }

      const contents = await file.download();

      const buffer = await sharp(contents[0]).resize(100, 100).toBuffer();
      const thumbnail = bucket.file("_thumb" + fileName);
      await thumbnail.save(buffer);
    } catch (error) {
      functions.logger.log(error);
    }
  });
