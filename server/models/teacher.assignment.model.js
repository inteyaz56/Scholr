import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Class",
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
  },
  { timestamps: true },
);

teacherAssignmentSchema.index(
  { teacherId: 1, classId: 1, subjectId: 1 },
  { unique: true },
);
const TeacherAssignment = mongoose.model(
  "TeacherAssignment",
  teacherAssignmentSchema,
);
export default TeacherAssignment;
