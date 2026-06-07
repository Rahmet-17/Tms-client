import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import { renderResponse, ApiResponse } from "./models/api-response.model";
import { Course } from "./models/course.model";
// ----------------------
const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant(),
};

console.log(student.gpa?.toFixed(2) ?? "Not yet graded");

// ----------------------
function processStudent(raw: unknown) {
  if (isStudent(raw)) {
    const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
    console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
  } else {
    console.error("Invalid student data received");
  }
}

processStudent({
  id: "S1",
  name: "Hana",
  enrollmentDate: Temporal.Now.instant(),
  gpa: 3.7,
});

processStudent(42);

// ----------------------
console.log(parseStudent({ id: "STU-001", name: "Hana" }));

try {
  parseStudent({ id: 42, name: "Test" });
} catch (error) {
  console.error("Parse failed:", (error as Error).message);
}


const quiz: AssessmentItem = {
id: "QUIZ-001",
kind: "quiz", title: "SQL Basics", correctAnswers: 8, totalQuestions: 10, };
const lab: AssessmentItem = {
id: "LAB-001", kind: "lab", title: "REST API Project", functionalityScore: 85, codeQualityScore: 90, };
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87
// Verify readonly try this line and check the compiler error:
const updatedQuiz = {
  ...quiz,
  id: "QUIZ-999"
};

import { describeCourse, CourseStatus } from "./models/course.model";

const webDev: CourseStatus = {
  status: "ACTIVE",
  enrolledCount: 28,
  startDate: Temporal.PlainDate.from("2026-09-01"),
};

console.log(describeCourse(webDev));


// ----------------------
// Student Response
// ----------------------
const studentRes: ApiResponse<Student> = {
  status: "success",
  data: {
    id: "STU-001",
    name: "Dawit Bekele",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.4,
  },
  fetchedAt: Temporal.Now.instant(),
};

console.log(
  renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`)
);

// ----------------------
// Course List Response
// ----------------------
const courseListRes: ApiResponse<Course[]> = {
  status: "success",
  data: [
    {
      id: "CRS-101",
      title: "Web Development Fundamentals",
      capacity: 30,
      startDate: Temporal.PlainDate.from("2026-09-01"),
    },
  ],
  fetchedAt: Temporal.Now.instant(),
};

console.log(
  renderResponse(courseListRes, (courses) =>
    courses.map((c) => c.title).join(", ")
  )
);

// ----------------------
// 1. Instant (UTC timestamp)
// ----------------------
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);

// ----------------------
// 2. Timezone conversion
// ----------------------
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

// ----------------------
// 3. PlainDate + duration
// ----------------------
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();

const daysUntilStart = today.until(courseStart).total({ unit: "days" });

console.log(`${Math.floor(daysUntilStart)} days until course starts`);

// ----------------------
// 4. Assignment deadline
// ----------------------
const deadline = Temporal.PlainDate.from("2026-12-15");

const remaining = today.until(deadline);

console.log(
  `${remaining.total({ unit: "days" })} days until assignment is due`
);