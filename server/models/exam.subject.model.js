import mongoose from "mongoose";

const examSubjectSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
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

    examDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

examSubjectSchema.index({ examId: 1, subjectId: 1 }, { unique: true });
const ExamSubject = mongoose.model("ExamSubject", examSubjectSchema);
export default ExamSubject;
