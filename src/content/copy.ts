/**
 * Marketing and UI copy — centralized for future i18n (Hungarian, etc.)
 * Phase 1: English only. Do not scatter visible strings across components.
 */

export const brand = {
  name: "Elite Paddle Coaching",
  tagline: "Olympic and World Champion kayak coaching",
  positioning:
    "Olympic and World Champion kayak coaching through personalized training guidance, expert video technique analysis, and elite training camps in Gainesville, Georgia.",
};

export const cta = {
  startCoaching: "Start Coaching",
  requestEvaluation: "Request an Evaluation",
};

export const hero = {
  title: "Train with the experience of an Olympian and World Champion.",
  subtitle:
    "Elite Paddle Coaching helps motivated kayakers improve technique, training structure, and race preparation through Erika Medveczky’s world-class paddling experience.",
  locationLabel: "Gainesville, Georgia",
};

export const launch = {
  whoItsFor: {
    title: "Who this is for",
    audiences: [
      "Competitive junior kayakers",
      "Ambitious club athletes",
      "Masters paddlers",
      "Parents and coaches seeking expert technical feedback",
      "Athletes preparing for races or selection events",
    ],
  },
  howItWorks: {
    title: "How it works",
    steps: [
      {
        title: "Choose coaching or request an evaluation",
        description:
          "Start with Starter Guidance via secure checkout, or apply for Technique Review and Elite Coaching.",
      },
      {
        title: "Share your goals",
        description:
          "Tell us about your level, events, and training focus. Onboarding is personal at launch.",
      },
      {
        title: "Improve with expert feedback",
        description:
          "Receive Erika’s feedback, drills, and training direction — including video review when applicable.",
      },
    ],
    manualNote:
      "At launch, every athlete is onboarded personally by Erika and her team after payment or application review.",
  },
  programs: {
    title: "Coaching options",
    starter: {
      name: "Starter Guidance",
      description:
        "Training direction and basic structure — a strong first step for motivated athletes.",
      features: [
        "General training direction",
        "Structured starting point for online coaching",
        "Manual personal onboarding after payment",
      ],
      cta: "start",
    },
    technique: {
      name: "Technique Review",
      description:
        "Video-based technique feedback with technical priorities and drill recommendations.",
      features: [
        "Manual video technique review",
        "Technical priorities and corrections",
        "Drill recommendations and next focus",
      ],
      cta: "apply",
      priceNote: "Pricing and availability confirmed after application review.",
    },
    elite: {
      name: "Elite Coaching",
      description:
        "Deeper personal guidance, training plan direction, progress review, and camp priority consideration.",
      features: [
        "Individualized coaching direction",
        "Training plan guidance",
        "Progress review",
        "Limited availability",
      ],
      cta: "apply",
      priceNote: "Pricing and availability confirmed after application review.",
    },
  },
  videoSection: {
    title: "Expert video technique analysis",
    body:
      "Athletes can share paddling footage for manual review by Erika. Feedback may address catch, posture, rotation, leg drive, rhythm, boat stability, race preparation, drills, and next training focus. This is not automated AI scoring.",
    points: [
      "Catch and posture",
      "Rotation and leg drive",
      "Rhythm and boat stability",
      "Race preparation",
      "Priority drills and next focus",
    ],
  },
  campsPreview: {
    title: "Gainesville training camps",
    body:
      "Future small-group kayak training camps in Gainesville, Georgia — technical water sessions, coach consultation, video review, race preparation, and limited capacity.",
    cta: "Request an Evaluation",
  },
  aboutPreview: {
    title: "Coached by Olympic experience",
    body:
      "Hungarian Olympic sprint kayaker and elite coach Erika Medveczky brings world-class kayak knowledge to athletes in the U.S. and worldwide.",
    credentialNote:
      "Credentials below are loaded from the database and editable without code changes.",
  },
  testimonials: {
    title: "Athlete stories",
    placeholder: "Athlete stories coming soon.",
  },
  finalCta: {
    title: "Ready to improve your paddling with world-class eyes on your technique?",
  },
  checkoutNote: "Secure checkout link coming soon",
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
        "Starter Guidance may be purchased through a secure Stripe checkout link. Technique Review and Elite Coaching are reviewed manually before onboarding. Full automatic subscription access is planned for a later phase.",
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
    "TODO: Owners will write final About prose. Olympic sprint kayaker, elite coach, and sports leader — Erika Medveczky coaches from Gainesville, Georgia.",
  storyTitle: "Erika’s story",
  story:
    "TODO: Final biography and career narrative will be added here. Verified competition credentials are listed below from the coach_credentials table.",
  philosophyTitle: "Coaching philosophy",
  philosophy:
    "TODO: Final coaching philosophy will be added here. Technique focus areas include catch, rotation, leg drive, rhythm, and boat stability.",
  videoTitle: "Why video feedback works",
  videoBody:
    "Video allows precise observation of catch timing, posture, rotation, and boat stability. Erika reviews footage manually and provides structured feedback — not automated AI scoring.",
  gainesvilleTitle: "Gainesville, Georgia",
  gainesvilleBody:
    "Erika coaches from Gainesville, Georgia — a training base for on-water sessions, camps, and in-person technical work on the lake.",
  biographyPlaceholder:
    "TODO: Extended biography placeholder — owners will write final About prose.",
  focusAreasTitle: "What Erika looks for in technique",
  focusAreas: [
    "catch",
    "posture",
    "rotation",
    "leg drive",
    "rhythm",
    "boat stability",
    "race preparation",
  ],
  credentialNote:
    "Credentials are loaded from the database and editable without code changes.",
};

