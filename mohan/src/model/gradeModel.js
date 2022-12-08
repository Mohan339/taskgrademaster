import mongoose from "mongoose";
const { Schema } = mongoose;

const gradeSchema = new mongoose.Schema(
  {
    gradeName: {
      type: String,
      required: true,
      unique: true,
    },
    gradeStatus: {
      type: Boolean,
      default: true,
    },
    studentsList: [
      {
        type: String,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);
