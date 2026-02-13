import Notice from "../models/notice.model.js";
import Class from "../models/class.model.js";

export const createNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      targetType,
      classId,
      expiryDate,
      attachment,
    } = req.body;

    const notice = await Notice.create({
      title,
      description,
      targetType,
      classId: targetType === "CLASS" ? classId : null,
      expiryDate,
      attachment,
      createdBy: req.user._id,
      role: req.user.role,
    });

    return res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNoticesForStudent = async (req, res) => {
  try {
    const student = req.user;

    const notices = await Notice.find({
      $or: [
        { targetType: "ALL" },
        { targetType: "CLASS", classId: student.classId },
      ],
      $or: [{ expiryDate: null }, { expiryDate: { $gte: new Date() } }],
    })
      .populate("classId", "name")
      .sort({ createdAt: -1 });
    if (!notices) {
      return res.status(404).json({ message: "No notice found" });
    }
    return res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyNotices = async (req, res) => {
  try {
    const notices = await Notice.find({
      createdBy: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("classId");

    return res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const noticeById = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "Id is required" });
    }

    let notice = await Notice.findById(id).populate("createdBy");
    if (!notice) {
      return res.status(404).json({ message: "No notice found" });
    }
    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
