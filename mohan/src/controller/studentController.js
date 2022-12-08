import studentModel from "../model/studentModel.js";
import gradeModel from "../model/gradeModel.js";

export const createStudent = async (req, res, next) => {
  const gradeId = req.params.gradeId;
  try {
    const savedStudent = await studentModel.create({
      ...req.body,
      gradeID: gradeId,
    });
    try {
      await gradeModel.findByIdAndUpdate(gradeId, {
        $push: { studentsList: savedStudent._id },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
    res.status(200).json(savedStudent);
  } catch (err) {
    next(err);
  }
};

//update
export const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedStudent, "update");
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
};

//all students
export const getAllStudent = async (req, res, next) => {
  try {
    console.log("object triggered");
    const studentsList = await studentModel.find(req.params.id);
    // console.log("update")
    res.status(200).json(studentsList);
  } catch (err) {
    res.status(404).json({ message: "No Data Found" });
    next(err);
  }
};

//getone
export const getOneStudent = async (req, res, next) => {
  try {
    const getstudent = await studentModel.findById(req.params.id);
    const gradetails = await gradeModel.findOne({
      id: { $in: getstudent?.gradeID },
    });

    const studentDetails = { ...getstudent?._doc, gradeDetails: gradetails };
    res.status(200).json(studentDetails);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteStudent = async (req, res, next) => {
  const gradeId = req.params.gradeId;

  try {
    await studentModel.findByIdAndDelete(req.params.id);
    try {
      await gradeModel.findByIdAndUpdate(gradeId, {
        $pull: { studentsList: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Deleted SuccessFully");
  } catch (err) {
    res.status(404).send("Data Not Found");
    next(err);
  }
};

// export const getCoursegradeId = async (req, res, next) => {
//   console.log("getCoursegradeId triger");
//   const instID = req.params.instID;
//   try {
//     const getCoursegradeId = await studentModel.find({ instID });

//     res.status(200).json(getCoursegradeId);
//   } catch (err) {
//     next(err);
//   }
// };
