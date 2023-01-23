const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema(
    {
        weekday: { type: String, required: true },
        planned: { type: Object, required: true },
        actual: { type: Object, required: true },
    },
    {
        timestamps: true
      });