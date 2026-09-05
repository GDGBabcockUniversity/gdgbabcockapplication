export type TeamId = "media" | "marketing" | "events"

export type Role = {
  slug: string
  title: string
  team: TeamId
  mandate: string
  purpose: string
  responsibilities: string[]
  requirements: string[]
  panelLooksFor: string[]
  color: string
  /** Overrides the team's form for this one role. Omit to use the team form. */
  formUrl?: string
}

export type Team = {
  id: TeamId
  name: string
  blurb: string
  color: string
  /** Paste the Google Form link here. Empty string = "Form coming soon". */
  formUrl: string
}

export const TEAMS: Team[] = [
  {
    id: "media",
    name: "Media Team",
    blurb: "For creatives, photographers, videographers & storytellers.",
    color: "#F9AB00",
    formUrl: "",
  },
  {
    id: "marketing",
    name: "Marketing Team",
    blurb: "For marketers, strategists, communicators & people who know how to get people talking.",
    color: "#34A853",
    formUrl: "",
  },
  {
    id: "events",
    name: "Events & Planning",
    blurb: "For planners, organizers & creatives who love bringing ideas to life.",
    color: "#4285F4",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfasJPiGykFs0yfuQ1BPtDqaDE_TC3EpE1Fy06OKP1Z_JyLnw/viewform",
  },
]

const WRITING_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSc3FacZcMQ7AXQ3Nmo6NfzJQlf5XryXNJJJWNlI19echSGSiw/viewform"
const MEDIA_PRODUCTION_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfluJ0ObE1CEoxCYD3bY0T7GYQ7-eyEzjS4idCn4eXcERZ-BA/viewform"
const MARKETING_DESIGN_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSezZWlVjl4I9pCev4K8dVwIpUM99XprJxVlwrPabDG4Uq5GMQ/viewform"
const MARKETING_SOCIAL_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSeKuF_elLDQ8Jqw78re35w9HHTOnXSCbsUPmyDWYVyWpA2pfg/viewform"

