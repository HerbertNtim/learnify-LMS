import {
  DynamoDBClient,
  DeleteTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import fs from "fs";
import path from "path";
import dynamoose from "dynamoose";
import pluralize from "pluralize";
import Transaction from "../models/transactionModel";
import Course from "../models/courseModel";
import UserCourseProgress from "../models/userCourseProgressModel";
import dotenv from "dotenv";

dotenv.config();
let client: DynamoDBClient;

/* DynamoDB Configuration */
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  dynamoose.aws.ddb.local();
  client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummyKey123",
      secretAccessKey: "dummyKey123",
    },
  });
} else {
  client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
  });
}

/* Suppress DynamoDB Tag Warnings */
const originalWarn = console.warn.bind(console);
console.warn = (message, ...args) => {
  if (!message.includes("Tagging is not currently supported in DynamoDB Local")) {
    originalWarn(message, ...args);
  }
};

async function createTables() {
  const models = [Transaction, UserCourseProgress, Course];

  for (const model of models) {
    const tableName = model.name;
    const table = new dynamoose.Table(tableName, [model], {
      create: true,
      update: true,
      waitForActive: true,
      throughput: { read: 5, write: 5 },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await table.initialize();
      console.log(`✅ Table created and initialized: ${tableName}`);
    } catch (error: any) {
      console.error(`❌ Error creating table ${tableName}:`, error.message, error.stack);
    }
  }
}

async function seedData(tableName: string, filePath: string) {
  const data: { [key: string]: any }[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const formattedTableName = pluralize.singular(
    tableName.charAt(0).toUpperCase() + tableName.slice(1)
  );

  console.log(`🌱 Seeding data to table: ${formattedTableName}`);

  for (const item of data) {
    try {
      await dynamoose.model(formattedTableName).create(item);
    } catch (err) {
      console.error(`❌ Unable to add item to ${formattedTableName}. Error:`, JSON.stringify(err, null, 2));
    }
  }

  console.log(`✅ Successfully seeded data to table: ${formattedTableName}`);
}

async function deleteTable(baseTableName: string) {
  let deleteCommand = new DeleteTableCommand({ TableName: baseTableName });
  console.log(`🗑️ Deleting table: ${baseTableName}`);
  try {
    await client.send(deleteCommand);
    console.log(`✅ Table deleted: ${baseTableName}`);
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException") {
      console.log(`⚠️ Table does not exist: ${baseTableName}`);
    } else {
      console.error(`❌ Error deleting table ${baseTableName}:`, err);
    }
  }
}

async function deleteAllTables() {
  const listTablesCommand = new ListTablesCommand({});
  const { TableNames } = await client.send(listTablesCommand);

  if (TableNames && TableNames.length > 0) {
    for (const tableName of TableNames) {
      await deleteTable(tableName);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }
}

export default async function seed() {
  await deleteAllTables();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await createTables();

  // ✅ Ensure the `data` directory exists before reading it
  const seedDataPath = path.resolve(__dirname, "./data");

  if (!fs.existsSync(seedDataPath)) {
    console.log(`⚠️ Data directory not found. Creating: ${seedDataPath}`);
    fs.mkdirSync(seedDataPath, { recursive: true });
  }

  // ✅ Debugging: Print directory contents
  console.log(`📂 Checking seed data directory: ${seedDataPath}`);
  const existingFiles = fs.readdirSync(path.dirname(seedDataPath));
  console.log(`📌 Available files in directory:`, existingFiles);

  const files = fs.readdirSync(seedDataPath).filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    console.warn("⚠️ No JSON files found in the seed data directory.");
    return;
  }

  for (const file of files) {
    const tableName = path.basename(file, ".json");
    const filePath = path.join(seedDataPath, file);
    console.log(`📄 Found seed file: ${filePath}`);
    await seedData(tableName, filePath);
  }
}

if (require.main === module) {
  seed().catch((error) => {
    console.error("❌ Failed to run seed script:", error);
  });
}
