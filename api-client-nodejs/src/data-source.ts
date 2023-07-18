import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Client } from "./entities/Client";
import { Contact } from "./entities/Contact";
import { createEntities1679769931928 } from "./migrations/1679769931928-createEntities";

const setDataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = [Client, Contact]
    const migrationsPath = [createEntities1679769931928]
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: entitiesPath,
            migrations: migrationsPath,
        };
    }

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: entitiesPath,
        };
    }

    return {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: entitiesPath,
        migrations: migrationsPath,
    };
};

const dataSourceConfig = setDataSourceConfig();

export const AppDataSource = new DataSource(dataSourceConfig);
