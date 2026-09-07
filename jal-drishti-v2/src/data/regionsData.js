// Comprehensive dataset for Jal Drishti V2 Early Warning System
// Modeled with authentic geographic baselines for high-risk flood plains in India

export const REGIONS_DATA = [
  {
    state: "Assam",
    stateCode: "AS",
    riverBasin: "Brahmaputra River Basin",
    districts: [
      {
        name: "Kamrup",
        villages: [
          {
            id: "as-kam-palasbari",
            name: "Palasbari",
            localName: "পলাশবাৰী",
            lat: 26.128,
            lng: 91.534,
            population: 18450,
            riverName: "Brahmaputra",
            severity: "CRITICAL",
            threatScore: 92,
            floodDistanceKm: 4.8,
            etaHours: 1.8,
            etaMinutes: 108,
            waveVelocityKmh: 3.2,
            confidence: {
              overall: 91,
              sarClassification: 94,
              gaugeAgreement: 88,
              terrainModel: 85
            },
            currentInundationSqKm: 14.6,
            upstreamGauges: [
              {
                id: "gau-pan-01",
                name: "Pandu Gauge Station",
                distanceUpstreamKm: 12.4,
                lat: 26.175,
                lng: 91.688,
                currentLevelM: 50.45,
                dangerLevelM: 49.60,
                warningLevelM: 48.60,
                trend: "rising",
                dischargeCusecs: 48200,
                lastUpdated: "10 mins ago"
              },
              {
                id: "gau-cha-02",
                name: "Chandrapur Telemetry Node",
                distanceUpstreamKm: 24.1,
                lat: 26.210,
                lng: 91.890,
                currentLevelM: 54.20,
                dangerLevelM: 53.00,
                warningLevelM: 52.10,
                trend: "rising",
                dischargeCusecs: 51900,
                lastUpdated: "18 mins ago"
              },
              {
                id: "gau-goa-03",
                name: "Goalpara Hydrology Post",
                distanceUpstreamKm: 42.0,
                lat: 26.180,
                lng: 90.620,
                currentLevelM: 35.80,
                dangerLevelM: 36.27,
                warningLevelM: 35.50,
                trend: "steady",
                dischargeCusecs: 41200,
                lastUpdated: "25 mins ago"
              }
            ],
            riverLevel24h: [
              { time: "00:00", level: 47.8, danger: 49.6 },
              { time: "04:00", level: 48.3, danger: 49.6 },
              { time: "08:00", level: 48.9, danger: 49.6 },
              { time: "12:00", level: 49.5, danger: 49.6 },
              { time: "16:00", level: 50.1, danger: 49.6 },
              { time: "20:00", level: 50.45, danger: 49.6 },
              { time: "00:00 (Proj)", level: 50.95, danger: 49.6, projected: true },
              { time: "04:00 (Proj)", level: 51.30, danger: 49.6, projected: true },
            ],
            shelters: [
              {
                id: "sh-kam-01",
                name: "Amingaon High-Ground Relief Camp",
                lat: 26.178,
                lng: 91.642,
                capacity: 1200,
                currentOccupancy: 840,
                elevationMeters: 78,
                facilities: ["24/7 Medical Unit", "Clean Drinking Water", "NDRF Boat Dock", "Solar Power Grid"],
                officer: "Maj. Samar Barua",
                phone: "+91 94350-12841"
              },
              {
                id: "sh-kam-02",
                name: "Mirza Polytechnic Relief Hub",
                lat: 26.082,
                lng: 91.505,
                capacity: 850,
                currentOccupancy: 310,
                elevationMeters: 62,
                facilities: ["Food Rations", "Infant Care", "First Aid", "Mobile Charging Station"],
                officer: "Dr. Ananya Kalita",
                phone: "+91 98640-54219"
              }
            ],
            routes: [
              {
                id: "rt-pal-01",
                name: "Route A — NH-27 North Ridge Highway",
                type: "safe",
                distanceKm: 11.2,
                timeMins: 19,
                elevationRisk: "Low (High Embankment)",
                safetyScore: 94,
                hazards: [],
                targetShelter: "Amingaon High-Ground Relief Camp",
                waypoints: [
                  [26.128, 91.534],
                  [26.142, 91.565],
                  [26.160, 91.605],
                  [26.178, 91.642]
                ]
              },
              {
                id: "rt-pal-02",
                name: "Route B — River Valley Embankment Road",
                type: "caution",
                distanceKm: 8.5,
                timeMins: 16,
                elevationRisk: "Medium (Submerged in +2h)",
                safetyScore: 58,
                hazards: ["Water overflow at KM 4.2", "Narrow single lane"],
                targetShelter: "Mirza Polytechnic Relief Hub",
                waypoints: [
                  [26.128, 91.534],
                  [26.110, 91.520],
                  [26.095, 91.512],
                  [26.082, 91.505]
                ]
              },
              {
                id: "rt-pal-03",
                name: "Route C — Sualkuchi Ferry Ghat Track",
                type: "blocked",
                distanceKm: 6.2,
                timeMins: 35,
                elevationRisk: "Critical (Submerged)",
                safetyScore: 12,
                hazards: ["Culvert washed away", "Impassable for 4-wheelers"],
                targetShelter: "Amingaon High-Ground Relief Camp",
                waypoints: [
                  [26.128, 91.534],
                  [26.148, 91.545],
                  [26.165, 91.580]
                ]
              }
            ],
            languageAlerts: {
              en: "EMERGENCY: Brahmaputra flood surge is 4.8 km upstream, reaching Palasbari in 1.8 hours. Evacuate immediately via NH-27 North Ridge to Amingaon Shelter.",
              as: "জৰুৰী সতৰ্কবাৰ্তা: ব্ৰহ্মপুত্ৰৰ পানী পলাশবাৰীৰ পৰা ৪.৮ কিঃমিঃ নিলগত আছে, ১.৮ ঘণ্টাত উপনীত হ'ব। অনুগ্ৰহ কৰি ৰাষ্ট্ৰীয় ঘাইপথ ২৭ হৈ আমনিগাঁও আশ্ৰয় শিবিৰলৈ যাওক।",
              hi: "आपातकालीन चेतावनी: ब्रह्मपुत्र की बाढ़ पलाशबाड़ी से 4.8 किमी दूर है, 1.8 घंटे में पहुंचेगी। तुरंत NH-27 से अमिनगांव राहत शिविर की ओर निकलें।",
              bn: "জরুরী সতর্কতা: ব্রহ্মপুত্রের বন্যা পলাশবাড়ী থেকে ৪.৮ কিমি দূরে, ১.৮ ঘণ্টার মধ্যে পৌঁছাবে। অনুগ্রহ করে অবিলম্বে নিরাপদ আশ্রয়ে যান।",
              ml: "അടിയന്തര മുന്നറിയിപ്പ്: ബ്രഹ്മപുത്ര പ്രളയജലം 4.8 കി.മീ അകലെയാണ്, 1.8 മണിക്കൂറിനുള്ളിൽ എത്തും. ഉടൻ സുരക്ഷിത സ്ഥാനത്തേക്ക് മാറുക."
            }
          },
          {
            id: "as-kam-hajo",
            name: "Hajo",
            localName: "হাজো",
            lat: 26.248,
            lng: 91.524,
            population: 14200,
            riverName: "Brahmaputra / Borolia",
            severity: "HIGH",
            threatScore: 76,
            floodDistanceKm: 9.4,
            etaHours: 3.4,
            etaMinutes: 204,
            waveVelocityKmh: 2.8,
            confidence: {
              overall: 84,
              sarClassification: 89,
              gaugeAgreement: 82,
              terrainModel: 81
            },
            currentInundationSqKm: 8.2,
            upstreamGauges: [
              {
                id: "gau-haj-01",
                name: "Hajo Bridge Sensor",
                distanceUpstreamKm: 6.2,
                lat: 26.270,
                lng: 91.540,
                currentLevelM: 42.10,
                dangerLevelM: 42.50,
                warningLevelM: 41.50,
                trend: "rising",
                dischargeCusecs: 19800,
                lastUpdated: "8 mins ago"
              }
            ],
            riverLevel24h: [
              { time: "00:00", level: 39.5, danger: 42.5 },
              { time: "06:00", level: 40.2, danger: 42.5 },
              { time: "12:00", level: 41.3, danger: 42.5 },
              { time: "16:00", level: 42.1, danger: 42.5 },
              { time: "20:00 (Proj)", level: 42.6, danger: 42.5, projected: true }
            ],
            shelters: [
              {
                id: "sh-haj-01",
                name: "Hajo Temple Hill Community Center",
                lat: 26.255,
                lng: 91.518,
                capacity: 900,
                currentOccupancy: 320,
                elevationMeters: 92,
                facilities: ["High Ground Safety", "Drinking Water Tank", "Food Reserves"],
                officer: "B. Goswami",
                phone: "+91 94351-87234"
              }
            ],
            routes: [
              {
                id: "rt-haj-01",
                name: "Route A — Temple Hill Paved Highway",
                type: "safe",
                distanceKm: 4.2,
                timeMins: 10,
                elevationRisk: "Low",
                safetyScore: 92,
                hazards: [],
                targetShelter: "Hajo Temple Hill Community Center",
                waypoints: [
                  [26.248, 91.524],
                  [26.252, 91.521],
                  [26.255, 91.518]
                ]
              }
            ],
            languageAlerts: {
              en: "WARNING: River Borolia level approaching Danger Mark. Expected impact in 3.4 hours. Move livestock to Temple Hill shelter.",
              as: "সতৰ্কবাৰ্তা: বৰলীয়া নদীৰ পানী বিপদসীমাৰ ওচৰ পাইছে। ৩.৪ ঘণ্টাত পানী বৃদ্ধি পাব। মন্দিৰ পাহাৰ আশ্ৰয় শিবিৰলৈ যাওক।",
              hi: "चेतावनी: बरोलिया नदी का स्तर खतरे के निशान के पास है। 3.4 घंटे में प्रभाव की संभावना। मंदिर पहाड़ी आश्रय स्थल पर जाएं।"
            }
          }
        ]
      },
      {
        name: "Barpeta",
        villages: [
          {
            id: "as-bar-road",
            name: "Barpeta Road",
            localName: "বৰপেটা ৰোড",
            lat: 26.502,
            lng: 90.965,
            population: 25400,
            riverName: "Manas / Beki",
            severity: "CRITICAL",
            threatScore: 96,
            floodDistanceKm: 3.2,
            etaHours: 1.1,
            etaMinutes: 66,
            waveVelocityKmh: 3.5,
            confidence: {
              overall: 95,
              sarClassification: 96,
              gaugeAgreement: 94,
              terrainModel: 95
            },
            currentInundationSqKm: 28.4,
            upstreamGauges: [
              {
                id: "gau-bek-01",
                name: "Beki River Railway Bridge Station",
                distanceUpstreamKm: 8.5,
                lat: 26.550,
                lng: 90.980,
                currentLevelM: 46.20,
                dangerLevelM: 45.10,
                warningLevelM: 44.20,
                trend: "rising",
                dischargeCusecs: 64000,
                lastUpdated: "5 mins ago"
              }
            ],
            riverLevel24h: [
              { time: "00:00", level: 43.1, danger: 45.1 },
              { time: "06:00", level: 44.2, danger: 45.1 },
              { time: "12:00", level: 45.4, danger: 45.1 },
              { time: "16:00", level: 46.2, danger: 45.1 },
              { time: "20:00 (Proj)", level: 46.9, danger: 45.1, projected: true }
            ],
            shelters: [
              {
                id: "sh-bar-01",
                name: "Howly Higher Secondary Relief Hub",
                lat: 26.435,
                lng: 90.972,
                capacity: 1500,
                currentOccupancy: 1120,
                elevationMeters: 65,
                facilities: ["NDRF Command Post", "Mobile Clinic", "Clean Water Tanker"],
                officer: "Inspector D. Talukdar",
                phone: "+91 94350-99881"
              }
            ],
            routes: [
              {
                id: "rt-bar-01",
                name: "Route A — NH-31 South Embankment",
                type: "safe",
                distanceKm: 9.1,
                timeMins: 15,
                elevationRisk: "Low",
                safetyScore: 91,
                hazards: ["Heavy evacuee traffic"],
                targetShelter: "Howly Higher Secondary Relief Hub",
                waypoints: [
                  [26.502, 90.965],
                  [26.470, 90.970],
                  [26.435, 90.972]
                ]
              }
            ],
            languageAlerts: {
              en: "FLASH FLOOD CRITICAL: Beki river has breached upstream embankment. Flood surge arriving in 66 mins. Evacuate to Howly Relief Hub now.",
              as: "চৰম সতৰ্কবাৰ্তা: বেকী নদীৰ বান্ধ ভাগিছে। ৬৬ মিনিটৰ ভিতৰত পানী প্ৰৱেশ কৰিব। অনতিপলমে হাউলী আশ্ৰয় শিবিৰলৈ যাওক।",
              hi: "अत्यधिक गंभीर चेतावनी: बेकी नदी का तटबंध टूटा। 66 मिनट में जलस्तर बढ़ेगा। तुरंत हाउली राहत केंद्र पहुंचें।"
            }
          }
        ]
      }
    ]
  },
  {
    state: "Bihar",
    stateCode: "BR",
    riverBasin: "Kosi & Bagmati Basin",
    districts: [
      {
        name: "Darbhanga",
        villages: [
          {
            id: "bi-dar-benipur",
            name: "Benipur",
            localName: "बेनीपुर",
            lat: 26.132,
            lng: 86.024,
            population: 22100,
            riverName: "Kamla Balan",
            severity: "CRITICAL",
            threatScore: 89,
            floodDistanceKm: 5.4,
            etaHours: 2.1,
            etaMinutes: 126,
            waveVelocityKmh: 2.6,
            confidence: {
              overall: 93,
              sarClassification: 95,
              gaugeAgreement: 91,
              terrainModel: 92
            },
            currentInundationSqKm: 19.8,
            upstreamGauges: [
              {
                id: "gau-kam-01",
                name: "Jhanjharpur Gauge Post",
                distanceUpstreamKm: 16.8,
                lat: 26.260,
                lng: 86.280,
                currentLevelM: 52.80,
                dangerLevelM: 51.00,
                warningLevelM: 50.00,
                trend: "rising",
                dischargeCusecs: 38400,
                lastUpdated: "12 mins ago"
              }
            ],
            riverLevel24h: [
              { time: "00:00", level: 49.2, danger: 51.0 },
              { time: "06:00", level: 50.1, danger: 51.0 },
              { time: "12:00", level: 51.8, danger: 51.0 },
              { time: "16:00", level: 52.8, danger: 51.0 },
              { time: "20:00 (Proj)", level: 53.4, danger: 51.0, projected: true }
            ],
            shelters: [
              {
                id: "sh-dar-01",
                name: "Darbhanga Stadium Multi-Purpose Shelter",
                lat: 26.155,
                lng: 85.902,
                capacity: 2000,
                currentOccupancy: 1400,
                elevationMeters: 55,
                facilities: ["Helipad", "Army Medical Camp", "20,000L Water Reserve"],
                officer: "Col. R. K. Singh",
                phone: "+91 94310-77621"
              }
            ],
            routes: [
              {
                id: "rt-dar-01",
                name: "Route A — State Highway 56 Raised Corridor",
                type: "safe",
                distanceKm: 14.5,
                timeMins: 24,
                elevationRisk: "Low",
                safetyScore: 90,
                hazards: [],
                targetShelter: "Darbhanga Stadium Multi-Purpose Shelter",
                waypoints: [
                  [26.132, 86.024],
                  [26.140, 85.970],
                  [26.155, 85.902]
                ]
              }
            ],
            languageAlerts: {
              en: "DANGER: Kamla Balan river discharge at Jhanjharpur exceeds danger mark. Flood ETA at Benipur is 2.1 hours. Proceed via SH-56 to Darbhanga Stadium.",
              hi: "खतरा: कमला बलान नदी का जलस्तर झंझारपुर में खतरे के निशान से ऊपर। बेनीपुर में 2.1 घंटे में बाढ़ पहुंचने का अनुमान। SH-56 से दरभंगा स्टेडियम जाएं।",
              bn: "বিপদ: ঝঞ্ঝারপুরে কমলা বালান নদীর জল বিপদসীমার উপরে। বেনীপুরে ২.১ ঘণ্টায় জল পৌঁছাবে।"
            }
          }
        ]
      }
    ]
  },
  {
    state: "Kerala",
    stateCode: "KL",
    riverBasin: "Kabini & Chaliyar Basin",
    districts: [
      {
        name: "Wayanad",
        villages: [
          {
            id: "ke-way-meppadi",
            name: "Meppadi",
            localName: "മേപ്പാടി",
            lat: 11.554,
            lng: 76.128,
            population: 8200,
            riverName: "Chaliyar Tributary",
            severity: "CRITICAL",
            threatScore: 98,
            floodDistanceKm: 2.1,
            etaHours: 0.7,
            etaMinutes: 42,
            waveVelocityKmh: 4.8,
            confidence: {
              overall: 96,
              sarClassification: 97,
              gaugeAgreement: 95,
              terrainModel: 96
            },
            currentInundationSqKm: 11.4,
            upstreamGauges: [
              {
                id: "gau-mep-01",
                name: "Chooralmala Hydro-Telemetry Post",
                distanceUpstreamKm: 4.2,
                lat: 11.530,
                lng: 76.160,
                currentLevelM: 14.80,
                dangerLevelM: 12.00,
                warningLevelM: 11.00,
                trend: "rising",
                dischargeCusecs: 24500,
                lastUpdated: "3 mins ago"
              }
            ],
            riverLevel24h: [
              { time: "00:00", level: 9.2, danger: 12.0 },
              { time: "06:00", level: 10.8, danger: 12.0 },
              { time: "12:00", level: 13.1, danger: 12.0 },
              { time: "16:00", level: 14.8, danger: 12.0 },
              { time: "20:00 (Proj)", level: 15.6, danger: 12.0, projected: true }
            ],
            shelters: [
              {
                id: "sh-way-01",
                name: "Kalpetta Town Hall Emergency Camp",
                lat: 11.608,
                lng: 76.082,
                capacity: 1100,
                currentOccupancy: 670,
                elevationMeters: 780,
                facilities: ["Landslide Safe Zone", "Medical Staff", "Oxygen Supply"],
                officer: "Dr. K. S. Mathew",
                phone: "+91 94470-33219"
              }
            ],
            routes: [
              {
                id: "rt-way-01",
                name: "Route A — Meppadi-Kalpetta Hill Bypass",
                type: "safe",
                distanceKm: 12.4,
                timeMins: 22,
                elevationRisk: "Low (Solid Rock Bed)",
                safetyScore: 95,
                hazards: [],
                targetShelter: "Kalpetta Town Hall Emergency Camp",
                waypoints: [
                  [11.554, 76.128],
                  [11.575, 76.105],
                  [11.608, 76.082]
                ]
              }
            ],
            languageAlerts: {
              en: "EXTREME FLASH FLOOD ALERT: Torrential surge detected at Chooralmala. Surge impact at Meppadi in 42 minutes. Evacuate immediately via Hill Bypass.",
              ml: "അതിതീവ്ര പ്രളയ മുന്നറിയിപ്പ്: ചൂരൽമലയിൽ കനത്ത മലവെള്ളപ്പാച്ചിൽ കണ്ടെത്തി. 42 മിനിറ്റിനുള്ളിൽ മേപ്പാടിയിൽ എത്തും. ഉടൻ ഹിൽ ബൈപാസ് വഴി കൽപ്പറ്റ ക്യാമ്പിലേക്ക് മാറുക.",
              hi: "अत्यधिक गंभीर अलर्ट: चूरलमाला में भीषण जलप्रवाह। 42 मिनट में मेप्पाडी में असर। तुरंत हिल बाईपास से कालपट्टा कैम्प जाएं।"
            }
          }
        ]
      }
    ]
  }
];

export function getVillageById(id) {
  for (const reg of REGIONS_DATA) {
    for (const dist of reg.districts) {
      for (const vil of dist.villages) {
        if (vil.id === id) {
          return { ...vil, state: reg.state, district: dist.name, stateCode: reg.stateCode };
        }
      }
    }
  }
  return REGIONS_DATA[0].districts[0].villages[0];
}