export const pricing = {
  title: "Programs",
  subtitle:
    "Choose the level of coaching that fits your goals. Starter may use secure Stripe checkout at launch; other programs are reviewed manually.",
  stripeNote:
    "Starter payments may be handled through secure Stripe checkout links during launch. Technique Review and Elite Coaching are reviewed manually before onboarding.",
  manualReviewNote: "Pricing and availability confirmed after application review.",
  campsNote: {
    title: "Training camps",
    items: [
      "Small-group kayak camps in Gainesville, Georgia",
      "Technical water sessions and coach consultation",
      "Video review and race preparation",
      "Limited capacity — dates announced soon",
    ],
  },
};

export const camps = {
  title: "Training camps",
  subtitle: "In-person sprint kayak camps in Gainesville, Georgia.",
  whyTitle: "Why train in person",
  whyBody:
    "On-water sessions with direct coach feedback accelerate technique changes that are hard to see from the dock alone.",
  includesTitle: "What camps include",
  includes: [
    "Technical water sessions",
    "Coach consultation",
    "Video review",
    "Race preparation focus",
    "Limited capacity",
  ],
  whoTitle: "Who should apply",
  whoBody:
    "Motivated club, junior, masters, and competitive athletes who want intensive technical work with an Olympic-level coach.",
  locationTitle: "Gainesville, Georgia",
  locationBody:
    "Training on the water in Gainesville, Georgia — Erika’s U.S. training base for camps and in-person coaching.",
  datesPlaceholder: "Upcoming camp dates will be announced.",
  registerInterest: "Request camp interest",
  comingSoon: "Camp registration is reviewed manually at launch.",
  empty: "Upcoming camp dates will be announced.",
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
    body:
      "DRAFT placeholder — Terms of Service will be provided and reviewed by qualified counsel before accepting live payments. Real legal copy must be supplied/reviewed by a human before taking live payments.",
  },
  privacy: {
    title: "Privacy Policy",
    body:
      "DRAFT placeholder — Privacy Policy will be provided and reviewed before launch. Coaching inquiries and application data are processed to respond to your request. Real legal copy must be supplied/reviewed by a human before taking live payments.",
  },
  refund: {
    title: "Refund Policy",
    body:
      "DRAFT placeholder — Refund terms for coaching programs and camps will be defined before live payments. Real legal copy must be supplied/reviewed by a human before taking live payments.",
  },
  medical: {
    title: "Medical Disclaimer",
    body:
      "This coaching platform does not provide medical advice, injury diagnosis, physical therapy, or emergency care. Athletes should consult a qualified healthcare professional for pain, injury, or medical concerns. Coaching inquiries are not medical consultations.",
  },
};

export const apply = {
  title: "Request an Evaluation",
  subtitle:
    "Tell us about your goals, level, and interests. Erika reviews every application personally.",
  minorNote:
    "For athletes under 18, a parent or guardian must be involved before coaching begins.",
  fields: {
    fullName: "Full name",
    email: "Email",
    location: "Country / location",
    athleteAge: "Athlete age",
    guardianEmail: "Guardian email (if under 18)",
    athleteLevel: "Athlete level",
    mainGoal: "Main goal",
    eventFocus: "Primary event or distance",
    hasVideo: "Do you already have paddling video available?",
    interests: "Interests",
    message: "Short message",
  },
  athleteLevels: [
    { value: "beginner", label: "Beginner" },
    { value: "club", label: "Club athlete" },
    { value: "competitive_junior", label: "Competitive junior" },
    { value: "national_level", label: "National-level" },
    { value: "masters", label: "Masters" },
    { value: "coach", label: "Coach" },
    { value: "parent", label: "Parent" },
  ],
  mainGoals: [
    { value: "technique_improvement", label: "Technique improvement" },
    { value: "race_preparation", label: "Race preparation" },
    { value: "training_plan", label: "Training plan" },
    { value: "video_review", label: "Video review" },
    { value: "gainesville_camp", label: "Gainesville camp" },
    { value: "other", label: "Other" },
  ],
  eventFocuses: [
    { value: "200m", label: "200m" },
    { value: "500m", label: "500m" },
    { value: "1000m", label: "1000m" },
    { value: "marathon", label: "Marathon" },
    { value: "recreational", label: "Recreational" },
    { value: "other", label: "Other" },
  ],
  hasVideoOptions: { yes: "Yes", no: "No" },
  interestOptions: [
    { value: "online_coaching", label: "Online coaching" },
    { value: "video_analysis", label: "Video analysis" },
    { value: "training_plan", label: "Training plan" },
    { value: "gainesville_camp", label: "Gainesville camp" },
    { value: "not_sure", label: "Not sure yet" },
  ],
  checkboxes: {
    medical:
      "I understand this is a coaching inquiry and not medical, injury, physical therapy, or emergency advice.",
    privacyPrefix: "I consent to Elite Paddle Coaching processing my information to respond to this inquiry. See our",
  },
  submit: "Submit application",
  submitting: "Submitting…",
};

export const thankYou = {
  title: "Thank you for your application",
  body: "We’ll review your goals and follow up personally.",
};

export const welcome = {
  title: "Thank you — next steps",
  body: "If your checkout completed successfully, Erika will personally follow up within 48 hours to begin onboarding.",
};

export const footer = {
  startCoaching: "Start Coaching",
  apply: "Apply / Request Evaluation",
  camps: "Camps",
  terms: "Terms",
  privacy: "Privacy",
  refund: "Refund Policy",
  medical: "Medical Disclaimer",
};

export const nav = {
  home: "Home",
  about: "About Erika",
  programs: "Programs",
  camps: "Camps",
  apply: "Apply",
  login: "Sign in",
  dashboard: "Dashboard",
};
