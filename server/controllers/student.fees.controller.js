import Studentfee from "../models/student.fess.model.js";
import Feestructure from "../models/fee.structure.model.js";
import Student from "../models/student.model.js";
import Notification from "../models/notification.model.js";

export const assignFess = async (req, res) => {
  try {
    let { classId } = req.body;
    const structure = await Feestructure.findOne({ classId });
    const students = await Student.find({ classId });

    const records = students.map((stu) => ({
      studentId: stu._id,
      classId,
      totalFee: structure.totalFee,
      dueAmount: structure.totalFee,
    }));

    const notifications = students.map((stu) => ({
      userId: stu.userId,
      title: "Fees Assigned",
      message: `Your fees for this year assigned`,
      type: "FEES",
      link: "/student/fees",
    }));

    await Notification.insertMany(notifications);
    await Studentfee.insertMany(records);

    return res.status(200).json({ message: "Fess assigned " });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const payFess = async (req, res) => {
  try {
    const { studentId, amount, method } = req.body;

    const numAmount = Number(amount);

    const fee = await Studentfee.findOne({ studentId }).populate("studentId");

    if (!fee) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    fee.paidAmount += numAmount;
    fee.dueAmount = fee.totalFee - fee.paidAmount;

    if (fee.dueAmount <= 0) {
      fee.status = "PAID";
      fee.dueAmount = 0;
    } else {
      fee.status = "PARTIAL";
    }

    fee.payments.push({
      amount: numAmount,
      method,
      date: new Date(),
    });

    const notification = await Notification.create({
      userId: fee.studentId.userId,
      title: "Payment Successful",
      message: `₹${numAmount} received`,
      type: "FEES",
      link: "/student/fees",
    });

    global.io.emit("newNotification", notification);

    await fee.save();

    return res.status(200).json(fee);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getStudentFee = async (req, res) => {
  try {
    const { studentId } = req.body;

    const data = await Studentfee.findOne({ studentId }).populate(
      "studentId",
      "name",
    );
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const getFeeSummary = async (req, res) => {
  try {
    const summary = await Studentfee.aggregate([
      {
        $group: {
          _id: null,

          totalCollected: { $sum: "$paidAmount" },

          totalDue: { $sum: "$dueAmount" },

          partialCollected: {
            $sum: {
              $cond: [{ $eq: ["$status", "PARTIAL"] }, "$paidAmount", 0],
            },
          },
        },
      },
    ]);

    return res.status(200).json(summary[0] || {});
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
