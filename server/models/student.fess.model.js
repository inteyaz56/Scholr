import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },

    totalFee: Number,

    paidAmount: {
      type: Number,
      default: 0,
    },

    dueAmount: Number,

    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID",
    },

    payments: [
      {
        amount: Number,
        date: Date,
        method: String,
      },
    ],
  },
  { timestamps: true },
);

const Studentfee = mongoose.model("Studentfee", studentFeeSchema);
export default Studentfee;
