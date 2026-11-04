import { afterEach, describe, expect, it } from "vitest";
import {
  areApplicationsOpen,
  isCampListOpen,
  isCourseListOpen,
  isWaitlistOpen,
  openWaitlistInterests,
} from "@/lib/enrollment";

const original = {
  waitlist: process.env.WAITLIST_OPEN,
  applications: process.env.APPLICATIONS_OPEN,
  course: process.env.COURSE_LIST_OPEN,
  camp: process.env.CAMP_LIST_OPEN,
};

function setEnv(
  name: "WAITLIST_OPEN" | "APPLICATIONS_OPEN" | "COURSE_LIST_OPEN" | "CAMP_LIST_OPEN",
  value?: string
) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

afterEach(() => {
  setEnv("WAITLIST_OPEN", original.waitlist);
  setEnv("APPLICATIONS_OPEN", original.applications);
  setEnv("COURSE_LIST_OPEN", original.course);
  setEnv("CAMP_LIST_OPEN", original.camp);
});

describe("enrollment switches", () => {
  it("keeps both open when nothing is set", () => {
    setEnv("WAITLIST_OPEN");
    setEnv("APPLICATIONS_OPEN");
    expect(isWaitlistOpen()).toBe(true);
    expect(areApplicationsOpen()).toBe(true);
  });

  it("closes only on the value false, ignoring case and spaces", () => {
    setEnv("WAITLIST_OPEN", " FALSE ");
    expect(isWaitlistOpen()).toBe(false);
    setEnv("WAITLIST_OPEN", "true");
    expect(isWaitlistOpen()).toBe(true);
    setEnv("WAITLIST_OPEN", "no");
    expect(isWaitlistOpen()).toBe(true);
  });

  it("switches the waitlist and applications independently", () => {
    setEnv("WAITLIST_OPEN", "true");
    setEnv("APPLICATIONS_OPEN", "false");
    expect(isWaitlistOpen()).toBe(true);
    expect(areApplicationsOpen()).toBe(false);
  });

  it("keeps the course and camp lists open when nothing is set", () => {
    setEnv("COURSE_LIST_OPEN");
    setEnv("CAMP_LIST_OPEN");
    expect(isCourseListOpen()).toBe(true);
    expect(isCampListOpen()).toBe(true);
  });

  it("closes each list on its own switch", () => {
    setEnv("WAITLIST_OPEN", "false");
    setEnv("COURSE_LIST_OPEN", "true");
    setEnv("CAMP_LIST_OPEN", "FALSE");
    expect(openWaitlistInterests()).toEqual({
      coaching: false,
      video_course: true,
      camp: false,
    });
  });
});
