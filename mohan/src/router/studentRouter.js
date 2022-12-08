import {createStudent,updateStudent,getAllStudent,getOneStudent,deleteStudent} from "../controller/studentController.js"
import express  from "express"

const router=express.Router()


//grade create
router.post("/add/:gradeId",createStudent)

//getAll Grade
router.get("/",getAllStudent)

//GetOne Grade
router.get("/:id",getOneStudent)

//Update Grade
router.put("/:id",updateStudent)

//Delete
router.delete("/:id",deleteStudent)

export default router