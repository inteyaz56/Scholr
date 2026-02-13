import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import teacherSlice from "./teacherSlice";
import classSlice from "./classSlice";
import parentSlice from "./parentSlice";
import studentSlice from "./studentSlice";
import subjectSlice from "./subjectSlice";
import assignmentSlice from "./assignmentSlice";
import examSlice from "./examSlice";
import noticeSlice from "./noticeSlice";
import notificationSlice from "./notificationSlice";
import feesSlice from "./feesSlice";
import timetableSlice from "./timetableSlice";
import attendanceSlice from "./attendanceSlice";
import resultSlice from "./resultSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    teacher: teacherSlice,
    class: classSlice,
    parent: parentSlice,
    student: studentSlice,
    subject: subjectSlice,
    assignment: assignmentSlice,
    exam: examSlice,
    notice: noticeSlice,
    notification: notificationSlice,
    fees: feesSlice,
    timetable: timetableSlice,
    attendance: attendanceSlice,
    result: resultSlice,
  },
});
