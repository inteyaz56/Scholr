import Subject from "../models/subject.model.js";

export const createSubject = async (req, res) => {
  try {
    let { name, code } = req.body;

    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Subject name is required" });
    }

    name = name.trim();
    code = code?.trim() || "";

    const isSubjectExist = await Subject.findOne({
      $or: [{ name }, ...(code ? [{ code }] : [])],
    });

    if (isSubjectExist) {
      return res.status(409).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({
      name,
      code,
    });

    return res.status(201).json(subject);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subject = await Subject.find({}).sort({ createdAt: -1 });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSubjectBySearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Enter name or subject code" });
    }

    const q = query.trim();

    const subjects = await Subject.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { code: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subject found" });
    }

    return res.status(200).json(subjects);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
