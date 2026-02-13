import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  try {
    let { name, section, classTeacher } = req.body;

    if (!name || !section || section.length === 0) {
      return res
        .status(400)
        .json({ message: "Name and Sections are required" });
    }

    const createdClasses = [];

    for (let sec of section) {
      const section = sec.trim().toUpperCase();

      let classExist = await Class.findOne({
        name: name.trim(),
        section,
      });

      if (classExist) continue;

      const newClass = await Class.create({
        name: name.trim(),
        section,
        classTeacher: classTeacher || null,
      });

      createdClasses.push(newClass);
    }

    if (createdClasses.length === 0) {
      return res.status(409).json({
        message: `Class ${name} with given sections already exists`,
      });
    }

    return res.status(201).json(createdClasses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Internal server error" });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("classTeacher", "userId")
      .sort({ name: 1, section: 1 });

    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
