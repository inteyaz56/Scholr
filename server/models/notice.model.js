import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "TEACHER"],
    },

    targetType: {
      type: String,
      enum: ["ALL", "CLASS"],
      default: "ALL",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },

    attachment: {
      type: String,
      default: "",
    },

    expiryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
