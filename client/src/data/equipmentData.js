// Dummy data for farm equipment

const equipmentData = [
  {
    id: 1,
    name: "John Deere 5050D Tractor",
    type: "Tractor",
    category: "Tractor",
    image: "🚜",
    description: "50 HP tractor perfect for small to medium farms. Comes with power steering and multiple attachments.",
    owner: {
      id: 101,
      name: "Rajesh Kumar",
      rating: 4.8,
      location: "Punjab",
      verified: true,
      memberSince: "2023"
    },
    specs: {
      power: "50 HP",
      fuelType: "Diesel",
      year: 2022,
      hoursUsed: "450 hours"
    },
    pricing: {
      daily: 1500,
      weekly: 9000,
      monthly: 32000,
      securityDeposit: 5000
    },
    availability: {
      status: "available",
      nextAvailable: "Today",
      bookedDates: []
    },
    location: {
      district: "Ludhiana",
      state: "Punjab",
      distance: "12 km"
    },
    images: ["🚜", "⚙️", "🔧"],
    features: ["Power Steering", "AC Cabin", "GPS Enabled", "Multi-purpose"],
    rating: 4.8,
    totalReviews: 24,
    createdAt: "2026-01-15"
  },
  {
    id: 2,
    name: "Mahindra 8550 Harvester",
    type: "Harvester",
    category: "Harvester",
    image: "🌾",
    description: "Combine harvester for wheat, rice and other grains. High efficiency with minimal grain loss.",
    owner: {
      id: 102,
      name: "Priya Sharma",
      rating: 4.9,
      location: "Haryana",
      verified: true,
      memberSince: "2024"
    },
    specs: {
      power: "85 HP",
      fuelType: "Diesel",
      year: 2023,
      cuttingWidth: "4.5 m"
    },
    pricing: {
      daily: 3500,
      weekly: 21000,
      monthly: 75000,
      securityDeposit: 10000
    },
    availability: {
      status: "available",
      nextAvailable: "Tomorrow",
      bookedDates: ["2026-02-20", "2026-02-21"]
    },
    location: {
      district: "Karnal",
      state: "Haryana",
      distance: "25 km"
    },
    images: ["🌾", "⚙️", "🛞"],
    features: ["Auto Leveling", "Grain Tank 2.5T", "AC Cabin", "GPS"],
    rating: 4.9,
    totalReviews: 18,
    createdAt: "2026-01-20"
  },
  {
    id: 3,
    name: "5HP Water Pump Set",
    type: "Water Pump",
    category: "Pump",
    image: "💧",
    description: "High-capacity water pump for irrigation. Can handle large volumes with minimal power consumption.",
    owner: {
      id: 103,
      name: "Arun Patel",
      rating: 4.7,
      location: "UP",
      verified: true,
      memberSince: "2023"
    },
    specs: {
      power: "5 HP",
      type: "Submersible",
      maxHead: "50 m",
      flowRate: "500 L/min"
    },
    pricing: {
      daily: 500,
      weekly: 2800,
      monthly: 10000,
      securityDeposit: 2000
    },
    availability: {
      status: "rented",
      nextAvailable: "2026-02-18",
      bookedDates: ["2026-02-15", "2026-02-16", "2026-02-17"]
    },
    location: {
      district: "Agra",
      state: "UP",
      distance: "8 km"
    },
    images: ["💧", "⚙️", "🔌"],
    features: ["Energy Efficient", "Auto Start", "Overload Protection"],
    rating: 4.7,
    totalReviews: 12,
    createdAt: "2026-01-10"
  },
  {
    id: 4,
    name: "Rotavator 6 Feet",
    type: "Rotavator",
    category: "Tillage",
    image: "🔄",
    description: "Heavy-duty rotavator for soil preparation. Works well in all soil types.",
    owner: {
      id: 101,
      name: "Rajesh Kumar",
      rating: 4.8,
      location: "Punjab",
      verified: true,
      memberSince: "2023"
    },
    specs: {
      width: "6 ft",
      blades: "42",
      requiredPower: "45-60 HP",
      weight: "350 kg"
    },
    pricing: {
      daily: 800,
      weekly: 4500,
      monthly: 16000,
      securityDeposit: 3000
    },
    availability: {
      status: "available",
      nextAvailable: "Today",
      bookedDates: []
    },
    location: {
      district: "Ludhiana",
      state: "Punjab",
      distance: "12 km"
    },
    images: ["🔄", "⚙️", "🔧"],
    features: ["Heavy Duty", "Adjustable Depth", "Hardened Blades"],
    rating: 4.8,
    totalReviews: 9,
    createdAt: "2026-01-25"
  },
  {
    id: 5,
    name: "Sonalika 60 Tractor",
    type: "Tractor",
    category: "Tractor",
    image: "🚜",
    description: "60 HP tractor with advanced hydraulics. Ideal for heavy farming operations.",
    owner: {
      id: 104,
      name: "Gurpreet Singh",
      rating: 4.6,
      location: "Punjab",
      verified: false,
      memberSince: "2025"
    },
    specs: {
      power: "60 HP",
      fuelType: "Diesel",
      year: 2024,
      hoursUsed: "120 hours"
    },
    pricing: {
      daily: 1800,
      weekly: 10000,
      monthly: 35000,
      securityDeposit: 6000
    },
    availability: {
      status: "available",
      nextAvailable: "Tomorrow",
      bookedDates: []
    },
    location: {
      district: "Amritsar",
      state: "Punjab",
      distance: "35 km"
    },
    images: ["🚜", "⚙️", "🛞"],
    features: ["Power Steering", "Dual Clutch", "High Lift Capacity"],
    rating: 4.6,
    totalReviews: 7,
    createdAt: "2026-02-01"
  },
  {
    id: 6,
    name: "Laser Land Leveller",
    type: "Leveller",
    category: "Tillage",
    image: "📐",
    description: "Precision laser leveller for field leveling. Ensures perfect water distribution.",
    owner: {
      id: 105,
      name: "Suresh Reddy",
      rating: 4.9,
      location: "Telangana",
      verified: true,
      memberSince: "2023"
    },
    specs: {
      width: "8 ft",
      laserType: "Rotary",
      accuracy: "±2 cm",
      requiredPower: "60-75 HP"
    },
    pricing: {
      daily: 2500,
      weekly: 14000,
      monthly: 50000,
      securityDeposit: 8000
    },
    availability: {
      status: "rented",
      nextAvailable: "2026-02-22",
      bookedDates: ["2026-02-15", "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19", "2026-02-20", "2026-02-21"]
    },
    location: {
      district: "Hyderabad",
      state: "Telangana",
      distance: "45 km"
    },
    images: ["📐", "⚙️", "💡"],
    features: ["Auto Steering", "GPS Compatible", "Digital Display"],
    rating: 4.9,
    totalReviews: 15,
    createdAt: "2026-01-05"
  }
];

