import { createClient } from 'redis';

class RedisDatabase {
  private static instance: RedisDatabase;

  private static client: ReturnType<typeof createClient>;

  private constructor() {}

  public static getInstance(): RedisDatabase {
    if (!RedisDatabase.instance) {
      RedisDatabase.instance = new RedisDatabase();
    }

    return RedisDatabase.instance;
  }

  public static async init() {
    const client = createClient({ url: 'redis://redis:6379' });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    this.client = client;
  }

  public async get(key: string) {
    if (RedisDatabase.client == null) {
      throw new Error('RedisDatabase: client must be initialized!');
    }

    return RedisDatabase.client.get(key);
  }

  public async set(key: string, value: string) {
    if (RedisDatabase.client == null) {
      throw new Error('RedisDatabase: client must be initialized!');
    }

    return RedisDatabase.client.set(key, value);
  }
}

export { RedisDatabase };
