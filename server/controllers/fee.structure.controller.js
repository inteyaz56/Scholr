import Feestructure from "../models/fee.structure.model.js";

export const createFeeStructure = async (req, res) => {
  try {
    const {
      classId,
      tuitionFee,
      examFee,
      transportFee,
      otherFee,
      academicYear,
    } = req.body;

    const totalFee = tuitionFee + examFee + transportFee + otherFee;

    const fee = await Feestructure.create({
      classId,
      tuitionFee,
      examFee,
      otherFee,
      transportFee,
      totalFee,
      academicYear,
    });

    return res.status(201).json(fee);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
