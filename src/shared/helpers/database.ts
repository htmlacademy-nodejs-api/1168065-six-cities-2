type MongoURI = {
  username: string;
  password: string;
  host: string;
  port: string;
  dbName: string;
};

export function getMongoURI({
  username,
  password,
  host,
  port,
  dbName,
}: MongoURI): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
}
