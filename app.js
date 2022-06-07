const fs = require("fs");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoDbUrl = "mongodb://localhost:27017/mpdb";

// read JSON files
const dataFile = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/test_db_data.json`, "utf-8")
);

const importData = () => {
  let _db;
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client.db();

      try {
        for (const key in dataFile) {
          _db
            .collection(key)
            .insertMany(dataFile[key])
            .then(() => console.log(`Document ${key} inserted...`))
            .catch((err) => console.log(err));
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => console.log(err));
};

importData();
