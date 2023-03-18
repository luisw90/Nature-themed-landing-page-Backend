import * as mongoDB from "mongodb";
require("dotenv").config();

const database = process.env.DATABASE;
const themeCollection = "Themes";
const usersCollection = "Users";

const password = process.env.PASSWORD;
const username = process.env.USERNAME;

type UserItem = {
  id: string;
  category: string;
  fact: string;
  image: string;
  themeid: string;
};

const dbPath = `mongodb+srv://${username}:${password}@myowncluster.yq33qsd.mongodb.net/?retryWrites=true&w=majority`;

const getThemeDb = async (themeid) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(themeCollection);
  const data = await col.find({ themeid: `${themeid}` }).toArray();
  await client.close();
  return data[0];
};

const getItemsDb = async (userid) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(usersCollection);
  const data = await col.find({ userid: `${userid}` }).toArray();
  await client.close();
  return data[0];
};

const saveItemDb = async (item: UserItem, userid: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(usersCollection);
  const data = await col.updateOne(
    { userid: `${userid}` },
    {
      $push: {
        saved: {
          id: item.id,
          category: item.category,
          fact: item.fact,
          image: item.image,
          themeid: item.themeid,
        },
      },
    }
  );
  await client.close();
  return data;
};

const deleteItemDb = async (userid: string, itemid: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(usersCollection);
  const data = await col.updateOne(
    { userid: `${userid}` },
    {
      $pull: {
        saved: {
          id: itemid,
        },
      },
    }
  );
  await client.close();
  return data;
};

export default {
  getThemeDb,
  saveItemDb,
  deleteItemDb,
  getItemsDb,
};
