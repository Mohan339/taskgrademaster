import {create,getAllGrade,getGradeSingle,updateGrade,gradeDelete} from "../controller/gradeController.js";
import express from "express"

const router=express.Router()

//grade create
router.post("/add",create)

//getAll Grade
router.get("/",getAllGrade)

//GetOne Grade
router.get("/:id",getGradeSingle)

//Update Grade
router.put("/:id",updateGrade)

//Delete
router.delete("/:id",gradeDelete)

export default router