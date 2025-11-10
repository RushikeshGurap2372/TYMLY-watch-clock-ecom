import mongoose from "mongoose";
import Product from "./models/Product.js";
import fs from "fs";

const products = JSON.parse(
  fs.readFileSync("data/products_2000.json", "utf-8")
);


const MONGO_URI = "mongodb+srv://rushi:Rushi%403006@cluster1.rsmuwwv.mongodb.net/tymly?retryWrites=true&w=majority&appName=Cluster1";

await mongoose.connect(MONGO_URI);
console.log("✅ Database Connected");

const batchSize = 200;
for (let i = 0; i < products.length; i += batchSize) {
  const batch = products.slice(i, i + batchSize);
  await Product.insertMany(batch);
  console.log(`✅ Inserted batch ${i / batchSize + 1}`);
}

await mongoose.disconnect();
console.log("🎉 All products inserted successfully!");
