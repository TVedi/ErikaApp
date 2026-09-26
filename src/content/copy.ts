/**
 * Marketing and UI copy — centralized for future i18n (Hungarian, etc.)
 * Phase 1: English only. Do not scatter visible strings across components.
 */

export const brand = {
  name: "Elite Paddle Coaching",
  tagline: "Olympic and World Champion kayak coaching",
};

export const cta = {
  /** Primary coral CTA (header, hero, section CTAs). */
  startCoaching: "Apply Now",
  /** Starter Guidance card (Coaching Options + /pricing ProgramCard). */
  getStarted: "Get Started",
  requestEvaluation: "Request an Evaluation",
};

export const hero = {
  title: "Train with the experience of an Olympian and World Champion.",
  titleAccentWord: "experience",
  titleSweepPhrase: "Olympian and World Champion",
  subtitle:
    "Elite Paddle Coaching helps motivated kayakers improve technique, training structure, and race preparation through Erika Medveczky’s world-class paddling experience.",
  locationLabel: "Gainesville, Georgia",
  /** Mobile opening screen slogan. */
  mobileOpeningSlogan: "Your choice, your chance.",
  mobileOpeningImageAlt: "Erika Medveczky",
  mobileOpeningScrollLabel: "Scroll to explore",
};

/**
 * Olympic diploma lightbox assets — swap `imageSrc` when the real diploma arrives.
 * badgeSrc: transparent OLY medallion (derived from public/OLY ikon.png).
 */
export const olympicDiploma = {
  badgeSrc: "/OLY-badge-512.webp",
  /** Temporary placeholder; replace with the official diploma path later. */
  imageSrc: "/Medveczky100.webp",
  imageAlt: "Olympic diploma",
  openLabel: "View Olympic diploma",
  closeLabel: "Close diploma",
} as const;

