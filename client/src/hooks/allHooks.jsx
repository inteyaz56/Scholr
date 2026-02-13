import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setMyChild, setParent } from "../redux/parentSlice";
import {
  setStudents,
  setStudentData,
  setResult,
  setClassStudent,
  setMyData,
} from "../redux/studentSlice";
import { setSubject, setClassSubject } from "../redux/subjectSlice";
import { setMyClasses } from "../redux/teacherSlice";
import {
  setAssignments,
  setClassAssignments,
  setTeacherAssignment,
} from "../redux/assignmentSlice";
import { setClassExam, setExam, setExamSubject } from "../redux/examSlice";
import { setMyClass } from "../redux/classSlice";
import { setMyNotices, setNotice } from "../redux/noticeSlice";
import { setNotification } from "../redux/notificationSlice";
import { setSummary } from "../redux/feesSlice";
import {
  setClassTimetable,
  setTeacherTimetable,
  setTimetables,
} from "../redux/timetableSlice";
import { setMyAttendance } from "../redux/attendanceSlice";
import { setMyResult } from "../redux/resultSlice";

export const getAllParents = async () => {
  const dispacth = useDispatch();
  useEffect(() => {
    const fetchParent = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/parent/get-parent`, {
          withCredentials: true,
        });
        dispacth(setParent(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchParent();
  }, []);
};

export const getAllStudents = (page = 1, limit = 10) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/students/get-students`,
          {
            params: { page, limit },
            withCredentials: true,
          },
        );
        dispatch(setStudents(result.data.students));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [dispatch, page, limit]);
};

export const getAllSubjects = async () => {
  let dispacth = useDispatch();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/subject/all/subject`, {
          withCredentials: true,
        });

        dispacth(setSubject(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubjects();
  }, []);
};

export const getAllAssignments = async () => {
  let dispacth = useDispatch();
  useEffect(() => {
    let fetchAssignments = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/teacher/teacher/assignment`,
          { withCredentials: true },
        );

        dispacth(setTeacherAssignment(result.data.assignments));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssignments();
  }, []);
};

export const getMyClasses = async () => {
  let dispacth = useDispatch();

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/teacher/teacher-assignment/my-classes`,
          { withCredentials: true },
        );
        dispacth(setMyClasses(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyClasses();
  }, []);
};

export const getAssignmentsByClass = (classId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!classId) {
      console.log("No class ID provided");
      return;
    }

    console.log("CLASS ID", classId);
    const fetchAssignments = async () => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/assignments/getByClass`,
          { classId },
          { withCredentials: true },
        );

        dispatch(setAssignments(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignments();
  }, []);
};

export const getCurrentStudentData = () => {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    if (!userData?._id) return;
    const fetchStudentData = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/students/get/student/${userData?._id}`,
          { withCredentials: true },
        );

        dispatch(setStudentData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentData();
  }, []);
};

export const getAllExams = () => {
  let dispacth = useDispatch();
  useEffect(() => {
    const fetchExams = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/exams/exams`, {
          withCredentials: true,
        });
        dispacth(setExam(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchExams();
  }, []);
};

export const getClassSubject = (classId) => {
  let dispacth = useDispatch();

  useEffect(() => {
    if (!classId) return;
    let fetchClassSubject = async () => {
      try {
        let result = await axios.post(
          `${serverUrl}/api/class/subject/get/subject`,
          { classId },
          { withCredentials: true },
        );
        dispacth(setClassSubject(result.data));
      } catch (error) {}
    };

    fetchClassSubject();
  }, [classId]);
};

export const getStudentResult = async (examId, studentId) => {
  let disptach = useDispatch();

  useEffect(() => {
    if (!examId || !studentId) return;

    const fetchResult = async () => {
      try {
        let result = await axios.post(`${serverUrl}/api/result/get-result`, {
          examId,
          studentId,
        });

        console.log(result.data);
        disptach(setResult(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult();
  }, [examId, studentId]);
};

export const getStudentById = async (studentId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/students/get/student`,
          { studentId },
          { withCredentials: true },
        );

        dispatch(setStudentData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
  }, [studentId, dispatch]);
};

export const getMyClass = async () => {
  let dispacth = useDispatch();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/class/get-class`, {
          withCredentials: true,
        });
        dispacth(setMyClass(result.data));
      } catch (error) {}
    };

    fetchClasses();
  }, []);
};

