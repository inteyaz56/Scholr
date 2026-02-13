import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    admissionNumber: {
      type: String,
      unique: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    rollNumber: {
      type: Number,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Parent",
    },

    dob: {
      type: Date,
    },

    address: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
