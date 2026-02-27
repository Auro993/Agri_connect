// Dummy disease data for AI Crop Doctor

export const diseaseDatabase = {
  "Wheat": [
    {
      id: "wheat_rust",
      name: "Wheat Rust",
      scientificName: "Puccinia triticina",
      description: "A fungal disease that appears as reddish-brown pustules on leaves and stems.",
      symptoms: [
        "Reddish-brown pustules on leaves",
        "Orange-colored spores on leaf surface",
        "Yellowing of leaves",
        "Stunted plant growth",
        "Reduced grain quality"
      ],
      treatment: {
        organic: [
          "Apply neem oil spray (5ml per liter water)",
          "Use sulfur-based fungicides",
          "Remove and destroy infected leaves",
          "Crop rotation with non-host crops"
        ],
        chemical: [
          "Apply fungicides like Propiconazole (1ml/L)",
          "Tebuconazole spray at first sign",
          "Mancozeb (2g/L) as preventive measure"
        ],
        prevention: [
          "Plant resistant varieties",
          "Avoid dense planting",
          "Proper field sanitation",
          "Balanced fertilization"
        ]
      },
      images: ["🌾", "🔴", "🍂"],
      confidence: 92,
      severity: "moderate",
      affectedParts: ["leaves", "stems"],
      season: ["spring", "summer"],
      region: ["North India", "Punjab", "Haryana"]
    },
    {
      id: "wheat_powdery_mildew",
      name: "Powdery Mildew",
      scientificName: "Blumeria graminis",
      description: "White powdery growth on leaves and stems, common in humid conditions.",
      symptoms: [
        "White powdery spots on leaves",
        "Leaves turn yellow and dry",
        "Stunted plant growth",
        "Reduced photosynthesis"
      ],
      treatment: {
        organic: [
          "Apply sulfur powder",
          "Milk spray (1:9 ratio with water)",
          "Baking soda solution",
          "Neem oil application"
        ],
        chemical: [
          "Triadimefon fungicide",
          "Propiconazole spray",
          "Hexaconazole application"
        ],
        prevention: [
          "Ensure good air circulation",
          "Avoid overhead irrigation",
          "Plant resistant varieties",
          "Proper spacing between plants"
        ]
      },
      images: ["🌾", "⚪", "🌫️"],
      confidence: 88,
      severity: "mild",
      affectedParts: ["leaves", "stems"],
      season: ["spring", "fall"],
      region: ["All India"]
    }
  ],
  
  "Rice": [
    {
      id: "rice_blast",
      name: "Rice Blast",
      scientificName: "Magnaporthe oryzae",
      description: "Fungal disease causing diamond-shaped lesions on leaves and neck blast.",
      symptoms: [
        "Diamond-shaped spots on leaves",
        "Gray centers with brown borders",
        "Lesions on leaf collar",
        "Rotting at base of panicle",
        "Empty or partially filled grains"
      ],
      treatment: {
        organic: [
          "Apply silica to strengthen cell walls",
          "Neem cake application",
          "Trichoderma bio-control agent",
          "Burn infected crop residues"
        ],
        chemical: [
          "Tricyclazole fungicide",
          "Carbendazim spray",
          "Edifenphos application"
        ],
        prevention: [
          "Use resistant varieties",
          "Avoid excess nitrogen",
          "Maintain proper spacing",
          "Balance irrigation"
        ]
      },
      images: ["🌾", "🔷", "⚫"],
      confidence: 94,
      severity: "severe",
      affectedParts: ["leaves", "panicle", "stems"],
      season: ["monsoon"],
      region: ["All rice growing areas"]
    },
    {
      id: "rice_bacterial_blight",
      name: "Bacterial Leaf Blight",
      scientificName: "Xanthomonas oryzae",
      description: "Bacterial disease causing yellow to white lesions along leaf margins.",
      symptoms: [
        "Yellow to white streaks along leaf veins",
        "Wilting of leaves",
        "Milky bacterial ooze from cut leaves",
        "Leaves dry and turn grayish"
      ],
      treatment: {
        organic: [
          "Copper oxychloride spray",
          "Streptocycline application",
          "Neem oil with garlic extract"
        ],
        chemical: [
          "Copper-based bactericides",
          "Streptomycin sulfate",
          "Validamycin application"
        ],
        prevention: [
          "Avoid wounding plants",
          "Use certified seeds",
          "Field sanitation",
          "Avoid flood irrigation"
        ]
      },
      images: ["🌾", "💛", "💧"],
      confidence: 87,
      severity: "moderate",
      affectedParts: ["leaves"],
      season: ["monsoon", "summer"],
      region: ["All India"]
    }
  ],
  
  "Tomato": [
    {
      id: "tomato_early_blight",
      name: "Early Blight",
      scientificName: "Alternaria solani",
      description: "Fungal disease causing dark spots with concentric rings on leaves.",
      symptoms: [
        "Dark brown spots with concentric rings",
        "Yellowing around spots",
        "Leaf drop",
        "Stem lesions",
        "Fruit rot near stem"
      ],
      treatment: {
        organic: [
          "Copper fungicide spray",
          "Baking soda solution",
          "Neem oil application",
          "Remove infected leaves"
        ],
        chemical: [
          "Chlorothalonil fungicide",
          "Mancozeb spray",
          "Azoxystrobin application"
        ],
        prevention: [
          "Mulch around plants",
          "Proper plant spacing",
          "Avoid overhead watering",
          "Crop rotation"
        ]
      },
      images: ["🍅", "⚫", "🎯"],
      confidence: 91,
      severity: "moderate",
      affectedParts: ["leaves", "stems", "fruits"],
      season: ["spring", "summer"],
      region: ["All India"]
    },
    {
      id: "tomato_late_blight",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      description: "Devastating disease causing water-soaked lesions on leaves and fruits.",
      symptoms: [
        "Water-soaked spots on leaves",
        "White mold on undersides",
        "Dark brown lesions on fruits",
        "Rapid wilting",
        "Rotting smell"
      ],
      treatment: {
        organic: [
          "Copper hydroxide spray",
          "Bacillus subtilis",
          "Garlic extract",
          "Remove infected plants immediately"
        ],
        chemical: [
          "Metalaxyl fungicide",
          "Mancozeb + Metalaxyl",
          "Cymoxanil application"
        ],
        prevention: [
          "Resistant varieties",
          "Good air circulation",
          "Avoid wet foliage",
          "Early planting"
        ]
      },
      images: ["🍅", "💧", "🤍"],
      confidence: 93,
      severity: "severe",
      affectedParts: ["leaves", "fruits", "stems"],
      season: ["monsoon", "winter"],
      region: ["All India"]
    }
  ],
  
  "Potato": [
    {
      id: "potato_late_blight",
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      description: "Severe disease causing dark lesions on leaves and tuber rot.",
      symptoms: [
        "Dark brown lesions on leaves",
        "White fungal growth on undersides",
        "Brown patches on tubers",
        "Tuber rot in storage"
      ],
      treatment: {
        organic: [
          "Copper oxychloride",
          "Remove infected plants",
          "Avoid planting infected tubers"
        ],
        chemical: [
          "Metalaxyl fungicide",
          "Mancozeb spray",
          "Chlorothalonil application"
        ],
        prevention: [
          "Use certified seed",
          "Good soil drainage",
          "Avoid overhead irrigation",
          "Harvest in dry conditions"
        ]
      },
      images: ["🥔", "🤎", "🌧️"],
      confidence: 92,
      severity: "severe",
      affectedParts: ["leaves", "tubers"],
      season: ["monsoon", "winter"],
      region: ["All India"]
    }
  ],
  
  "Onion": [
    {
      id: "onion_purple_blotch",
      name: "Purple Blotch",
      scientificName: "Alternaria porri",
      description: "Fungal disease causing purple lesions on leaves and stems.",
      symptoms: [
        "Small water-soaked lesions",
        "Purple to brown spots",
        "Yellow halos around spots",
        "Leaf dieback",
        "Reduced bulb size"
      ],
      treatment: {
        organic: [
          "Neem oil spray",
          "Copper fungicide",
          "Remove infected leaves"
        ],
        chemical: [
          "Mancozeb fungicide",
          "Chlorothalonil",
          "Azoxystrobin application"
        ],
        prevention: [
          "Good air circulation",
          "Proper spacing",
          "Avoid overhead watering",
          "Crop rotation"
        ]
      },
      images: ["🧅", "💜", "🍂"],
      confidence: 86,
      severity: "moderate",
      affectedParts: ["leaves"],
      season: ["monsoon"],
      region: ["All India"]
    }
  ]
};

