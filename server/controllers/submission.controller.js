import Submission from "../models/submission.model.js";
import Assignment from "../models/assignment.model.js";
import Student from "../models/student.model.js";

export const submitAssignment = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students allowed",
      });
    }

    const { assignmentId, fileUrl, remarks } = req.body;

    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    let status = "SUBMITTED";
    if (new Date() > assignment.dueDate) {
      status = "LATE";
    }

    const submission = await Submission.create({
      assignmentId,
      studentId: student._id,
      fileUrl,
      remarks,
      status,
    });

    res.status(201).json({
      message: "Submitted",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
export const gradeSubmission = async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers allowed",
      });
    }

    const { submissionId, marks, feedback } = req.body;

    const submission = await Submission.findById(submissionId).populate(
      "assignmentId",
    );

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    if (
      submission.assignmentId.teacherId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not your assignment",
      });
    }

    submission.marks = marks;
    submission.feedback = feedback;
    submission.status = "GRADED";

    await submission.save();

    return res.status(200).json({
      message: "Submission graded",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAssignmentResult = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT" || req.user.role === "PARENT") {
      return res.status(403).json({
        message: "Only students and parent allowed",
      });
    }

    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const submissions = await Submission.find({
      studentId: student._id,
    })
      .populate({
        path: "assignmentId",
        select: "title dueDate maxMarks subjectId",
        populate: {
          path: "subjectId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    if (submissions.length === 0) {
      return res.status(404).json({
        message: "No submissions found",
      });
    }

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getStudentAssignments = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students allowed",
      });
    }

    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const assignments = await Assignment.find({
      classId: student.classId,
      status: "ACTIVE",
    }).populate("subjectId", "name");

    const submissions = await Submission.find({
      studentId: student._id,
    });

    const submittedIds = submissions.map((s) => s.assignmentId.toString());

    const today = new Date();

    let pending = [];
    let completed = [];
    let late = [];

    assignments.forEach((a) => {
      const isSubmitted = submittedIds.includes(a._id.toString());

      if (isSubmitted) {
        completed.push(a);
      } else if (a.dueDate < today) {
        late.push(a);
      } else {
        pending.push(a);
      }
    });

    return res.status(200).json({
      total: assignments.length,
      pending,
      completed,
      late,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
