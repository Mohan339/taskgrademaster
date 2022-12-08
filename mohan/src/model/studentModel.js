import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gradeID: {
      type: String,
      required: true,
      ref: "Grade",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
