import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/db.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import classRoutes from "./routes/class.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import studentRoutes from "./routes/student.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import classSubRoutes from "./routes/class.sub.routes.js";
import teacherAssignmentRoutes from "./routes/teacher.assignment.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import examRoutes from "./routes/exam.routes.js";
import examSubjectRoutes from "./routes/exam.subjects.routes.js";
import markRoutes from "./routes/mark.routes.js";
import resultRoutes from "./routes/result.routes.js";
import noticeRoutes from "./routes/notice.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import feesRoutes from "./routes/fees.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/class", classRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class/subject", classSubRoutes);
app.use("/api/teacher", teacherAssignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exam-subjects", examSubjectRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/timetable", timetableRoutes);


connectDB();

export default app;
