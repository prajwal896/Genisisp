import mongoose from 'mongoose';
import { seedProjects } from './seed.js';

// Cache the connection so serverless invocations (Vercel) reuse it.
const cache = globalThis._genisisMongo || (globalThis._genisisMongo = { conn: null, promise: null });

export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(process.env.MONGO_URI, { bufferCommands: false }).then(async (m) => {
      await seedProjects();
      return m;
    });
  }
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }
  return cache.conn;
}
