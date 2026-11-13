export const weddingConfig = {
  meta: {
    slug: "riya-weds-lokesh",
  },
  couple: {
    brideName: "Riya Pal",
    brideParents: "Daughter of Vijay Pal Singh",
    groomName: "Lokesh Pal",
    groomParents: "Son of Mahender Pratap Singh",
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
      { src: "./assets/gallery/gallery-01.jpg", alt: "Lokesh and Riya" }
    ]
  },
  copy: {
    heroBismillah: "Bismillah hir-Rahman nir-Rahim",
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
    venueTitle: "The Venue",
    preWeddingTitle: "Pre-Wedding Events",
    closingTitle: "With Love",
    closingBody: "We look forward to celebrating with you.",
  },
  dressCode: {
    title: "Festive Elegance",
    description: "Traditional or formal attire.",
    palette: ["#123f35", "#d5b875", "#f3ead9"]
  },
  preWeddingEvents: [
    {
      title: "Nikah & Reception",
      date: "November 21, 2026",
      time: "12:00 PM Onwards",
      venue: "Rahagir Resort, Rishikesh",
      note: "Looking forward to your presence",
      mapsUrl: "https://maps.google.com/?q=Rahagir+Resort+Rishikesh"
    }
  ],
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
    preWeddingEvents: true,
    gifts: false,
    rsvp: true,
    closing: true,
  },
  rsvp: {
    endpoint: "",
    previewStorageKey: "riya_lokesh_rsvp_preview",
    mealOptions: ["Vegetarian", "Non-Vegetarian"],
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
