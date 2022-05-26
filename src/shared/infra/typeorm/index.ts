import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DATABASE_LOCAL === "test" ? "localhost" : host,
      database:
        process.env.DATABASE_LOCAL === "test"
          ? "rentx_test"
          : defaultOptions.database,
    }),
  );
};
