import { Temporal } from "@js-temporal/polyfill";

export interface Student {
  readonly id: string;
  name: string;
  enrollmentDate: Temporal.Instant;
  gpa?: number;
}

// ----------------------
// Type Guard
// ----------------------
export function isStudent(value: unknown): value is Student {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as any).id === "string" &&
    typeof (value as any).name === "string"
  );
}

// ----------------------
// Parse Function (throws errors)
// ----------------------
export function parseStudent(raw: unknown): Student {
  if (typeof raw !== "object" || raw === null) {
    throw new TypeError("Expected an object");
  }

  const obj = raw as any;

  if (typeof obj.id !== "string") {
    throw new TypeError(`Expected id to be string, got ${typeof obj.id}`);
  }

  if (typeof obj.name !== "string") {
    throw new TypeError(`Expected name to be string, got ${typeof obj.name}`);
  }

  return {
    id: obj.id,
    name: obj.name,
    enrollmentDate: Temporal.Now.instant(),
  };
}