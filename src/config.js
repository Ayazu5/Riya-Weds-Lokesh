export const weddingConfig = {
  meta: {
    slug: "riya-weds-lokesh",
  },
  couple: {
    brideName: "Lokesh Pal",
    brideParents: "Son of Mahender Pratap Singh",
    groomName: "Riya Pal",
    groomParents: "Daughter of Vijay Pal Singh",
  },
  wedding: {
    displayDate: "November 21, 2026",
    isoDateTime: "2026-11-21T12:00:00",
    day: "Saturday",
    time: "12:00 PM Onwards",
  },
  venue: {
    name: "Rahagir Resort",
    address: "Paliyal Gaun, Rishikesh, Uttarakhand",
    note: "Wedding Reception Venue",
    mapsUrl: "https://maps.google.com/?q=Rahagir+Resort+Rishikesh",
  },
  intro: {
    namesAppearAtSeconds: 5.5,
  },
  media: {
    introVideo: "./assets/video/intro.mp4",
    introPoster: "./assets/video/intro.webp",
    backgroundMusic: "./assets/audio/bgm1.mp3",
    gallery: [
      { src: "./assets/gallery/gallery-01.jpg", alt: "Riya and Lokesh" }
    ]
  },
  copy: {
    heroBismillah: "Om Shri Ganeshaya Namah",
    heroIntroLineOne: "Together with their families",
    heroIntroLineTwo: "Invite you to celebrate",
    heroIntroLineThree: "Their Wedding Reception",
    heroClosingLine: "We await your gracious presence",
    welcomeTitle: "A Celebration of Love",
    welcomeBody: "Join us as we mark the beginning of our lifelong journey together.",
    dateIntro: "Save the date for the celebration",
    datePrompt: "Scratch to reveal the date",
    dateRevealed: "November 21, 2026",
    galleryTitle: "Our Moments",
    countdownTitle: "Counting Down to Forever",
    timelineTitle: "Wedding Program",
    venueTitle: "",
    closingTitle: "With Love",
    closingBody: "We look forward to celebrating with you.",
  },
  program: [
    { time: "12:00 PM", title: "Lunch", detail: "Greeting and Lunch" },
    { time: "02:00 PM", title: "Jaimala", detail: "Ring ceremony and Jaimala" },
    { time: "04:00 PM", title: "Bidai", detail: "Farewell" }
  ],
  familyGroups: [
    {
      title: "R.S.V.P",
      names: [
        "Mr Hansraj Singh",
        "Mr Vijay Pal",
        "Dr Akash Pal",
        "Adv Vikas Pal",
        "Mr Gourav Pal",
        "Mr Abhay Pal",
        "Mr Arvind Pal",
        "Mr Nipendra Pal",
        "Mr Vipin Pal"
      ]
    }
  ],
  sections: {
    welcome: true,
    scratchReveal: true,
    gallery: false,
    countdown: true,
    timeline: true,
    venue: true,
    dressCode: false,
    preWeddingEvents: false,
    gifts: false,
    rsvp: true,
    closing: true,
  },
  theme: {
    colors: {
      ivory: "#f3ead9",
      emerald: "#123f35",
      emeraldDeep: "#0b2b24",
      gold: "#d5b875",
      goldDeep: "#aa8742",
      ink: "#17312c",
      muted: "#6b746f",
    },
    fonts: {
      arabic: "'Noto Naskh Arabic', serif",
      names: "'Great Vibes', serif",
      display: "'Noto Serif Display', serif",
      body: "'Manrope', sans-serif",
    },
  },
};
