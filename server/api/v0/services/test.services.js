import Boom from "boom";
import User from "../../../models/test";
import mongoose from "mongoose";

export class TestService {
  updateNotification(query,updateObj, done){
    const _data = new Notification();
      _data.model.update(
        query, 
        {$set : updateObj},
        (err, result) => {
          if (err) {
              return done(err);
          }
          return done(null, result);
      });
  }
}

export default new TestService();