export const launch = {
  whoItsFor: {
    title: "Where Experience Comes From",
    featuredAchievement: "Olympic 4th place (Tokyo 2020)",
    titleAchievements: [
      "8x World Champion",
      "6x European Champion",
      "21x Hungarian Champion",
    ],
    experienceAchievements: [
      "30+ years in elite sport",
      "20 years on the international stage",
      "6+ years in sport leadership",
    ],
  },
  howItWorks: {
    eyebrow: "WHO IT SERVES",
    title: "Who This Is For",
    intro:
      "Built for athletes, parents, coaches, and teams who want serious technical direction.",
    audiences: [
      "Competitive junior kayakers",
      "Ambitious club athletes",
      "Masters paddlers",
      "Parents and coaches seeking expert technical feedback",
      "Athletes preparing for races or selection events",
      "Individual and team preparation for international races and the Olympic Games",
    ],
  },
  programs: {
    eyebrow: "COACHED BY OLYMPIC EXPERIENCE",
    title: "Coaching Options",
    intro:
      "Personalized coaching built around the athlete, not a template. Choose the level of support that fits your goals.",
    proofStrip: {
      lead: "Proven excellence. Trusted by athletes worldwide.",
      items: [
        "8x World Champion",
        "6x European Champion",
        "21x Hungarian Champion",
        "30+ Years in Elite Sport",
      ],
    },
    starter: {
      number: "01",
      name: "Technique Review",
      description:
        "A focused technical analysis to identify what is holding you back and what to work on next.",
      features: [
        "Personal video technique analysis",
        "Clear technical priorities & corrections",
        "Individual drill recommendations",
      ],
      accentFeature: "One-time service · No monthly commitment",
      cta: "start" as const,
      ctaLabel: "Book a Technique Review",
      badge: "ONE-TIME · $225",
    },
    technique: {
      number: "02",
      name: "Performance Coaching",
      description:
        "Fully individualized coaching for athletes who want structure, technical development and ongoing feedback.",
      features: [
        "Personalized training plan & regular adjustments",
        "Weekly feedback + monthly technique review",
        "Direct messaging + monthly coaching call",
      ],
      accentFeature: "Limited to 8 athletes · 3-month minimum",
      cta: "apply" as const,
      ctaLabel: "Apply for Coaching",
      priceNote: "$425 / MONTH",
      badge: "MOST POPULAR",
    },
    elite: {
      number: "03",
      name: "High Performance Coaching",
      description:
        "High-touch coaching for competitive athletes who want closer support throughout training, racing and season development.",
      features: [
        "Full training & season planning with ongoing adjustments",
        "Priority feedback, technique analysis & biweekly calls",
        "Race preparation, tapering & competition support",
      ],
      accentFeature: "Limited to 4 athletes · Application only · 3-month minimum",
      cta: "apply" as const,
      ctaLabel: "Apply for High Performance",
      priceNote: "$695 / MONTH",
      badge: "LIMITED ACCESS",
    },
  },
  videoSection: {
    eyebrow: "VIDEO ANALYSIS",
    title: "Expert video technique analysis",
    body: "Athletes can share paddling footage for manual review by Erika. Feedback may address catch, posture, rotation, leg drive, rhythm, boat stability, race preparation, drills, and next training focus. This is not automated AI scoring.",
    points: [
      "Catch and posture",
      "Rotation and leg drive",
      "Rhythm and boat stability",
      "Race preparation",
      "Priority drills and next focus",
    ],
  },
  campsPreview: {
    eyebrow: "FUTURE CAMPS",
    title: "Gainesville Training Camps",
    comingSoon: "Coming Soon",
    body:
      "Immersive training experiences in a world-class setting. On-water sessions, expert coaching, and a community built for champions.",
    features: [
      {
        label: "ON-WATER TRAINING",
        text: "High-performance sessions in a championship setting.",
      },
      {
        label: "FUTURE EXPERIENCES",
        text: "New camps, advanced training, and unforgettable moments.",
      },
    ],
  },
  aboutPreview: {
    eyebrow: "COACHED BY OLYMPIC EXPERIENCE",
    title: "Coached by Olympic Experience",
    body:
      "Hungarian Olympic sprint kayaker and elite coach Erika Medveczky brings world-class kayak knowledge to athletes in the U.S. and worldwide.",
    proofChips: [
      { line1: "Olympic 4th Place", line2: "Tokyo 2020" },
      { line1: "8x World", line2: "Champion" },
      { line1: "21x Hungarian", line2: "Champion" },
      { line1: "20+ Years", line2: "International Experience" },
    ],
    cta: "Learn More About Erika",
    credentialNote:
      "Credentials below are loaded from the database and editable without code changes.",
  },
  testimonials: {
    title: "Athlete stories",
  },
  videoCourseLoading: "Video Course loading ...",
  videoCourse: {
    eyebrow: "VIDEO COURSE",
    headingLine1: "Video Course",
    headingLine2: "Coming Soon",
    body:
      "A focused video library is being prepared for athletes who want Erika's technical fundamentals, training perspective, and race-proven coaching insight in a structured format.",
    secondary: "Details will be announced later.",
    pill: "COMING SOON",
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
      name: "Technique Review",
      description:
        "A focused technical analysis to identify what is holding you back and what to work on next.",
      features: [
        "Personal video technique analysis",
        "Clear technical priorities & corrections",
        "Individual drill recommendations",
        "One-time service · No monthly commitment",
      ],
    },
    {
      name: "Performance Coaching",
      description:
        "Fully individualized coaching for athletes who want structure, technical development and ongoing feedback.",
      features: [
        "Personalized training plan & regular adjustments",
        "Weekly feedback + monthly technique review",
        "Direct messaging + monthly coaching call",
        "Limited to 8 athletes · 3-month minimum",
      ],
    },
    {
      name: "High Performance Coaching",
      description:
        "High-touch coaching for competitive athletes who want closer support throughout training, racing and season development.",
      features: [
        "Full training & season planning with ongoing adjustments",
        "Priority feedback, technique analysis & biweekly calls",
        "Race preparation, tapering & competition support",
        "Limited to 4 athletes · Application only · 3-month minimum",
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

export const aboutStory = {
  paragraphs: [
    "Today, I no longer define myself as a kayak racer, but as Erika Medveczky, someone who wants to use her own path, struggles and victories for the benefit of others. I believe I will never fully take off the competitive mentality, and I do not want to either, because it made me who I am today.",
    "When I was an eight-year-old little girl and saw a kayaking flyer on the school noticeboard, I could not have known that those few moments would define my entire life and lead me all the way to the Olympic Games. But that is exactly what happened. Today, 29 years later, I can say that I owe everything to those years: successes, failures, a lot of learning, travels, countless experiences, friends, mentors and important relationships.",
    "My sports career was not a linear progression. I would much rather compare it to a roller coaster. There were outstanding, loud successes, but just as many low points, and from each of them I was able to stand up again, always learning something and becoming a little stronger. At 18, for example, as a two-time junior European champion, I stopped kayaking for almost half a year. I had a conflict with my coach at the time, and I decided I would not continue. But I missed kayaking so much from my everyday life, the environment, the water, the whole world, that I went back.",
    "After that, there were two more very deep points when I was physically, mentally and, not least, financially exhausted, sitting at home with no idea where to go next. But somehow there was always a push, a hand, a spark that was still inside me and brought me back to the racecourse. During those times, I never looked at distant goals. I could not really even imagine distant goals. All I had in me was to get through the day in front of me. The small steps led me. And then, suddenly, I found myself back on the water and back on the racecourse.",
    "Two very important milestones stand out in my career, both coming after the low points I mentioned earlier. One of them was my first world championship title in 2013 in Duisburg. I finally arrived where I had always wanted to be, on the top of the world championship podium. It was a huge fight to get there, both on the racecourse and inside my own head.",
    "The other was in 2017, when I won the Hungarian selection race in K-1 500 m. That was a moment when the real question was whether I could continue racing or whether I would have to look for another profession. It was a difficult period from every point of view, and my husband and I both knew that it was a turning point. But I did not quit, even though many times it would have been easier. Eventually, I found myself in an environment where I received the support and inspiration I needed in order to surpass myself. Many times throughout my career, my instincts, life itself, and the few but important forms of support I received eventually took me where I needed to be.",
    "In numbers, during my senior career I became an Olympic 4th-place finisher, won 8 world championship gold medals and 3 world championship bronze medals, 6 European championship gold medals, 4 silver medals and 1 bronze medal, and I became a 21-time Hungarian champion. In addition to these, I collected countless finalist placements.",
    "But these are only the numbers and the medals, the tip of the iceberg. The 1 minute 30 seconds, or maximum 4 minutes. That is what everyone sees. But behind all of this is the real essence: how I got there. These results shaped me because I had already fought with myself on the road leading to them. If I had wanted to start there, it would not have worked. Behind all of this are the dark winter Monday mornings when you have to jump into the cold pool to swim, or go out to run, and row 30 kilometers in March with blistered hands.",
    "It is obvious that sport also shaped me as a person. I had always been a fighter, but in elite sport I became truly strong and defined in my character. There was a lot of struggle in this, many tears, weakness and disappointment, but throughout it all I was able to keep my sensitivity. And the long years, the work and the results helped me find my own voice. After a certain point, that voice no longer spoke only for me, but could also speak for others.",
    "That is how, while I was still an active athlete, I became a member of the board of the Hungarian Canoe Federation, the chair of the Athletes' Committee, and also the president of my home club, Kis-Duna SE. These positions gave me a completely different perspective on sport and on other areas of life as well. But everything I had fought through in sport, in everyday life, also became useful to me there. It gave a platform to my ability to stand up for causes or people whose voices did not reach the decision-making tables as strongly.",
    "Being the president of my home club was an especially defining experience. As a child, I had already watched the work of the president at the time, and even then I had the thought that one day I would like to give back in the same way. When I was asked in 2020 to become the president of the club, I threw myself into the work with full energy and enthusiasm.",
    "I learned a great deal, whether it was financial accounting, writing applications and grants, or employer responsibility. These were all things I had not dealt with before, but they also added a lot to my ability to transition more successfully from being an athlete into the more everyday world. I became even more grown-up, and I experienced what it is like to support the professional work of others and achieve success together. I was able to help athletes who were only just beginning to spread their wings, while we were also able to keep the personal, family-like environment that had always characterized the club.",
    "Since I have not been actively competing, and my own performance is no longer at the center of my everyday life, a certain kind of attention and energy has been freed up in me, the same kind that used to drive me forward every day. Now the time has come for me to pass on to others the knowledge, experience and life material that I have gathered over 29 years in the world of kayaking and elite sport.",
    "It has always been important to me to give back to the environment I received so much from. The sports community, the coaches, the leaders and the people around me shaped my entire life. Now I would like to become a similar mentor for those who need it.",
    "Today I live and work in Gainesville, in the state of Georgia in the United States, as a head coach with athletes between the ages of 13 and 17. My goal is to give them not only technical knowledge, but also mental foundations. I want them to become more conscious and to learn that there is no fast success. What is truly valuable has to be worked for over the long term. These are the foundations I also received from my first coach, and they are the ones I still build on today, as a person too. Alongside successful athletes, I also want to raise good people.",
    "I enjoy working with beginners because there is so much that can be taught to them. But I also see the challenge in working with professionals, with people who feel unsure about what the next step should be, in finding what is blocking them and what could help move them forward. I am also happy to help coaches, because I know the world of sport from several different sides, and I know what qualities make someone a truly good coach, the kind of coach I am also trying to become. Although I deeply believe that everyone has to find what is perfect for themselves.",
    "For me, this platform is not self-expression, but an opportunity. I believe that the experiences that shaped me can also give others something to hold on to. Yes, I do have fear around being visible, but I have always been more drawn to a challenge than held back by fear. Sometimes I like jumping into the deep end.",
    "This is one of those jumps.",
  ],
  pullQuoteLead: "And if I had to summarize what I believe in one sentence:",
  pullQuote: '"Your choice, your chance."',
  pullQuoteFollow:
    "This has followed me throughout my life. Our decisions shape us. And there is always a new chance, if we are ready to take the step.",
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
  metaTitle: "Training Camps | Elite Paddle Coaching",
  metaDescription:
    "Future small-group kayak training camps in Gainesville, Georgia with Olympic sprint kayaker and World Champion Erika Medveczky. Details coming soon.",
  eyebrow: "Future in-person training",
  headline: "Training Camps Are Coming",
  subheadline:
    "A future home for small-group kayak camps, technical water sessions, and elite coaching experiences in Gainesville, Georgia.",
  supportingCopy:
    "Dates, formats, and registration details will be announced later. For now, this page is a preview of the direction: focused, personal, high-quality training built around Erika’s Olympic and world championship experience.",
  statusLabel: "Camp registration is not open yet.",
  ctaLabel: "Details coming soon",
  imageAlt: "Kayaker paddling into the sunset on calm water",
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
  speaking: "Speaking",
  login: "Sign in",
  dashboard: "Dashboard",
};

export const speaking = {
  metaTitle: "Corporate Speaking | Erika Medveczky",
  metaDescription:
    "Corporate speaking and performance inspiration from Olympic sprint kayaker and World Champion Erika Medveczky. Coming soon.",
  eyebrow: "For companies, leadership teams, and events",
  headline: "World-Class Performance Speaking",
  subheadline:
    "Corporate inspiration from an Olympian and World Champion — built around resilience, leadership, preparation, and performing under pressure.",
  comingSoon: "Corporate speaking experiences are coming soon.",
  supportingCopy:
    "Erika Medveczky brings nearly three decades of elite sport, Olympic finals experience, world championship success, and sports leadership into powerful talks for teams, leaders, and organizations.",
  ctaLabel: "Booking details coming soon",
  imageAlt: "Erika Medveczky in a premium portrait for corporate speaking",
};

/**
 * Rebuilt application form, to Erika's specification.
 * Eleven sections; five fields appear conditionally. Not yet read by any
 * component - the live form still uses the `apply` block above.
 */
export const applyV2 = {
  requiredNote: "Fields marked with an asterisk (*) are required.",

  contact: {
    title: "Contact information",
    fields: {
      fullName: "Full name",
      email: "Email address",
      country: "Country",
      age: "Age",
      guardianName: "Parent / guardian name",
      guardianEmail: "Parent / guardian email",
    },
  },

  athleteLevel: {
    title: "Athlete level",
    question: "Which best describes your current level?",
    options: [
      { value: "elite_international", label: "Elite / International Level" },
      { value: "national", label: "National Level" },
      { value: "senior", label: "Senior Athlete" },
      { value: "u23", label: "U23 Athlete" },
      { value: "junior", label: "Junior Athlete" },
      { value: "masters", label: "Masters Athlete" },
      { value: "club", label: "Club-Level Athlete" },
    ],
  },

  coachingInterest: {
    title: "Coaching interest",
    question: "Which service are you interested in?",
    options: [
      { value: "technique_review", label: "Technique Review" },
      { value: "performance_coaching", label: "Performance Coaching" },
      { value: "high_performance_coaching", label: "High Performance Coaching" },
      { value: "gainesville_camp", label: "Gainesville Camp" },
    ],
  },

  eventDistance: {
    title: "Primary event / distance",
    question: "What is your primary event or distance?",
    options: [
      { value: "200m", label: "200 m" },
      { value: "500m", label: "500 m" },
      { value: "1000m", label: "1000 m" },
      { value: "multiple_sprint", label: "Multiple Sprint Distances" },
      { value: "long_distance", label: "Long Distance" },
      { value: "marathon", label: "Marathon" },
      { value: "recreational", label: "Recreational" },
      { value: "other", label: "Other" },
    ],
  },

  performance: {
    title: "Performance snapshot",
    fields: {
      best500m: "Best 500 m time",
      best2000m: "Best 2000 m time",
      timesContext: "When and where were these times achieved?",
      recentResult: "Current or most recent race result / competitive level",
    },
  },

  trainingBackground: {
    title: "Training background",
    fields: {
      yearsPaddling: "How many years have you been paddling?",
      sessionsPerWeek:
        "How many training sessions do you currently complete per week?",
      hoursPerWeek: "Approximately how many hours do you train per week?",
      structuredPlan: "Do you currently follow a structured training plan?",
      hasCoach: "Do you currently work with a coach?",
      additionalSupport:
        "What type of support are you looking for in addition to your current coaching?",
    },
  },

  trainingEnvironment: {
    title: "Training environment",
    fields: {
      waterAccess: "Do you have regular access to water for training?",
      gymAccess: "Do you have access to a gym?",
      usesDevice:
        "Do you use a GPS watch, heart-rate monitor or other training device to record your workouts?",
      devicePlatform: "Which device or platform do you currently use?",
      sharesData:
        "Are you able and willing to share your training data with me for coaching and progress tracking?",
      trainingCompany: "Do you train mostly:",
      hasVideo: "Do you currently have paddling video available?",
    },
    waterAccessOptions: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "seasonal", label: "Seasonal" },
    ],
    deviceOptions: [
      { value: "garmin", label: "Garmin" },
      { value: "polar", label: "Polar" },
      { value: "coros", label: "COROS" },
      { value: "suunto", label: "Suunto" },
      { value: "apple_watch", label: "Apple Watch" },
      { value: "wahoo", label: "Wahoo" },
      { value: "trainingpeaks", label: "TrainingPeaks" },
      { value: "strava", label: "Strava" },
      { value: "other", label: "Other" },
    ],
    companyOptions: [
      { value: "alone", label: "Alone" },
      { value: "group", label: "With a group" },
      { value: "both", label: "Both" },
    ],
  },

  goals: {
    title: "Your goals",
    fields: {
      improvementGoal:
        "What would you most like to improve over the next 6-12 months?",
      hasTargetRace:
        "Do you have a specific race or competition you are preparing for?",
      targetRace: "Event name and date",
    },
  },

  challenge: {
    title: "Your current challenge",
    fields: {
      currentChallenge:
        "What do you feel is currently holding your performance back the most, if anything?",
    },
  },

  commitment: {
    title: "Commitment & communication",
    fields: {
      committedSessions:
        "How many training sessions per week can you realistically commit to?",
      willingFeedback:
        "Are you willing to provide regular and honest training feedback so your program can be adjusted?",
    },
  },

  finalQuestions: {
    title: "Final questions",
    fields: {
      whyInterested: "Why are you interested in working with me?",
      anythingElse:
        "Is there anything else you think I should know about you or your training?",
    },
  },

  consents: {
    medical:
      "I understand this is a coaching inquiry and not medical, injury, physical therapy, or emergency advice.",
    privacy:
      "I consent to Elite Paddle Coaching processing my information to respond to this inquiry. See our Privacy Policy.",
  },

  noGuaranteeNotice:
    "Submitting an application does not guarantee a coaching place. Applications are reviewed individually to make sure the coaching relationship is the right fit for both athlete and coach.",

  yesNo: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],

  /**
   * Field names that must be filled. The form renders the asterisk from this
   * list and sets the required attribute from it, so the two cannot disagree.
   * The five conditional names are required only while their condition holds:
   * guardian_name and guardian_email under 18, additional_support when the
   * athlete has a coach, device_platform when a device is used, and
   * target_race when a race is named.
   */
  requiredFields: [
    "full_name",
    "email",
    "location",
    "athlete_age",
    "guardian_name",
    "guardian_email",
    "athlete_level",
    "service_interest",
    "event_focus",
    "best_500m",
    "best_2000m",
    "times_context",
    "recent_result",
    "years_paddling",
    "sessions_per_week",
    "hours_per_week",
    "structured_plan",
    "has_coach",
    "additional_support",
    "water_access",
    "gym_access",
    "uses_device",
    "device_platform",
    "shares_data",
    "improvement_goal",
    "has_target_race",
    "target_race",
    "current_challenge",
    "committed_sessions",
    "willing_feedback",
    "why_interested",
    "medical_disclaimer_accepted",
    "privacy_consent",
  ] as const,

  conditionalFields: {
    guardian_name: "athlete_age_under_18",
    guardian_email: "athlete_age_under_18",
    additional_support: "has_coach_yes",
    device_platform: "uses_device_yes",
    target_race: "has_target_race_yes",
  },

  optionalFields: [
    "training_company",
    "has_video",
    "message",
  ] as const,
} as const;

/**
 * Transactional email copy. Placeholders in braces are filled by
 * src/lib/email/notify.ts.
 */
export const emails = {
  applicant: {
    subject: "Your application has been received",
    greeting: "Hi {name},",
    body: [
      "Thank you for your application. It has arrived safely, and Erika reviews every application personally.",
      "She will be in touch to discuss whether the programme is the right fit, and what the next step would look like.",
      "If anything needs correcting, simply reply to this message.",
    ],
    signOff: "Erika Medveczky OLY",
    signOffTitle: "Olympian and World Champion",
  },
  coach: {
    subjectPrefix: "New application",
    intro: "A new coaching application has arrived.",
    replyHint: "Reply to this email to reach the applicant directly.",
  },
  waitlist: {
    subject: "You're on the list",
    body: [
      "Thank you for joining the waiting list.",
      "You will be among the first to hear when coaching places open, and when the video course becomes available.",
    ],
  },
} as const;
