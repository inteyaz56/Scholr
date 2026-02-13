import Mark from "../models/mark.model.js";

export const enterMarks = async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers allowed",
      });
    }

    const { examId, subjectId, studentId, marksObtained, status } = req.body;

    const marks = await Mark.findOneAndUpdate(
      { examId, subjectId, studentId },
      {
        marksObtained,
        status,
        enteredBy: req.user._id,
      },
      { upsert: true, new: true },
    );

    return res.status(200).json(marks);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMarksSheet = async (req, res) => {
  try {
    const { examId, subjectId } = req.body;

    const marks = await Mark.find({
      examId,
      subjectId,
    })
      .populate("studentId", "rollNumber")
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name",
        },
      });

    return res.status(200).json(marks);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getStudentMarks = async (req, res) => {
  try {
    let { studentId } = req.body;
    const marks = await Mark.find({
      studentId,
    }).populate("subjectId", "name");
    if (!marks) {
      return res.status(404).json({ message: "No marks found" });
    }
    return res.status(200).json(marks);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
