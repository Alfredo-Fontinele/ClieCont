import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "reflect-metadata";
import "dotenv/config";
import { Client } from "./entities/Client";
import { Contact } from "./entities/Contact";
import { createEntities1679769931928 } from "../src/migrations/1679769931928-createEntities";

const setDataSourceConfig = (): DataSourceOptions => {
    const entities = [Contact, Client];
    const migrations = [createEntities1679769931928];
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: entities,
            migrations: migrations,
        };
    }

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: entities,
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
        entities: entities,
        migrations: migrations,
    };
};

const dataSourceConfig = setDataSourceConfig();

export const AppDataSource = new DataSource(dataSourceConfig);
