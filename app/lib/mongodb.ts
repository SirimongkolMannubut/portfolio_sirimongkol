import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://topt75870_db_user:exm51HOoHNGMtqC2@cluster0.yoeilwz.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0";

// Disable command buffering on serverless environments
mongoose.set("bufferCommands", false);

type GlobalMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: GlobalMongoose | undefined;
}

let cached: GlobalMongoose = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log("✅ Next.js connected to MongoDB Atlas");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
