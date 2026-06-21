/**
 * Marketing and UI copy — centralized for future i18n (Hungarian, etc.)
 * Phase 1: English only. Do not scatter visible strings across components.
 */

export const brand = {
  name: "Elite Paddle Coaching",
  tagline: "World-class kayak coaching from an Olympic athlete",
  positioning:
    "World-class kayak coaching from an Olympic athlete, World Champion, and European Champion. Personalized training plans, expert video feedback, progress tracking, and future training camps.",
};

export const hero = {
  title: "Train with Olympic-Level Precision",
  subtitle:
    "Personalized sprint kayak coaching from Erika Medveczky — Olympic athlete, World Champion, and elite performance coach.",
  ctaStart: "Start Coaching",
  ctaPlans: "View Plans",
  ctaWaitlist: "Join Waitlist",
};

export const valueProposition = {
  title: "Human expertise at the heart of your training",
  body:
    "Every program is built around Erika's direct coaching knowledge — not automated algorithms. You receive structured guidance for technique, race preparation, and long-term athlete development.",
};

export const howItWorks = {
  title: "How it works",
  steps: [
    {
      title: "Choose your coaching path",
      description:
        "Select a subscription tier that matches your goals — from structured training plans to elite video review.",
    },
    {
      title: "Train with a clear plan",
      description:
        "Follow assigned sessions focused on catch, rotation, leg drive, rhythm, and boat stability.",
    },
    {
      title: "Submit video for expert review",
      description:
        "Record your paddling and receive detailed, timecoded feedback from an Olympic-level coach.",
    },
    {
      title: "Track progress over time",
      description:
        "Log sessions, monitor metrics, and refine your approach with ongoing coach guidance.",
    },
  ],
};

export const plansOverview = {
  title: "Coaching plans",
  subtitle: "Choose the level of support that fits your training goals.",
  tiers: [
    {
      name: "Starter",
      description: "Foundation access for structured self-guided training.",
      features: [
        "General training plan library (coming soon)",
        "Athlete profile",
        "Manual progress logging (coming soon)",
      ],
    },
    {
      name: "Technique Review",
      description: "Add expert video feedback to your training.",
      features: [
        "Everything in Starter",
        "Monthly video technique submissions (coming soon)",
        "Structured coach feedback (coming soon)",
      ],
    },
    {
      name: "Elite Coaching",
      description: "Full personalized coaching for serious competitors.",
      features: [
        "Everything in Technique Review",
        "Personalized training plan assignment (coming soon)",
        "Priority review (coming soon)",
        "Monthly progress review (coming soon)",
      ],
    },
  ],
};

export const videoAnalysis = {
  title: "Expert video analysis",
  body:
    "Submit paddling footage and receive structured feedback on technique, corrections, priority drills, and next training focus. Every review is written by Erika — not generated automatically.",
};

export const trainingPlans = {
  title: "Structured training plans",
  body:
    "Progressive weekly plans built around sprint kayak fundamentals: technique sessions, distance work, race preparation, and long-term development blocks tailored to your level.",
};

export const trainingCamps = {
  title: "Training camps — Gainesville, Georgia",
  body:
    "Future in-person kayak training camps featuring technical sessions on the water, coach consultation, and limited-capacity group training. Registration and payments coming in a later phase.",
};

export const faq = {
  title: "Frequently asked questions",
  items: [
    {
      question: "Who is this platform for?",
      answer:
        "Sprint kayak athletes at all levels who want structured coaching from an Olympic-level expert — from developing paddlers to competitive racers.",
    },
    {
      question: "Is coaching automated or AI-generated?",
      answer:
        "No. All coaching feedback comes from Erika's direct expertise. AI may be added later only as a helper for summaries or formatting — never as a replacement for human coaching.",
    },
    {
      question: "Can minors sign up?",
      answer:
        "Athletes under 18 may register with a guardian email and verified parental consent. Access to the dashboard requires guardian approval.",
    },
    {
      question: "Are payments available now?",
      answer:
        "Payments and Stripe integration are not available in Phase 1. You can join the waitlist or create an account to explore the platform foundation.",
    },
    {
      question: "Where are training camps held?",
      answer:
        "In-person camps are planned in Gainesville, Georgia. See the Camps page for upcoming dates and details.",
    },
  ],
};

export const waitlist = {
  title: "Join the waitlist",
  subtitle: "Be the first to know when full coaching features launch.",
  placeholder: "Your email address",
  button: "Join Waitlist",
  success: "You're on the list. We'll be in touch soon.",
  error: "Something went wrong. Please try again.",
  duplicate: "This email is already on the waitlist.",
};