// Sample scan history data
export const sampleScans = [
  {
    id: 1001,
    date: "2026-02-10",
    time: "10:30 AM",
    crop: "Wheat",
    disease: "Wheat Rust",
    confidence: 94,
    severity: "moderate",
    image: "🌾",
    status: "treated",
    notes: "Applied fungicide, improving",
    location: "Punjab"
  },
  {
    id: 1002,
    date: "2026-02-08",
    time: "3:45 PM",
    crop: "Tomato",
    disease: "Early Blight",
    confidence: 89,
    severity: "mild",
    image: "🍅",
    status: "monitoring",
    notes: "Removed affected leaves",
    location: "Haryana"
  },
  {
    id: 1003,
    date: "2026-02-05",
    time: "9:15 AM",
    crop: "Rice",
    disease: "Rice Blast",
    confidence: 96,
    severity: "severe",
    image: "🌾",
    status: "treated",
    notes: "Chemical spray applied",
    location: "Telangana"
  },
  {
    id: 1004,
    date: "2026-02-01",
    time: "11:20 AM",
    crop: "Potato",
    disease: "Late Blight",
    confidence: 91,
    severity: "moderate",
    image: "🥔",
    status: "recovered",
    notes: "Treatment successful",
    location: "UP"
  },
  {
    id: 1005,
    date: "2026-01-28",
    time: "2:30 PM",
    crop: "Onion",
    disease: "Purple Blotch",
    confidence: 84,
    severity: "mild",
    image: "🧅",
    status: "monitoring",
    notes: "Early stage, watching closely",
    location: "Maharashtra"
  },
  {
    id: 1006,
    date: "2026-01-25",
    time: "4:10 PM",
    crop: "Wheat",
    disease: "Powdery Mildew",
    confidence: 88,
    severity: "mild",
    image: "🌾",
    status: "recovered",
    notes: "Organic treatment worked",
    location: "Punjab"
  }
];

// Function to analyze crop image (simulated AI)
export const analyzeCropImage = (cropType, imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get diseases for the crop
      const diseases = diseaseDatabase[cropType] || diseaseDatabase["Wheat"];
      
      // Randomly select a disease (in real app, AI would analyze)
      const randomIndex = Math.floor(Math.random() * diseases.length);
      const disease = diseases[randomIndex];
      
      // Generate random confidence between 75-98%
      const confidence = Math.floor(Math.random() * 23) + 75;
      
      // Generate scan result
      const result = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        crop: cropType,
        disease: disease.name,
        scientificName: disease.scientificName,
        description: disease.description,
        confidence: confidence,
        severity: disease.severity,
        symptoms: disease.symptoms.slice(0, 3),
        treatment: disease.treatment,
        affectedParts: disease.affectedParts,
        image: disease.images[0],
        status: "pending"
      };
      
      resolve(result);
    }, 2000); // Simulate AI processing time
  });
};

export default diseaseDatabase;