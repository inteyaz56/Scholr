import ExamSubject from "../models/exam.subject.model.js";
import Exam from "../models/exam.model.js";
import Subject from "../models/subject.model.js";
import ClassSubject from "../models/class.sub.model.js";

export const addSubjectToExam = async (req, res) => {
  try {
    let { examId, subjectId, maxMarks, passingMarks, examDate } = req.body;

    if (!examId || !subjectId || !maxMarks || !passingMarks || !examDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let isExamExists = await Exam.findById(examId);
    if (!isExamExists) {
      return res.status(404).json({ message: "Exam not found" });
    }
    let subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) {
      return res.status(404).json({ message: "Subject not found" });
    }

    let classSubjectExists = await ClassSubject.findOne({
      classId: isExamExists.classId,
      subjectId: subjectId,
    });

    if (!classSubjectExists) {
      return res.status(400).json({
        message: "Subject is not assigned to the class for this exam",
      });
    }

    const existingExamSubject = await ExamSubject.findOne({
      examId,
      subjectId,
    });
    if (existingExamSubject) {
      return res
        .status(400)
        .json({ message: "Subject already added to this exam" });
    }

    const examSubject = await ExamSubject.create({
      examId,
      subjectId,
      maxMarks,
      passingMarks,
      examDate,
    });

    return res.status(201).json(examSubject);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getSubjectsByExam = async (req, res) => {
  try {
    let { examId } = req.body;
    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }
    let examSubjects = await ExamSubject.find({ examId })
      .populate("subjectId", "name code")
      .populate("examId", "name");

    return res.status(200).json(examSubjects);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
