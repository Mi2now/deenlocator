/* ============================================================
   DeenLocator — App Configuration
   Edit this file to change app-wide settings.
   After editing, upload to GitHub to go live.
   ============================================================ */

var APP_CONFIG = {

  /* ── Contact & Links ── */
  whatsappNumber:   "2348065900110",     /* without + sign */
  contactPhone:     "+234 806 590 0110",
  adminEmail:       "mustytunau@gmail.com",
  googleFormUrl:    "https://forms.gle/deenlocator",   /* update when you have the real link */
  appUrl:           "https://mi2now.github.io/deenlocator",
  
  /* ── App Branding ── */
  appName:          "DeenLocator",
  appTagline:       "Eid & Jumuah Locator · Abuja",
  poweredBy:        "2now Technology",
  
  /* ── Jumuah Message (shown on Prayer Time page) ── */
  jumuahMessage:    "Adhan ~12:30 PM · Khutbah follows · Salah ends ~2:30 PM",
  
  /* ── Suggest Card Text ── */
  suggestHeadline:  "Do you know a Mosque or Eid Ground?",
  suggestSubtext:   "Help us build the most complete prayer directory in Abuja — FREE.",
  
  /* ── Share Card Footer ── */
  shareCardTagline: "Find Eid & Jumuah locations in Abuja instantly",
  
  /* ── Copy Text Card ── */
  copyCardIntro:    "🕌 DeenLocator — Abuja Prayer Locations",

  /* ── FAQ Items ── */
  faqItems: [
    {
      q: "What is DeenLocator?",
      a: "DeenLocator is a free app that helps Muslims in Abuja FCT find the nearest Eid prayer grounds and Friday (Jumuah) mosques — with GPS distance, prayer times, directions, and notifications."
    },
    {
      q: "How accurate is the GPS distance?",
      a: "Very accurate — we use your device GPS and the Haversine formula (the same math used by Google Maps) to calculate straight-line distance to each location."
    },
    {
      q: "What is the difference between Auto Abuja and My Mosque times?",
      a: "Auto Abuja fetches today\'s exact astronomical prayer times from the AlAdhan.com API for Abuja coordinates. My Mosque lets you manually set the prayer times used at your local mosque."
    },
    {
      q: "How do I get notified before prayer?",
      a: "Go to Settings → Enable Notifications → then choose how many minutes before each prayer you want an alert. You must have the app open or installed as a PWA for notifications to fire."
    },
    {
      q: "Can I use DeenLocator without internet?",
      a: "Yes — once you\'ve opened the app, locations and prayer times are cached. You can browse and navigate offline. The API prayer times require an internet connection to update."
    },
    {
      q: "How do I install DeenLocator as an app on my phone?",
      a: "Android (Chrome): Tap the three-dot menu → \'Add to Home Screen\'. iPhone (Safari): Tap the Share icon → \'Add to Home Screen\'. The app then works like a native app — no app store needed."
    },
    {
      q: "How do I suggest a mosque or Eid ground not on the list?",
      a: "Go to Settings → \'Suggest a Mosque or Eid Ground\'. Send us the name, address, area, prayer time, and (optionally) a Google Maps pin. We verify and add it to the next update."
    },
    {
      q: "How often is the location data updated?",
      a: "We update locations throughout the year as we verify new mosques. The data updates automatically on your device within minutes of a new release — no reinstall needed."
    }
  ]

};
