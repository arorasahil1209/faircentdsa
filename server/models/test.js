import Mongoose, { Schema } from "mongoose";

const options = {
  toJSON: {
    transform: (doc, obj) => {
      delete obj.__v;
      delete obj.id;
      return obj;
    },
    virtuals: false
  },
  strict: false,
  collection: "test"
};

const schemaDefination = new Schema(
  {
    user_name: { type: String, unique: true },
    message: { type: Number, default: null },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    created_at: { type: Number, default: Date.now },
    updated_at: { type: Number, default: Date.now },
  },
  options
);

const modelDefination = Mongoose.model("test", schemaDefination);

export default class Test {
  constructor() {
    this.model = modelDefination;
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}
