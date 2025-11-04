// import { faker } from '@faker-js/faker';
// import fs from 'fs';
 

// const categories = {
//   Topwear: ["T-Shirts", "Polo T-Shirts", "Casual Shirts", "Jackets", "Sweatshirts", "Hoodies", "Sweaters"],
//   Bottomwear: ["Jeans", "Track Pants", "Joggers", "Shorts"],
//   Ethnicwear: ["Kurtas", "Kurta Sets", "Dhoti Sets", "Sherwanis", "Nehru Jackets"],
//   Activewear: ["T-Shirts", "Jackets", "Sweatshirts", "Track Pants", "Shorts"],
//   Innerwear: ["Briefs", "Boxers", "Vests", "Pyjamas"],
//   Footwear: ["Casual Shoes", "Formal Shoes", "Sneakers", "Sports Shoes", "Flip Flops", "Loafers"]
// };

// const brands = ["UrbanFit", "Roadster", "Highlander", "H&M", "Levi's", "Puma", "Adidas", "Nike", "Zara", "US Polo"];
// const products = [];

// for (let i = 1; i <= 1000; i++) {
//   const mainCategory = faker.helpers.objectKey(categories);
//   const subCategory = faker.helpers.arrayElement(categories[mainCategory]);
//   const brand = faker.helpers.arrayElement(brands);
  
//   const product = {
//     id: i,
//     name: `${brand} ${subCategory}`,
//     brand,
//     category: mainCategory,
//     subcategory: subCategory,
//     price: faker.number.int({ min: 499, max: 5999 }),
//     rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
//     description: faker.commerce.productDescription(),
//     image: faker.image.urlLoremFlickr({ category: 'fashion' })
//   };

//   products.push(product);
// }

// fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
// console.log("✅ Generated 1000 sample products!");



// GenerateProducts.js
import { faker } from "@faker-js/faker";
import fs from "fs";

const categories = {
  Topwear: ["T-Shirts", "Polo T-Shirt", "Casual Shirts", "Jackets", "Sweatshirts", "Hoodies", "Sweaters"],
  Bottomwear: ["Jeans", "Track Pants", "Joggers", "Shorts"],
  Ethnicwear: ["Kurtas", "Kurta Sets", "Dhoti Sets", "Jodhpuri Pants", "Sherwanis", "Nehru Jackets", "Bandhgalas", "Bottoms"],
  Activewear: ["T-Shirts", "Jacket", "Sweatshirts", "Track Pants", "Joggers", "Shorts"],
  "Innerwear & Sleepwear": ["Briefs", "Trunks", "Boxers", "Vests", "Pyjamas & Sets", "Loungewear", "Thermals"],
  Footwear: ["Casual Shoes", "Formal Shoes", "Sneakers", "Sports Shoes", "Flip Flops & Sliders", "Boots", "Loafers", "Sandals"],
};

const brands = ["UrbanFit", "RoadRider", "EliteWear", "StyleHaven", "TrendBro", "Hooligns", "RowdyMen", "Classico", "Formano", "DenimCo"];

const generateProduct = (id) => {
  const categoryKeys = Object.keys(categories);
  const category = faker.helpers.arrayElement(categoryKeys);
  const subcategory = faker.helpers.arrayElement(categories[category]);
  const brand = faker.helpers.arrayElement(brands);
  const price = faker.number.int({ min: 499, max: 4999 });
  const rating = faker.number.float({ min: 3, max: 5, precision: 0.1 });
  const name = `${brand} ${subcategory} ${faker.commerce.productAdjective()}`;
  const description = faker.commerce.productDescription();
  const image = `https://source.unsplash.com/400x500/?men,${subcategory},fashion`;

  return {
    id,
    name,
    brand,
    price,
    rating,
    category,
    subcategory,
    description,
    image,
  };
};

// Generate 1000 products
const products = Array.from({ length: 1000 }, (_, i) => generateProduct(i + 1));

// Save to JSON
fs.writeFileSync("mens_fashion_products.json", JSON.stringify(products, null, 2));
console.log("✅ 1000 Men's Fashion Products generated successfully!");
