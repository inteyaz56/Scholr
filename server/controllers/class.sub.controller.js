import ClassSubject from "../models/class.sub.model.js";
import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";

export const createClassSubject = async (req, res) => {
  try {
    let { classId, subjectId } = req.body;
    if (req.user?.role !== "ADMIN") {
      return res.status(400).json("Access denied");
    }

    if (!classId || !subjectId) {
      return res
        .status(401)
        .json({ message: "Subject name and class required" });
    }

    let isClassExist = await Class.findById(classId);
    if (!isClassExist) {
      return res.status(405).json({ message: "Enter valid class" });
    }

    let isSubjectExist = await Subject.findById(subjectId);

    if (!isSubjectExist) {
      return res.status(405).json({ message: "Enter valid subject" });
    }
    const alreadyAssigned = await ClassSubject.findOne({ classId, subjectId });
    if (alreadyAssigned) {
      return res
        .status(409)
        .json({ message: "Subject already assigned to this class" });
    }

    const subject = await ClassSubject.create({
      classId,
      subjectId,
    });
    return res.status(201).json(subject);
  } catch (error) {
    return res.status(500).json({ message: "Internal Serever Error" });
  }
};

export const getClassSubject = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    const isClassExist = await Class.findById(classId);
    if (!isClassExist) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subject = await ClassSubject.find({ classId })
      .populate("subjectId", "name code")
      .populate("teacherId", "name email");

    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