export const about = {
  title: "About Erika Medveczky",
  intro:
    "Erika Medveczky brings Olympic sprint kayaking experience and world-class coaching to athletes who want to paddle with precision, power, and purpose.",
  biographyPlaceholder:
    "Professional biography placeholder — Erika's full career story, competition highlights, and coaching journey will be added here. This section is designed to be updated without code changes as verified content is finalized.",
  philosophyTitle: "Coaching philosophy",
  philosophy:
    "Great paddling is built on fundamentals executed consistently. Erika focuses on clear technical priorities — catch, rotation, leg drive, rhythm, and boat stability — combined with race-ready preparation and sustainable long-term development. Coaching is direct, structured, and athlete-centered.",
  focusAreasTitle: "Focus areas",
  focusAreas: [
    "technique",
    "catch",
    "rotation",
    "leg drive",
    "rhythm",
    "boat stability",
    "race preparation",
    "long-term athlete development",
  ],
};

export const pricing = {
  title: "Pricing",
  subtitle: "Information only — payments coming in a future phase.",
  campsNote: {
    title: "Training camps",
    items: [
      "Future in-person kayak training camps in Gainesville, Georgia",
      "Technical sessions",
      "Coach consultation",
      "Limited capacity",
      "Registration coming later",
    ],
  },
};

export const camps = {
  title: "Training camps",
  subtitle: "In-person sprint kayak camps in Gainesville, Georgia.",
  registerInterest: "Register interest",
  comingSoon: "Registration coming in a future phase. Sign in or create an account to express interest.",
  empty: "No camps scheduled yet. Check back soon.",
};

export const auth = {
  loginTitle: "Sign in",
  signupTitle: "Create your athlete account",
  email: "Email",
  password: "Password",
  fullName: "Full name",
  dateOfBirth: "Date of birth",
  guardianEmail: "Guardian email",
  guardianEmailHint: "Required for athletes under 18.",
  parentalConsent: "I confirm that a parent or guardian has given consent for this athlete to use the platform.",
  loginButton: "Sign in",
  signupButton: "Create account",
  noAccount: "Don't have an account?",
  hasAccount: "Already have an account?",
  signupLink: "Sign up",
  loginLink: "Sign in",
  safetyDisclaimer:
    "This platform is for sport coaching and performance education. It does not provide medical advice, injury diagnosis, physical therapy, or emergency care.",
};

export const dashboard = {
  welcome: "Welcome back",
  currentTier: "Current plan",
  profileStatus: "Profile status",
  minorConsentRequired: "Guardian consent required",
  minorConsentBody:
    "Athletes under 18 need verified parental consent before accessing coaching features. A guardian email was required at signup — please ensure consent has been recorded.",
  cards: {
    trainingPlan: {
      title: "Your Training Plan",
      description: "Assigned sessions and weekly focus — coming soon.",
    },
    submitVideo: {
      title: "Submit a Video",
      description: "Upload paddling footage for coach review — coming soon.",
    },
    latestFeedback: {
      title: "Latest Feedback",
      description: "Timecoded coach comments on your submissions — coming soon.",
    },
    progressTracking: {
      title: "Progress Tracking",
      description: "Log sessions and track metrics over time — coming soon.",
    },
    trainingCamps: {
      title: "Training Camps",
      description: "View upcoming in-person camps in Gainesville, Georgia.",
    },
  },
  comingSoon: "Coming soon",
  active: "Active",
  minor: "Minor athlete",
  adult: "Adult athlete",
  consentGiven: "Parental consent verified",
  consentMissing: "Parental consent pending",
};

export const legal = {
  terms: {
    title: "Terms of Service",
    body: "Terms of Service placeholder. Full legal terms will be added before public launch.",
  },
  privacy: {
    title: "Privacy Policy",
    body: "Privacy Policy placeholder. Full privacy terms will be added before public launch.",
  },
  refund: {
    title: "Refund Policy",
    body: "Refund Policy placeholder. Full refund terms will be added before public launch.",
  },
  medical: {
    title: "Medical Disclaimer",
    body:
      "This coaching platform does not provide medical advice, injury diagnosis, physical therapy, or emergency care. Athletes should consult a qualified healthcare professional for pain, injury, or medical concerns.",
  },
};

export const footer = {
  terms: "Terms",
  privacy: "Privacy",
  refund: "Refund Policy",
  medical: "Medical Disclaimer",
};

export const nav = {
  about: "About",
  pricing: "Pricing",
  camps: "Camps",
  login: "Sign in",
  signup: "Sign up",
  dashboard: "Dashboard",
};
