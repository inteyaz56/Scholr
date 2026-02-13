import Notification from "../models/notification.model.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, type, link } = req.body;

    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      link,
    });

    return res.status(201).json(notification);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMyNotificaion = async (req, res) => {
  try {
    let userId = req.user._id;
    let notifications = await Notification.find({ userId });
    if (!notifications) {
      return res.status(500).json({ message: "No notifcation found" });
    }
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error Q" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    let { id } = req.params;
    await Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      { new: true },
    );
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false,
    });

    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany(
      { userId },
      { $set: { isRead: true } },
      { new: true },
    );

    return res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
