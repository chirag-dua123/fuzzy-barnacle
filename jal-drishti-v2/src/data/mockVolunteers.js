// Mock Volunteer and Emergency Resource Dispatch Database

export const MOCK_VOLUNTEERS = [
  {
    id: "vol-01",
    name: "Subhashis Barman",
    phone: "+91 98540-11234",
    distanceKm: 1.8,
    status: "available",
    role: "Boat Rescue Specialist",
    equipment: ["2x Inflatable Motor Boat", "10x Life Jackets", "Search Lights"],
    rating: 4.9,
    rescuesCompleted: 24,
    locationName: "Palasbari Ghat",
    badge: "NDRF Certified Civilian"
  },
  {
    id: "vol-02",
    name: "Dr. Deepali Sharma",
    phone: "+91 94350-77812",
    distanceKm: 2.4,
    status: "available",
    role: "Emergency Medical Responder",
    equipment: ["Trauma Kit", "Anti-Venom Vials", "Water Purification Tablets", "IV Fluids"],
    rating: 5.0,
    rescuesCompleted: 42,
    locationName: "Mirza Primary Health Center",
    badge: "Medical Corps Volunteer"
  },
  {
    id: "vol-03",
    name: "Biren Gogoi",
    phone: "+91 97060-44390",
    distanceKm: 3.1,
    status: "busy",
    role: "Heavy Vehicle & Evacuation Driver",
    equipment: ["4x4 Mahindra Tractor", "High-Clearance Trolley (Holds 25 People)"],
    rating: 4.8,
    rescuesCompleted: 18,
    locationName: "NH-27 Junction",
    badge: "Logistics Lead"
  },
  {
    id: "vol-04",
    name: "Hamidul Islam",
    phone: "+91 98640-33291",
    distanceKm: 4.0,
    status: "available",
    role: "Community Food & Clean Water Volunteer",
    equipment: ["500L Mobile Water Tank", "100x Dry Food Ration Packs"],
    rating: 4.9,
    rescuesCompleted: 31,
    locationName: "Amingaon Relief Staging Area",
    badge: "Red Cross Liaison"
  }
];

export const MOCK_ACTIVE_SOS = [
  {
    id: "sos-101",
    reportedAt: "5 mins ago",
    location: "Ward 4, Near Palasbari High School",
    peopleCount: 6,
    needs: ["Rescue Boat", "Infant Baby Milk", "First Aid"],
    urgency: "CRITICAL",
    contactPhone: "+91 98641-00293",
    status: "DISPATCHED",
    assignedVolunteer: "Subhashis Barman (Boat Specialist)"
  },
  {
    id: "sos-102",
    reportedAt: "12 mins ago",
    location: "Sualkuchi Riverside Lane",
    peopleCount: 3,
    needs: ["Elderly Wheelchair Transport", "Clean Drinking Water"],
    urgency: "HIGH",
    contactPhone: "+91 94351-22901",
    status: "IN_PROGRESS",
    assignedVolunteer: "Biren Gogoi (Tractor Logistics)"
  }
];
