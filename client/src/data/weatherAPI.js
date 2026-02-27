// Free OpenWeatherMap API helper
// Sign up at https://openweathermap.org/api to get your free API key

// For demo purposes, we'll use dummy data first
// Replace with actual API call later

const API_KEY = "YOUR_API_KEY_HERE"; // You'll get this from OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Dummy weather data for different locations in India
const dummyWeatherData = {
  "Punjab": {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    icon: "☁️",
    forecast: [
      { day: "Mon", temp: 30, icon: "☀️" },
      { day: "Tue", temp: 29, icon: "☁️" },
      { day: "Wed", temp: 27, icon: "🌧️" },
      { day: "Thu", temp: 28, icon: "☁️" },
      { day: "Fri", temp: 31, icon: "☀️" }
    ]
  },
  "Haryana": {
    temp: 29,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 10,
    icon: "☀️",
    forecast: [
      { day: "Mon", temp: 31, icon: "☀️" },
      { day: "Tue", temp: 30, icon: "☀️" },
      { day: "Wed", temp: 28, icon: "☁️" },
      { day: "Thu", temp: 29, icon: "☀️" },
      { day: "Fri", temp: 32, icon: "☀️" }
    ]
  },
  "UP": {
    temp: 32,
    condition: "Hot",
    humidity: 55,
    windSpeed: 8,
    icon: "☀️",
    forecast: [
      { day: "Mon", temp: 33, icon: "☀️" },
      { day: "Tue", temp: 34, icon: "☀️" },
      { day: "Wed", temp: 32, icon: "☀️" },
      { day: "Thu", temp: 31, icon: "☁️" },
      { day: "Fri", temp: 30, icon: "☁️" }
    ]
  },
  "Maharashtra": {
    temp: 30,
    condition: "Humid",
    humidity: 75,
    windSpeed: 15,
    icon: "☁️",
    forecast: [
      { day: "Mon", temp: 31, icon: "☁️" },
      { day: "Tue", temp: 30, icon: "🌧️" },
      { day: "Wed", temp: 29, icon: "🌧️" },
      { day: "Thu", temp: 30, icon: "☁️" },
      { day: "Fri", temp: 32, icon: "☀️" }
    ]
  },
  "Karnataka": {
    temp: 27,
    condition: "Rainy",
    humidity: 82,
    windSpeed: 18,
    icon: "🌧️",
    forecast: [
      { day: "Mon", temp: 26, icon: "🌧️" },
      { day: "Tue", temp: 27, icon: "🌧️" },
      { day: "Wed", temp: 28, icon: "☁️" },
      { day: "Thu", temp: 29, icon: "☀️" },
      { day: "Fri", temp: 30, icon: "☀️" }
    ]
  }
};

// Function to get weather data for a location
export const getWeatherData = (location) => {
  // Return dummy data for the location, or default to Punjab
  return dummyWeatherData[location] || dummyWeatherData["Punjab"];
};

// Function to get farming advice based on weather
export const getFarmingAdvice = (weatherData) => {
  const advice = [];
  const temp = weatherData.temp;
  const condition = weatherData.condition;
  const humidity = weatherData.humidity;
  const forecast = weatherData.forecast;

  // Check for rain in forecast
  const hasRainSoon = forecast.some(day => day.icon === "🌧️" || day.icon === "☁️");

  // Temperature based advice
  if (temp > 35) {
    advice.push({
      type: "warning",
      icon: "⚠️",
      title: "High Temperature Alert",
      description: "Avoid working during peak heat hours (12-4 PM). Ensure adequate irrigation."
    });
  } else if (temp < 15) {
    advice.push({
      type: "info",
      icon: "❄️",
      title: "Low Temperature",
      description: "Protect sensitive crops from cold. Delay sowing if possible."
    });
  }

  // Rain based advice
  if (hasRainSoon) {
    advice.push({
      type: "success",
      icon: "🌧️",
      title: "Rain Expected",
      description: "Delay irrigation. Good time for fertilizer application before rain."
    });
  } else {
    advice.push({
      type: "info",
      icon: "💧",
      title: "Irrigation Needed",
      description: "No rain in forecast. Schedule irrigation for next 2-3 days."
    });
  }

  // Humidity based advice
  if (humidity > 80) {
    advice.push({
      type: "warning",
      icon: "💦",
      title: "High Humidity",
      description: "Watch for fungal diseases. Ensure good air circulation."
    });
  } else if (humidity < 40) {
    advice.push({
      type: "warning",
      icon: "🔥",
      title: "Low Humidity",
      description: "Increase irrigation frequency. Monitor for pest attacks."
    });
  }

  // General advice based on condition
  if (condition.includes("Rain")) {
    advice.push({
      type: "info",
      icon: "☔",
      title: "Rainy Day",
      description: "Good day for planning and indoor tasks. Avoid pesticide spraying."
    });
  } else if (condition.includes("Sunny") || condition.includes("Clear")) {
    advice.push({
      type: "success",
      icon: "☀️",
      title: "Sunny Day",
      description: "Perfect for harvesting. Apply pesticides if needed."
    });
  }

  return advice;
};

// Function to get crop-specific irrigation tips
export const getIrrigationTips = (crop, weatherData) => {
  const tips = {
    "Wheat": {
      waterNeeded: "25-30 mm/week",
      frequency: "Every 5-7 days",
      bestTime: "Early morning (5-7 AM)",
      method: "Flood irrigation or sprinkler"
    },
    "Rice": {
      waterNeeded: "50-60 mm/week",
      frequency: "Every 3-4 days",
      bestTime: "Morning or evening",
      method: "Flood irrigation (maintain standing water)"
    },
    "Onion": {
      waterNeeded: "20-25 mm/week",
      frequency: "Every 4-5 days",
      bestTime: "Early morning",
      method: "Drip irrigation recommended"
    },
    "Tomato": {
      waterNeeded: "25-30 mm/week",
      frequency: "Every 3-4 days",
      bestTime: "Morning",
      method: "Drip irrigation best"
    },
    "Potato": {
      waterNeeded: "30-35 mm/week",
      frequency: "Every 5-6 days",
      bestTime: "Morning",
      method: "Sprinkler or furrow"
    },
    "Cotton": {
      waterNeeded: "40-45 mm/week",
      frequency: "Every 7-8 days",
      bestTime: "Evening",
      method: "Drip or furrow"
    },
    "Maize": {
      waterNeeded: "35-40 mm/week",
      frequency: "Every 5-6 days",
      bestTime: "Morning",
      method: "Sprinkler recommended"
    },
    "Sugarcane": {
      waterNeeded: "60-70 mm/week",
      frequency: "Every 4-5 days",
      bestTime: "Morning",
      method: "Furrow irrigation"
    }
  };

  return tips[crop] || {
    waterNeeded: "Check soil moisture",
    frequency: "Monitor daily",
    bestTime: "Early morning",
    method: "Based on crop type"
  };
};