export const ROLES: Role[] = [
  /* ─────────── Media Team ─────────── */
  {
    slug: "writer",
    team: "media",
    title: "Writer",
    mandate: "Tell the Story",
    purpose: "Write the words that carry GDG Babcock — event recaps, RADAR features, member spotlights, and announcements. Turn what the community does into something people actually want to read.",
    responsibilities: [
      "Write articles, recaps, and features for RADAR and the community blog",
      "Cover events as they happen and turn notes into publishable pieces",
      "Interview members, speakers, and alumni for spotlights and profiles",
      "Draft announcements, newsletters, and long-form copy for community programs",
      "Work with editors through revision rounds until a piece is ready to ship",
      "Pitch story ideas that surface work happening across the community",
    ],
    requirements: [
      "Strong written English and a sense for structure, pacing, and clarity",
      "Writing samples of any kind — articles, essays, newsletters, threads, coursework",
      "Ability to meet deadlines around events and publishing schedules",
      "Willingness to research a topic before writing about it",
    ],
    panelLooksFor: [
      "Quality and voice of your writing samples",
      "Curiosity — you ask good questions and dig past the obvious angle",
      "Openness to editing; you treat feedback as part of the craft",
      "Reliability around deadlines, especially event coverage",
      "Interest in the community's work, technical or not",
    ],
    color: "#4285F4",
    formUrl: WRITING_FORM,
  },
  {
    slug: "text-editor",
    team: "media",
    title: "Text Editor",
    mandate: "Sharpen Every Word",
    purpose: "Be the last set of eyes before anything goes out. Edit for clarity, accuracy, and consistency so everything GDG Babcock publishes reads like it came from one confident voice.",
    responsibilities: [
      "Edit articles, recaps, captions, and announcements before publication",
      "Maintain a style guide covering tone, naming, formatting, and common conventions",
      "Fact-check names, dates, titles, and claims across published material",
      "Give writers actionable feedback that improves the next draft, not just this one",
      "Coordinate with the media and marketing teams on publishing timelines",
      "Proofread graphics copy and event materials before they ship",
    ],
    requirements: [
      "Excellent command of grammar, punctuation, and English usage",
      "Sharp eye for inconsistency, ambiguity, and padding",
      "Experience editing others' writing — student publications, coursework, or personal projects",
      "Comfort working to a deadline and to a style guide",
    ],
    panelLooksFor: [
      "Precision — you catch what everyone else read past",
      "Judgment about when to cut and when to leave a writer's voice alone",
      "Tact in delivering edits so writers keep wanting to work with you",
      "Consistency of standards across pieces and contributors",
      "Interest in building a house style, not just fixing typos",
    ],
    color: "#EA4335",
    formUrl: WRITING_FORM,
  },
  {
    slug: "photographer",
    team: "media",
    title: "Photographer",
    mandate: "Capture the Moment",
    purpose: "Document GDG Babcock as it happens. Shoot the events, the people, and the small moments that become the community's visual record and the material every other team builds on.",
    responsibilities: [
      "Shoot community events — meetups, workshops, ORBIT, GDG Week, DevFest",
      "Capture portraits and candid coverage of members, speakers, and teams",
      "Cull, edit, and colour-grade shots to a consistent look",
      "Deliver organised, tagged photo sets to the media and marketing teams on schedule",
      "Maintain the community photo archive so past work stays findable",
      "Coordinate shot lists with event planners ahead of each event",
    ],
    requirements: [
      "Access to a camera or a phone you can shoot competently with",
      "A portfolio, Instagram, or folder of work you can show",
      "Working knowledge of composition, lighting, and basic editing (Lightroom, Snapseed, or similar)",
      "Availability for events, which often run evenings and weekends",
    ],
    panelLooksFor: [
      "Eye for framing, light, and moment in your existing work",
      "Consistency — a recognisable look across a set, not one lucky frame",
      "Reliability at events and speed of turnaround afterwards",
      "Comfort working around people and directing them gently",
      "Willingness to shoot what the team needs, not only what you feel like shooting",
    ],
    color: "#F9AB00",
    formUrl: MEDIA_PRODUCTION_FORM,
  },
  {
    slug: "videographer",
    team: "media",
    title: "Videographer",
    mandate: "Put It in Motion",
    purpose: "Film and cut the video that shows what GDG Babcock feels like from the inside — event aftermovies, recap reels, interviews, and short-form clips that travel.",
    responsibilities: [
      "Film events, interviews, and behind-the-scenes footage across the community calendar",
      "Edit aftermovies, recap reels, and short-form vertical clips for social",
      "Record and mix usable audio for interviews and speaker segments",
      "Plan shot lists and storyboards with event and marketing teams before shoots",
      "Organise and archive raw footage so it stays usable later",
      "Deliver cuts on schedule around event and campaign timelines",
    ],
    requirements: [
      "Experience filming with a camera or phone and editing in Premiere, DaVinci, CapCut, or similar",
      "A reel or sample videos you can show",
      "Understanding of pacing, sound, and short-form formats",
      "Availability for shoots during events, including evenings and weekends",
    ],
    panelLooksFor: [
      "Quality and rhythm of your existing edits",
      "Instinct for which moments carry a story",
      "Turnaround discipline — a recap is worth far less two weeks late",
      "Attention to audio, not just picture",
      "Collaboration with photographers, planners, and marketing on shared shoots",
    ],
    color: "#34A853",
    formUrl: MEDIA_PRODUCTION_FORM,
  },

  /* ─────────── Marketing Team ─────────── */
  {
    slug: "video-editor-motion-designer",
    team: "marketing",
    title: "Video Editor / Motion Designer",
    mandate: "Make It Move",
    purpose: "Cut and animate the video that carries GDG Babcock's campaigns — promos, teasers, motion graphics, and the short-form work that makes people stop scrolling.",
    responsibilities: [
      "Edit promotional videos, teasers, and recap content for campaigns",
      "Create motion graphics, animated titles, and transitions on brand",
      "Adapt one piece of footage into cuts sized for each platform",
      "Build reusable motion templates for recurring content formats",
      "Work with videographers and designers on look, pacing, and sound",
      "Deliver against campaign calendars and event deadlines",
    ],
    requirements: [
      "Proficiency with Premiere Pro, After Effects, DaVinci Resolve, CapCut, or similar",
      "Portfolio or reel showing edits and, ideally, motion work",
      "Understanding of pacing, typography in motion, and platform-native formats",
      "Ability to take direction and iterate quickly on feedback",
    ],
    panelLooksFor: [
      "Craft and polish visible in your existing reel",
      "Sense of timing — cuts that land with the music and the message",
      "Range across formats, from a 15-second vertical to a 3-minute recap",
      "Speed of iteration and comfort with revision rounds",
      "Interest in building templates the whole team can reuse",
    ],
    color: "#4285F4",
    formUrl: MARKETING_DESIGN_FORM,
  },
  {
    slug: "content-creator",
    team: "marketing",
    title: "Content Creator",
    mandate: "Feed the Feed",
    purpose: "Create the day-to-day content that keeps GDG Babcock visible — posts, captions, carousels, and short videos that make people want to show up.",
    responsibilities: [
      "Create and publish content across X, Instagram, LinkedIn, and TikTok",
      "Write captions and hooks that fit each platform's voice",
      "Produce carousels, reels, and shorts around events, programs, and members",
      "Maintain a content calendar and keep the pipeline full ahead of events",
      "Track what performs and adjust the next batch accordingly",
      "Collaborate with media and design on assets for each piece",
    ],
    requirements: [
      "Active understanding of how content actually performs on social platforms",
      "Samples of content you've made — accounts, posts, videos, or campaigns",
      "Comfort with basic design and editing tools (Canva, Figma, CapCut, or similar)",
      "Consistency — you can post on schedule, not only when inspired",
    ],
    panelLooksFor: [
      "Ideas — you show up with concepts, not just execution",
      "Platform fluency and awareness of what's currently working",
      "Consistency and follow-through on a posting cadence",
      "Willingness to look at numbers and change course",
      "Voice that fits a community brand, not just a personal one",
    ],
    color: "#EA4335",
    formUrl: MARKETING_SOCIAL_FORM,
  },
  {
    slug: "graphic-designer",
    team: "marketing",
    title: "Graphic Designer",
    mandate: "Set the Look",
    purpose: "Design the visual material that represents GDG Babcock everywhere — event flyers, social graphics, decks, merch, and the templates that keep it all consistent.",
    responsibilities: [
      "Design event flyers, social graphics, banners, and campaign assets",
      "Build and maintain templates so recurring formats stay fast and consistent",
      "Apply and extend the GDG Babcock visual identity across every touchpoint",
      "Design presentation decks and print material for events and partners",
      "Collaborate with content and strategy on the visual side of each campaign",
      "Prepare correctly sized, correctly formatted exports for every platform",
    ],
    requirements: [
      "Proficiency with Figma, Illustrator, Photoshop, or Canva",
      "Portfolio showing graphic or brand work of any kind",
      "Understanding of typography, layout, colour, and hierarchy",
      "Ability to work within an existing brand system rather than around it",
    ],
    panelLooksFor: [
      "Quality and consistency of your portfolio",
      "Typographic and layout judgment",
      "Ability to design in a system and build reusable templates",
      "Turnaround speed on time-sensitive event assets",
      "Openness to critique and iteration",
    ],
    color: "#F9AB00",
    formUrl: MARKETING_DESIGN_FORM,
  },
  {
    slug: "brand-content-strategist",
    team: "marketing",
    title: "Brand & Content Strategist",
    mandate: "Shape the Message",
    purpose: "Decide what GDG Babcock says, to whom, and when. Own the brand voice and turn scattered posts into campaigns that build toward something.",
    responsibilities: [
      "Define and document brand voice, positioning, and messaging guidelines",
      "Plan campaigns around events, programs, and recruitment cycles",
      "Own the content calendar and set the theme and goal for each cycle",
      "Analyse performance and turn what you learn into the next plan",
      "Brief creators, designers, and editors so output stays on message",
      "Research the audience — what students care about and where they are",
    ],
    requirements: [
      "Understanding of brand strategy, audience segmentation, and campaign planning",
      "Strong writing and the ability to argue a position clearly",
      "Comfort reading analytics and drawing conclusions from them",
      "Experience running a campaign, page, or initiative is a plus",
    ],
    panelLooksFor: [
      "Strategic thinking — you connect content to an actual outcome",
      "Ability to explain why a message works, not just that it does",
      "Evidence of planning that survived contact with a real audience",
      "Comfort briefing and coordinating other creatives",
      "Judgment about tone — when to be playful and when to be plain",
    ],
    color: "#34A853",
    formUrl: MARKETING_SOCIAL_FORM,
  },
  {
    slug: "social-media-manager",
    team: "marketing",
    title: "Social Media Manager",
    mandate: "Own the Channels",
    purpose: "Run GDG Babcock's social presence end to end — scheduling, publishing, replying, and growing the audience the rest of the community's work depends on.",
    responsibilities: [
      "Manage day-to-day publishing across all community social accounts",
      "Schedule content against the campaign calendar and event timelines",
      "Respond to comments, DMs, and mentions in the community's voice",
      "Track reach, engagement, and growth, and report on what moved",
      "Run live coverage during events — threads, stories, real-time posts",
      "Coordinate with creators, designers, and strategy to keep the queue full",
    ],
    requirements: [
      "Hands-on experience running or growing a social account",
      "Familiarity with platform analytics and scheduling tools",
      "Strong, fast writing in a conversational register",
      "Availability during events for live coverage",
    ],
    panelLooksFor: [
      "Evidence of an account you grew or ran consistently",
      "Judgment in community interactions, including the awkward ones",
      "Comfort with numbers and honest reporting on what didn't work",
      "Responsiveness and reliability, especially during events",
      "Instinct for the community's voice",
    ],
    color: "#4285F4",
    formUrl: MARKETING_SOCIAL_FORM,
  },

  /* ─────────── Events & Planning ─────────── */
  {
    slug: "event-planning-coordination",
    team: "events",
    title: "Event Planning & Coordination",
    mandate: "Bring Ideas to Life",
    purpose: "Turn event concepts into run-of-show reality. Own the plan, the timeline, and the coordination that makes ORBIT, GDG Week, DevFest, and every meetup actually happen.",
    responsibilities: [
      "Plan event concepts, formats, agendas, and run-of-show documents",
      "Build and hold event timelines from first planning meeting to teardown",
      "Coordinate speakers, facilitators, and session scheduling",
      "Run planning meetings and keep every workstream visible and accountable",
      "Serve as point of contact on event day and handle changes as they come",
      "Document what happened so the next team starts ahead of where you did",
    ],
    requirements: [
      "Strong organisation and the ability to hold many moving parts at once",
      "Clear written and verbal communication with teams and external parties",
      "Experience planning events, projects, or group initiatives of any size",
      "Availability in the run-up to and during community events",
    ],
    panelLooksFor: [
      "Follow-through — plans that turned into things that actually happened",
      "Calm under pressure when the schedule slips on the day",
      "Ability to coordinate people without micromanaging them",
      "Attention to the detail that separates a smooth event from a rough one",
      "Documentation habit that makes the next event easier",
    ],
    color: "#4285F4",
  },
  {
    slug: "logistics-management",
    team: "events",
    title: "Logistics Management",
    mandate: "Make the Day Work",
    purpose: "Own everything physical about an event — venue, setup, equipment, materials, and flow — so that on the day, everything is where it needs to be when it needs to be there.",
    responsibilities: [
      "Secure venues and handle room bookings, permissions, and access",
      "Plan setup, layout, seating, signage, and teardown for each event",
      "Manage equipment — AV, power, internet, projectors, seating, and materials",
      "Coordinate transport, deliveries, and on-site movement of people and things",
      "Build contingency plans for the failures that actually happen",
      "Lead the setup crew on event day and keep the schedule on the ground",
    ],
    requirements: [
      "Practical, hands-on organisation and problem-solving ability",
      "Experience with event setup, production, or comparable operational work",
      "Availability for setup and teardown, which run early and late",
      "Comfort coordinating a crew and communicating under time pressure",
    ],
    panelLooksFor: [
      "Anticipation — you plan for what goes wrong before it does",
      "Resourcefulness when something breaks an hour before doors",
      "Physical follow-through, not just planning on paper",
      "Clear communication with crew, vendors, and venue staff",
      "Checklist discipline",
    ],
    color: "#EA4335",
  },
  {
    slug: "vendor-partner-management",
    team: "events",
    title: "Vendor & Partner Management",
    mandate: "Build the Relationships",
    purpose: "Own the outside relationships that make events possible — vendors, sponsors, and partners. Find them, negotiate with them, and make sure both sides get what they were promised.",
    responsibilities: [
      "Source and evaluate vendors for catering, printing, AV, venue, and merchandise",
      "Negotiate pricing, scope, and terms, and keep agreements documented",
      "Identify and approach potential sponsors and partner organisations",
      "Manage sponsor deliverables and make sure every commitment is honoured",
      "Serve as the point of contact for external parties before and during events",
      "Maintain a vendor and partner directory with notes for future events",
    ],
    requirements: [
      "Confident communication and comfort negotiating with adults outside the community",
      "Organisation in tracking agreements, contacts, and deliverables",
      "Experience with sponsorship, procurement, or partnership work is a plus",
      "Professional, dependable follow-up habits",
    ],
    panelLooksFor: [
      "Professionalism — you represent the community well to outsiders",
      "Negotiation judgment about what to push on and what to concede",
      "Diligence in tracking commitments on both sides",
      "Relationship-building instinct that outlasts a single event",
      "Honesty and reliability in handling external agreements",
    ],
    color: "#F9AB00",
  },
  {
    slug: "budgeting-resource-planning",
    team: "events",
    title: "Budgeting & Resource Planning",
    mandate: "Make the Numbers Work",
    purpose: "Own the money and resources behind every event. Build the budget, track the spend, and make sure the community gets the most out of what it has.",
    responsibilities: [
      "Build event budgets covering venue, catering, materials, and production",
      "Track spending against budget throughout the planning cycle",
      "Collect, verify, and file receipts, invoices, and reimbursement requests",
      "Forecast resource needs and flag shortfalls early enough to act on",
      "Produce post-event financial summaries for the leadership team",
      "Find savings without quietly cutting what makes the event good",
    ],
    requirements: [
      "Comfort with numbers, spreadsheets, and basic financial tracking",
      "Meticulous record-keeping and attention to detail",
      "Integrity and discretion in handling community funds",
      "Experience managing a budget for a project, club, or event is a plus",
    ],
    panelLooksFor: [
      "Accuracy and discipline in record-keeping",
      "Trustworthiness — this role handles real money",
      "Ability to flag a problem early instead of at reconciliation",
      "Practical judgment about trade-offs and priorities",
      "Clear reporting that non-finance teammates can follow",
    ],
    color: "#34A853",
  },
  {
    slug: "post-event-evaluation",
    team: "events",
    title: "Post-Event Evaluation",
    mandate: "Learn from Every Event",
    purpose: "Close the loop after every event. Gather feedback, measure what happened against what was planned, and turn it into changes the next team can actually use.",
    responsibilities: [
      "Design and run attendee feedback surveys for each event",
      "Collect attendance, engagement, and outcome data against event goals",
      "Run post-event retrospectives with the planning and logistics teams",
      "Write up findings — what worked, what didn't, what to change",
      "Maintain an event playbook that improves with every cycle",
      "Track whether recommendations from the last event were acted on",
    ],
    requirements: [
      "Comfort designing surveys and working with the responses",
      "Analytical thinking and the ability to spot patterns in feedback",
      "Clear written reporting for an audience that will skim it",
      "Willingness to raise uncomfortable findings honestly",
    ],
    panelLooksFor: [
      "Ability to turn raw feedback into a specific, actionable recommendation",
      "Objectivity — you report what the data says, not what people hoped",
      "Facilitation skill in running a retrospective that stays constructive",
      "Follow-through on making sure lessons reach the next cycle",
      "Interest in continuous improvement as an ongoing practice",
    ],
    color: "#4285F4",
  },
]

export const getRole = (slug: string) => ROLES.find((r) => r.slug === slug)

export const getTeam = (id: TeamId) => TEAMS.find((t) => t.id === id)!

/** Role form wins over the team form. Empty means not ready — Apply renders disabled. */
export const formUrlFor = (role: Role) => role.formUrl || getTeam(role.team).formUrl
