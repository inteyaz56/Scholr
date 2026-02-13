import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },

    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    occupation: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;
