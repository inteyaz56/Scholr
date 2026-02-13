import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },


    subjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        obtainedMarks: {
          type: Number,
          required: true,
        },

        maxMarks: {
          type: Number,
          required: true,
        },

        passingMarks: {
          type: Number,
          required: true,
        },
      },
    ],


    totalMarks: Number,
    obtainedMarks: Number,
    percentage: Number,
    grade: String,

    status: {
      type: String,
      enum: ["PASS", "FAIL"],
    },
  },
  { timestamps: true },
);


resultSchema.index({ studentId: 1, examId: 1 }, { unique: true });

const Result = mongoose.model("Result", resultSchema);
export default Result;