export const getClassExam = async (classId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!classId) return;

    const fetchClassExam = async () => {
      try {
        let result = await axios.post(
          `${serverUrl}/api/exams/class`,
          { classId },
          { withCredentials: true },
        );
        console.log(result.data);
        dispatch(setClassExam(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassExam();
  }, [classId]);
};

export const studentByClass = async (classId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!classId) return;

    const fetchStudent = async () => {
      try {
        let result = await axios.get(
          `${serverUrl}/api/students/get/student/by-class/${classId}`,
          { withCredentials: true },
        );
        dispatch(setClassStudent(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudent();
  }, [classId]);
};

export const getExamSubject = async (examId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!examId) return;

    const fetchExamSubject = async () => {
      try {
        let result = await axios.post(
          `${serverUrl}/api/exam-subjects/get-subjects`,
          { examId },
          { withCredentials: true },
        );
        console.log(result.data);
        dispatch(setExamSubject(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchExamSubject();
  }, [examId]);
};

export const getTeacherAssignment = async (teacherId, page, dispatch) => {
  try {
    const res = await axios.get(
      `${serverUrl}/api/assignments/get/by-teacher/${teacherId}?page=${page}&limit=8`,
      { withCredentials: true },
    );

    dispatch(setTeacherAssignment(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getMyNotices = async () => {
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchMyNotice = async () => {
      let result = await axios.get(`${serverUrl}/api/notice/my`, {
        withCredentials: true,
      });
      dispatch(setMyNotices(result.data));
    };
    fetchMyNotice();
  }, []);
};

export const getAllNotices = async () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetchNotices = async () => {
      let result = await axios.get(`${serverUrl}/api/notice/student`, {
        withCredentials: true,
      });
      dispatch(setNotice(result.data));
    };

    fetchNotices();
  }, []);
};

export const getAllNotification = async () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/notifications/my`, {
          withCredentials: true,
        });

        dispatch(setNotification(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotification();
  }, []);
};

export const getFeeSummary = async () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchSummary = async () => {
      let result = await axios.get(`${serverUrl}/api/fees/get/summary`, {
        withCredentials: true,
      });

      dispatch(setSummary(result.data));
    };

    fetchSummary();
  }, []);
};

export const getAllTimeTable = async () => {
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchTimetable = async () => {
      let result = await axios.get(
        `${serverUrl}/api/timetable/all/timetables`,
        { withCredentials: true },
      );
      dispatch(setTimetables(result.data));
    };

    fetchTimetable();
  }, []);
};

export const getClassTimeTable = async (classId) => {
  let disptach = useDispatch();

  useEffect(() => {
    const fetchTimetable = async () => {
      let result = await axios.get(
        `${serverUrl}/api/timetable/class/${classId}`,
        { withCredentials: true },
      );
      disptach(setClassTimetable(result.data));
    };

    fetchTimetable();
  }, [classId]);
};

export const getTeacherTimeTable = async (teacherId) => {
  let disptach = useDispatch();

  useEffect(() => {
    const fetchTimeTable = async () => {
      let result = await axios.get(
        `${serverUrl}/api/timetable/teacher/${teacherId}`,
        { withCredentials: true },
      );
      disptach(setTeacherTimetable(result.data));
    };

    fetchTimeTable();
  }, [teacherId]);
};

export const getMyChild = async () => {
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchMyChild = async () => {
      let result = await axios.get(`${serverUrl}/api/parent/get/child`, {
        withCredentials: true,
      });

      dispatch(setMyChild(result.data));
    };
    fetchMyChild();
  }, []);
};

export const getAttendanceOfStudent = async (studentId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!studentId) return;
    let fetchAttendance = async () => {
      let result = await axios.post(
        `${serverUrl}/api/attendance/student/attendance`,
        { studentId },
        { withCredentials: true },
      );
      dispatch(setMyAttendance(result.data));
    };

    fetchAttendance();
  }, [studentId]);
};

export const getClassAssignment = async (classId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!classId) return;
    const fetchAssignment = async () => {
      let result = await axios.post(
        `${serverUrl}/api/assignments/getByClass`,
        { classId },
        { withCredentials: true },
      );
      console.log(result.data);
      dispatch(setClassAssignments(result.data));
    };

    fetchAssignment();
  }, [classId]);
};

export const StudentById = async (studentId) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!studentId) return;
    let fetchStudent = async () => {
      let result = await axios.get(
        `${serverUrl}/api/students/byId/${studentId}`,
        {
          withCredentials: true,
        },
      );

      dispatch(setMyData(result.data));
    };

    fetchStudent();
  }, []);
};

export const getMyResult = async (studentId) => {
  let disptach = useDispatch();

  useEffect(() => {
    if (!studentId) return;

    const fetchMyResult = async () => {
      let result = await axios.post(
        `${serverUrl}/api/result/get-result`,
        { studentId },
        { withCredentials: true },
      );

      disptach(setMyResult(result.data));
    };
    fetchMyResult();
  }, [studentId]);
};
