import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    tuitionFee: Number,
    examFee: Number,
    transportFee: Number,
    otherFee: Number,

    totalFee: Number,

    academicYear: String,
  },
  { timestamps: true },
);

const Feestructure = mongoose.model("Feestructure", feeStructureSchema);
export default Feestructure;