// My equipment listings (for the current user)
export const myEquipment = [
  {
    id: 101,
    name: "John Deere 5050D Tractor",
    type: "Tractor",
    image: "🚜",
    description: "50 HP tractor in excellent condition. Well maintained and serviced.",
    specs: {
      power: "50 HP",
      year: 2022,
      hoursUsed: "450 hours"
    },
    pricing: {
      daily: 1500,
      weekly: 9000,
      monthly: 32000,
      securityDeposit: 5000
    },
    availability: {
      status: "available",
      nextAvailable: "Today"
    },
    location: "Ludhiana, Punjab",
    earnings: {
      total: 45000,
      thisMonth: 12000,
      rentals: 8
    },
    currentBookings: [
      {
        id: 1001,
        renter: "Amit Kumar",
        startDate: "2026-02-10",
        endDate: "2026-02-12",
        totalAmount: 4500,
        status: "completed"
      },
      {
        id: 1002,
        renter: "Sunil Sharma",
        startDate: "2026-02-14",
        endDate: "2026-02-16",
        totalAmount: 4500,
        status: "active"
      }
    ],
    createdAt: "2026-01-15"
  },
  {
    id: 102,
    name: "Rotavator 6 Feet",
    type: "Rotavator",
    image: "🔄",
    description: "Heavy duty rotavator, perfect for soil preparation.",
    specs: {
      width: "6 ft",
      blades: "42",
      requiredPower: "45-60 HP"
    },
    pricing: {
      daily: 800,
      weekly: 4500,
      monthly: 16000,
      securityDeposit: 3000
    },
    availability: {
      status: "rented",
      nextAvailable: "2026-02-18"
    },
    location: "Ludhiana, Punjab",
    earnings: {
      total: 18000,
      thisMonth: 5600,
      rentals: 12
    },
    currentBookings: [
      {
        id: 1003,
        renter: "Rajesh Patel",
        startDate: "2026-02-15",
        endDate: "2026-02-17",
        totalAmount: 2400,
        status: "active"
      }
    ],
    createdAt: "2026-01-20"
  }
];

// Active bookings for the current user
export const myBookings = [
  {
    id: 2001,
    equipmentId: 2,
    equipmentName: "Mahindra 8550 Harvester",
    ownerName: "Priya Sharma",
    ownerLocation: "Karnal, Haryana",
    image: "🌾",
    startDate: "2026-02-20",
    endDate: "2026-02-21",
    totalDays: 2,
    totalAmount: 7000,
    securityDeposit: 10000,
    status: "upcoming",
    paymentStatus: "paid"
  },
  {
    id: 2002,
    equipmentId: 3,
    equipmentName: "5HP Water Pump Set",
    ownerName: "Arun Patel",
    ownerLocation: "Agra, UP",
    image: "💧",
    startDate: "2026-02-15",
    endDate: "2026-02-17",
    totalDays: 3,
    totalAmount: 1500,
    securityDeposit: 2000,
    status: "active",
    paymentStatus: "paid"
  },
  {
    id: 2003,
    equipmentId: 1,
    equipmentName: "John Deere 5050D Tractor",
    ownerName: "Rajesh Kumar",
    ownerLocation: "Ludhiana, Punjab",
    image: "🚜",
    startDate: "2026-02-10",
    endDate: "2026-02-12",
    totalDays: 3,
    totalAmount: 4500,
    securityDeposit: 5000,
    status: "completed",
    paymentStatus: "settled"
  }
];

export default equipmentData;