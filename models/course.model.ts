import { Temporal } from "@js-temporal/polyfill";

// ----------------------
// Base Course Entity
// ----------------------
export interface Course {
  readonly id: string;
  title: string;
  capacity: number;
  startDate?: Temporal.PlainDate;
}

// ----------------------
// Course Status Union
// ----------------------
export type CourseStatus =
  | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
  | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
  | { status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate }
  | { status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number }
  | { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };

// ----------------------
// Exhaustive Describer
// ----------------------
export function describeCourse(course: CourseStatus): string {
  switch (course.status) {
    case "DRAFT":
      return `Draft course created by ${course.createdBy} at ${course.createdAt}`;

    case "PUBLISHED":
      return `Published course with syllabus: ${course.syllabus} (published at ${course.publishedAt})`;

    case "ACTIVE":
      return `Active course with ${course.enrolledCount} students starting on ${course.startDate}`;

    case "ARCHIVED":
      return `Archived course with final enrollment of ${course.finalEnrollmentCount} (archived at ${course.archivedAt})`;

    case "CANCELLED":
      return `Cancelled course because: ${course.reason} (cancelled at ${course.cancelledAt})`;

    default:
      // Exhaustiveness check (VERY IMPORTANT)
      const _exhaustiveCheck: never = course;
      return _exhaustiveCheck;
  }
}

