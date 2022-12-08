import mongoose from "mongoose";
import gradeModel from "../model/gradeModel.js";
import studentModel from "../model/studentModel.js";
// Post controller function
export const create = async (req, res, next) => {
  try {
    const newGrade = new gradeModel({ ...req.body });
    const savedGrade = await newGrade.save();
    console.log(savedGrade, "saved");
    res.status(200).json(savedGrade);
  } catch (err) {
    next(err);
  }
};

// Retrive and return a All grade
export const getAllGrade = async (req, res, next) => {
  console.log("triggered");

  try {
    const grades = await gradeModel.find(req.params.id);
    res.status(200).json(grades);
  } catch (err) {
    next(err);
  }
};

//  Retrive and return a single grade
export const getGradeSingle = async (req, res, next) => {
  try {
    const getOneGrade = await gradeModel.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    const studentDetails = await studentModel.find({
      id: { $in: getOneGrade?.studentsList },
    });

    const value = { ...getOneGrade?._doc, studentsDetails: studentDetails };
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

// Update a  idetified grade by id
export async function updateGrade(req, res, next) {
  try {
    const updatedGrade = await gradeModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedGrade, "update");

    res.status(200).json(updatedGrade);
  } catch (err) {
    next(err);
  }
}

// Soft Delete a grade with specified grade id in the request
export async function gradeDelete(req, res, next) {
  try {
    const updatedGrade = await gradeModel.findByIdAndUpdate(
      req.params.id,
      { $set: { gradeStatus: false } },
      { new: true }
    );

    res.status(200).json("Deleted SuccessFully");
  } catch (err) {
    next(err);
  }
}
