const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Railway uses self-signed certificates
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3 // Retry connection up to 3 times
    }
  }
);

// Test the connection with better error handling
const connectDB = async () => {
  try {
    console.log("🔗 Connecting to database...");
    console.log(`📊 Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
    
    await sequelize.authenticate();
    console.log("✅ MySQL database connected successfully!");
    
    // Sync models with database
    // Use { alter: true } for development, but consider using migrations for production
    if (process.env.NODE_ENV === "production") {
      await sequelize.sync({ alter: false });
      console.log("✅ Database tables synchronized (no alterations in production)!");
    } else {
      await sequelize.sync({ alter: true });
      console.log("✅ Database tables synchronized with alterations!");
    }
    
    return sequelize;
  } catch (error) {
    console.error("❌ Unable to connect to the database:");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error errno:", error.errno);
    
    if (error.code === 'ECONNREFUSED') {
      console.error("💡 Tip: Check if your Railway database has Public Networking enabled and the host/port are correct");
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("💡 Tip: Check your database username and password");
    } else if (error.code === 'ENOTFOUND') {
      console.error("💡 Tip: Check your DB_HOST - it should be like 'interchange.proxy.rlwy.net'");
    } else if (error.message.includes('SSL')) {
      console.error("💡 Tip: SSL connection issue - verify SSL settings");
    }
    
    // Don't exit immediately in production, allow retries
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    } else {
      console.error("❌ Failed to connect to database. Will retry on next request...");
      // In production, we don't exit - the server will still start and retry connections
    }
  }
};

module.exports = { sequelize, connectDB };
