import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("products", schema);
export default model;