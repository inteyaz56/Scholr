import mongoose from "mongoose";

const attendaceSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    date: {
      type: String, 
      required: true,
    },

    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["PRESENT", "ABSENT"],
          default: "PRESENT",
        },
      },
    ],
  },
  { timestamps: true },
);

const Attendance = mongoose.model("Attendance", attendaceSchema);

export default Attendance;
