import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PROJECT_PUBLIC_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage, account, ID };
