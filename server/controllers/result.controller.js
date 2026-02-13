import Result from "../models/result.model.js";
import Exam from "../models/exam.model.js";
import Student from "../models/student.model.js";
import Mark from "../models/mark.model.js";
import ExamSubject from "../models/exam.subject.model.js";

export const generateResult = async (req, res) => {
  try {
    const { studentId, examId, subjects } = req.body;

    const examSubjects = await ExamSubject.find({ examId });

    const finalSubjects = [];
    let totalMax = 0;
    let totalObtained = 0;
    let fail = false;

    for (let sub of subjects) {
      const examSub = examSubjects.find(
        (es) => es.subjectId.toString() === sub.subjectId,
      );

      if (!examSub) continue;

      totalMax += examSub.maxMarks;
      totalObtained += Number(sub.obtainedMarks);

      if (sub.obtainedMarks < examSub.passingMarks) {
        fail = true;
      }

      finalSubjects.push({
        subjectId: sub.subjectId,
        obtainedMarks: sub.obtainedMarks,
        maxMarks: examSub.maxMarks,
        passingMarks: examSub.passingMarks,
      });
    }

    const percentage = (totalObtained / totalMax) * 100;

    const result = await Result.create({
      studentId,
      examId,
      subjects: finalSubjects,
      totalMarks: totalMax,
      obtainedMarks: totalObtained,
      percentage,
      status: fail ? "FAIL" : "PASS",
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentResult = async (req, res) => {
  try {
    const { studentId } = req.body;

    const results = await Result.find({ studentId })

      .populate("examId", "name startDate endDate")
      .populate({
        path: "studentId",
        populate: [
          {
            path: "userId",
            select: "name email",
          },
          {
            path: "parentId",
            populate: {
              path: "userId",
              select: "name email ",
            },
          },
          {
            path: "classId",
            select: "name section",
          },
        ],
      })

      .populate({
        path: "subjects.subjectId",
        select: "name code",
      })

      .lean();

    if (!results.length) {
      return res.status(404).json({
        message: "No results found",
      });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createBulkResults = async (req, res) => {
  try {
    const { examId, results } = req.body;

    const examSubjects = await ExamSubject.find({ examId });

    const savedResults = [];

    for (let r of results) {
      let totalMax = 0;
      let totalObtained = 0;
      let fail = false;
      let subjects = [];

      for (let s of r.subjects) {
        const es = examSubjects.find(
          (e) => e.subjectId.toString() === s.subjectId,
        );

        if (!es) continue;

        totalMax += es.maxMarks;
        totalObtained += Number(s.obtainedMarks);

        if (s.obtainedMarks < es.passingMarks) {
          fail = true;
        }

        subjects.push({
          subjectId: s.subjectId,
          obtainedMarks: s.obtainedMarks,
          maxMarks: es.maxMarks,
          passingMarks: es.passingMarks,
        });
      }

      const percentage = (totalObtained / totalMax) * 100;

      const result = await Result.findOneAndUpdate(
        { studentId: r.studentId, examId },
        {
          studentId: r.studentId,
          examId,
          subjects,
          totalMarks: totalMax,
          obtainedMarks: totalObtained,
          percentage,
          status: fail ? "FAIL" : "PASS",
        },
        { upsert: true, new: true },
      );

      savedResults.push(result);
    }

    res.json({
      message: "Results saved successfully",
      data: savedResults,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
