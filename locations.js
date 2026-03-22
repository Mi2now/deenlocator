/*
 * ============================================================
 *  DeenLocator — Location Data File
 *  Powered by 2now Technology
 *  WhatsApp: https://wa.me/2348065900110
 * ============================================================
 *
 *  HOW TO ADD A NEW MOSQUE:
 *  1. Copy one full block { ... } from below
 *  2. Paste it BEFORE the closing ];
 *  3. Make sure there is a comma after the previous entry's }
 *  4. Fill in the correct details
 *  5. Save with Ctrl+S
 *
 *  PRAYER TYPES:
 *  "eid"    = Eid prayer ground only
 *  "jumuah" = Friday Jumuah prayer only
 *  "both"   = Has both Eid and Jumuah
 *
 *  HOW TO GET COORDINATES:
 *  Google Maps → find mosque → right-click on pin
 *  → click the numbers at top of menu (they copy automatically)
 *  → first number = lat, second number = lng
 *
 *  FIELDS YOU CAN LEAVE BLANK (use ""):
 *  imam, phone, whatsapp, eidTime, jumuahTime
 * ============================================================
 */

const LOCATIONS = [

  {
    id: 1,
    name: "National Mosque Eid Ground",
    address: "National Eid Ground, Along Airport Road, After City Gate",
    area: "City Gate",
    city: "Abuja",
    type: "eid",
    eidTime: "8:00 AM",
    jumuahTime: "",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.05785,
    lng: 7.49508,
    verified: true,
    featured: true
  },

  {
    id: 2,
    name: "An-Noor Masjid",
    address: "ICICE Centre, Wuse 2, Abuja",
    area: "Wuse 2",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.075122290329963,
    lng: 7.4846740945593755,
    verified: true,
    featured: false
  },

  {
    id: 3,
    name: "JIBWIS Headquarters",
    address: "Utako Berger, Abuja",
    area: "Utako",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.071033094459153,
    lng: 7.451041461280577,
    verified: true,
    featured: false
  },

  {
    id: 4,
    name: "Gwarinpa Eid Ground",
    address: "Gwarinpa Eid Prayer Ground",
    area: "Gwarinpa",
    city: "Abuja",
    type: "eid",
    eidTime: "8:00 AM",
    jumuahTime: "",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.094415529181108,
    lng: 7.40802688642671,
    verified: true,
    featured: false
  },

  {
    id: 5,
    name: "Nurul Yaqeen Mosque",
    address: "Plot 268, Kafe, Life Camp, Opp. Godab Estate",
    area: "Life Camp",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.09447009975416,
    lng: 7.388659739210141,
    verified: true,
    featured: false
  },

  {
    id: 6,
    name: "Uthman Bin Affan Masjid",
    address: "FOMWAN International School, Adjacent Banex Plaza, Wuse 2",
    area: "Wuse 2",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.08415743344454,
    lng: 7.4705928225027005,
    verified: true,
    featured: false
  },

  {
    id: 7,
    name: "Ibrahim Maimunat Foundation Masjid",
    address: "No 4 IMF Close, FO Kubwa, FCT, Abuja",
    area: "Kubwa",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:00 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.15810,
    lng: 7.33120,
    verified: true,
    featured: false
  },

  {
    id: 8,
    name: "Al-Habibiyyah Mosque",
    address: "Plot 753, Babagana Kingibe Street, Guzape, Asokoro District",
    area: "Asokoro",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.005335818693293,
    lng: 7.513092452001152,
    verified: true,
    featured: false
  },

  {
    id: 9,
    name: "Dutse Baumpa Mosque",
    address: "Shafa Energy, Tipper Garage Bmuko Junction, Dutse-Bwari Road",
    area: "Dutse",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.175950892728306,
    lng: 7.382848860466881,
    verified: true,
    featured: false
  },

  {
    id: 10,
    name: "Muslim Community Central Mosque Kubwa",
    address: "Shelter Farm, Kubwa",
    area: "Kubwa",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:00 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.15380,
    lng: 7.32040,
    verified: true,
    featured: false
  },

  {
    id: 11,
    name: "Citec Estate Mbora Eid Ground",
    address: "After Salbas Filling Station, Before Idu-Junction, Mbora District",
    area: "Mbora",
    city: "Abuja",
    type: "eid",
    eidTime: "8:00 AM",
    jumuahTime: "",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.045996288916779,
    lng: 7.410996038019534,
    verified: true,
    featured: false
  },

  {
    id: 12,
    name: "JIBWIS Prayer Ground Gbazango",
    address: "NYSC Junction by the Express, Gbazango, Kubwa",
    area: "Kubwa",
    city: "Abuja",
    type: "eid",
    eidTime: "8:00 AM",
    jumuahTime: "",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.14250,
    lng: 7.33400,
    verified: true,
    featured: false
  },

  {
    id: 13,
    name: "Chika Jumu'ah Mosque",
    address: "Chika, Along Airport Road, Opposite ECOWAS Abuja",
    area: "Chika",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.994184310302737,
    lng: 7.407522843637574,
    verified: true,
    featured: false
  },

  {
    id: 14,
    name: "OTM Islamic Centre",
    address: "Cluster 5 Promenade/Kwankwaso Estate, Lokogoma FCT",
    area: "Lokogoma",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.02050,
    lng: 7.48600,
    verified: true,
    featured: false
  },

  {
    id: 15,
    name: "FOMWAN Headquarters Jumuah Masjid",
    address: "FOMWAN Headquarters Jumuah Masjid, Utako",
    area: "Utako",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.067312148981655,
    lng: 7.4435238645738995,
    verified: true,
    featured: false
  },

  {
    id: 16,
    name: "Al-Huda Masjid",
    address: "Uwadia-Resorts, Melonia Quarters, Byazhin-Kubwa",
    area: "Kubwa",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:00 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.174619138348556,
    lng: 7.322060810603763,
    verified: true,
    featured: false
  },

  {
    id: 17,
    name: "JIBWIS Islamic Centre Guzape",
    address: "Adamu Aliero Road, Guzape",
    area: "Guzape",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.9993011494783,
    lng: 7.511564840070365,
    verified: true,
    featured: false
  },

  {
    id: 18,
    name: "Masjid Shaikh Ja'afar Zuba",
    address: "Along Kaduna-Lokoja Expressway, Zuba",
    area: "Zuba",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.061751937090298,
    lng: 7.19403074306903,
    verified: true,
    featured: false
  },

  {
    id: 19,
    name: "Area 8 Jumu'ah Masjid",
    address: "Area 8 Masjid Section 1, Sheda Close, Garki",
    area: "Garki",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.038784534663135,
    lng: 7.488772194742154,
    verified: true,
    featured: false
  },

  {
    id: 20,
    name: "Sun City Estate Mosque (SEMRA)",
    address: "Sun City Estate Jumu'ah Mosque, Lugbe",
    area: "Lugbe",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.990352440719924,
    lng: 7.433924100001026,
    verified: true,
    featured: false
  },

  {
    id: 21,
    name: "Zuma Barracks Masjid (Suleja)",
    address: "Masjid Ibn Abbas, Besides Zuma Barracks, Abuja-Kaduna Expressway, Suleja",
    area: "Suleja",
    city: "Suleja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.110694663743523,
    lng: 7.213730423995101,
    verified: true,
    featured: false
  },

  {
    id: 22,
    name: "Gbazango West Muslim Community",
    address: "Gbazango West, Near Train Station, Behind Police Station, Kubwa",
    area: "Kubwa",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:00 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.155405992405267,
    lng: 7.314089580386551,
    verified: true,
    featured: false
  },

  {
    id: 23,
    name: "Dape Village Masjid",
    address: "Dape Village, Off Julius Berger Camp Road",
    area: "Dape",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.065237165579177,
    lng: 7.379929197170717,
    verified: true,
    featured: false
  },

  {
    id: 24,
    name: "Dambatta Masjid",
    address: "No 23 Kaltungo Street, Garki II, Abuja",
    area: "Garki",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.023278315133725,
    lng: 7.495266874754409,
    verified: true,
    featured: false
  },

  {
    id: 25,
    name: "Jedo Estate Islamic Center",
    address: "Jumu'ah Masjid, Jedo Estate, Along Airport Road",
    area: "Airport Road",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.966866348408724,
    lng: 7.323753971673962,
    verified: true,
    featured: false
  },

  {
    id: 26,
    name: "Cyclic Energy Jumu'ah Masjid",
    address: "Cyclic Energy, Airport Road, Abuja",
    area: "Airport Road",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:15 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.959739683309433,
    lng: 7.339909479416367,
    verified: true,
    featured: false
  },

  {
    id: 27,
    name: "Masjid Abubakar Siddique",
    address: "Zone 6, Wuse, Abuja",
    area: "Wuse",
    city: "Abuja",
    type: "jumuah",
    eidTime: "",
    jumuahTime: "1:30 PM",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 9.070199239895457,
    lng: 7.4603943627809555,
    verified: true,
    featured: false
  },

  {
    id: 28,
    name: "Sunnyvale Homes Eid Ground",
    address: "Sunnyvale Homes Play Ground, Near the Old Gate",
    area: "Sunnyvale",
    city: "Abuja",
    type: "eid",
    eidTime: "8:00 AM",
    jumuahTime: "",
    imam: "To be announced",
    phone: "",
    whatsapp: "",
    lat: 8.984777240369992,
    lng: 7.445794371761683,
    verified: true,
    featured: false
  }

];

/*
 * ── END OF LOCATIONS ──
 * Total entries: 28
 * Eid grounds:   6  (ids: 1, 4, 11, 12, 28 + check others)
 * Jumuah:        22
 * Last updated:  2025
 * Maintained by: 2now Technology
 * Contact:       https://wa.me/2348065900110
 */