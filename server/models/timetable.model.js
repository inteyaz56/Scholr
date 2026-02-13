import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
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

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    day: {
      type: String,
      enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      required: true,
    },

    startTime: String, 
    endTime: String, 
  },
  { timestamps: true },
);

const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;
