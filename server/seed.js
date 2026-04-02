import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/ProductModel.js'; 

dotenv.config();

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsData = [
  // Phones
  { id: 1, productName: 'iPhone 15 Pro Max', price: 1199, category: 'phone', brand: 'Apple', company: 'Apple', os: 'iOS', quantity: 15, releaseYear: 2023, shortDescription: 'Titanium design, A17 Pro chip', longDescription: 'The iPhone 15 Pro Max features a strong and light aerospace-grade titanium design with a textured matte-glass back.' },
  { id: 2, productName: 'Galaxy S24 Ultra', price: 1299, category: 'phone', brand: 'Samsung', company: 'Samsung', os: 'Android', quantity: 20, releaseYear: 2024, shortDescription: 'Galaxy AI is here', longDescription: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.' },
  { id: 3, productName: 'Pixel 8 Pro', price: 999, category: 'phone', brand: 'Google', company: 'Google', os: 'Android', quantity: 10, releaseYear: 2023, shortDescription: 'The all-pro phone engineered by Google.', longDescription: 'Pixel 8 Pro is the all-pro phone engineered by Google. It is sleek, sophisticated, and powerful.' },
  { id: 4, productName: 'OnePlus 12', price: 799, category: 'phone', brand: 'OnePlus', company: 'OnePlus', os: 'Android', quantity: 12, releaseYear: 2024, shortDescription: 'Smooth Beyond Belief', longDescription: 'The OnePlus 12 combines a fast and smooth experience with advanced Hasselblad cameras.' }];

//   // Laptops
//   { id: 5, productName: 'MacBook Pro M3', price: 1599, category: 'laptops', brand: 'Apple', company: 'Apple', os: 'macOS', quantity: 8, releaseYear: 2023, shortDescription: 'Mind-blowing. Head-turning.', longDescription: 'MacBook Pro blasts forward with the M3, M3 Pro, and M3 Max chips. Built on 3-nanometer technology.' },
//   { id: 6, productName: 'Dell XPS 15', price: 1499, category: 'laptops', brand: 'Dell', company: 'Dell', os: 'Windows', quantity: 14, releaseYear: 2023, shortDescription: 'Stunning display, powerful performance.', longDescription: 'The XPS 15 is the perfect balance of power and portability with an immersive OLED display.' },
//   { id: 7, productName: 'ThinkPad X1 Carbon', price: 1399, category: 'laptops', brand: 'Lenovo', company: 'Lenovo', os: 'Windows', quantity: 25, releaseYear: 2023, shortDescription: 'Ultralight powerhouse.', longDescription: 'The ThinkPad X1 Carbon Gen 11 continues to deliver the ultimate business laptop experience.' },
//   { id: 8, productName: 'ROG Zephyrus G14', price: 1699, category: 'laptops', brand: 'ASUS', company: 'ASUS', os: 'Windows', quantity: 5, releaseYear: 2024, shortDescription: 'World\'s most powerful 14-inch gaming laptop.', longDescription: 'Game or create anywhere with the ROG Zephyrus G14 featuring an AMD Ryzen processor and NVIDIA GPU.' },

//   // Watches
//   { id: 9, productName: 'Apple Watch Series 9', price: 399, category: 'watches', brand: 'Apple', company: 'Apple', os: 'watchOS', quantity: 30, releaseYear: 2023, shortDescription: 'Smarter. Brighter. Mightier.', longDescription: 'Apple Watch Series 9 helps you stay connected, active, healthy, and safe.' },
//   { id: 10, productName: 'Galaxy Watch 6 Classic', price: 399, category: 'watches', brand: 'Samsung', company: 'Samsung', os: 'Wear OS', quantity: 22, releaseYear: 2023, shortDescription: 'The smartwatch with a classic spin.', longDescription: 'Track your workouts, sleep, and heart rate with the stylish Galaxy Watch 6 Classic.' },
//   { id: 11, productName: 'Fenix 7 Pro', price: 799, category: 'watches', brand: 'Garmin', company: 'Garmin', os: 'Garmin OS', quantity: 7, releaseYear: 2023, shortDescription: 'Multisport GPS smartwatch.', longDescription: 'The ultimate multisport GPS smartwatch with solar charging and advanced performance metrics.' },
//   { id: 12, productName: 'Pixel Watch 2', price: 349, category: 'watches', brand: 'Google', company: 'Google', os: 'Wear OS', quantity: 18, releaseYear: 2023, shortDescription: 'Help by Google. Health by Fitbit.', longDescription: 'The Pixel Watch 2 comes with the best of Google and Fitbit integrations.' },

//   // Tablets
//   { id: 13, productName: 'iPad Pro 12.9', price: 1099, category: 'tablets', brand: 'Apple', company: 'Apple', os: 'iPadOS', quantity: 12, releaseYear: 2022, shortDescription: 'Supercharged by M2.', longDescription: 'Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity.' },
//   { id: 14, productName: 'Galaxy Tab S9 Ultra', price: 1199, category: 'tablets', brand: 'Samsung', company: 'Samsung', os: 'Android', quantity: 9, releaseYear: 2023, shortDescription: 'The new standard of premium tablets.', longDescription: 'Experience crystal-clear visuals on the massive Dynamic AMOLED 2X display.' },
//   { id: 15, productName: 'Surface Pro 9', price: 999, category: 'tablets', brand: 'Microsoft', company: 'Microsoft', os: 'Windows', quantity: 15, releaseYear: 2022, shortDescription: 'Tablet versatility, laptop power.', longDescription: 'Surface Pro 9 gives you the tablet flexibility you want and the laptop performance you need.' },
//   { id: 16, productName: 'Lenovo Tab P12 Pro', price: 699, category: 'tablets', brand: 'Lenovo', company: 'Lenovo', os: 'Android', quantity: 20, releaseYear: 2022, shortDescription: 'Cinematic AMOLED display.', longDescription: 'Enjoy an uncompromised entertainment experience with a brilliant AMOLED screen.' },

//   // Headphones
//   { id: 17, productName: 'WH-1000XM5', price: 398, category: 'headphones', brand: 'Sony', company: 'Sony', os: 'N/A', quantity: 40, releaseYear: 2022, shortDescription: 'Industry leading noise canceling.', longDescription: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening.' },
//   { id: 18, productName: 'AirPods Max', price: 549, category: 'headphones', brand: 'Apple', company: 'Apple', os: 'N/A', quantity: 15, releaseYear: 2020, shortDescription: 'A radically original composition.', longDescription: 'AirPods Max combine high-fidelity audio with industry-leading Active Noise Cancellation.' },
//   { id: 19, productName: 'QuietComfort Ultra', price: 429, category: 'headphones', brand: 'Bose', company: 'Bose', os: 'N/A', quantity: 25, releaseYear: 2023, shortDescription: 'Spatial audio earbuds.', longDescription: 'World-class noise cancellation, quieter than ever before. Breakthrough spatialized audio.' },
//   { id: 20, productName: 'Momentum 4', price: 379, category: 'headphones', brand: 'Sennheiser', company: 'Sennheiser', os: 'N/A', quantity: 18, releaseYear: 2022, shortDescription: 'Superior sound.', longDescription: 'Discover best-in-class sound with the Sennheiser Momentum 4 Wireless.' },

//   // PC
//   { id: 21, productName: 'Alienware Aurora R15', price: 2299, category: 'pc', brand: 'Dell', company: 'Dell', os: 'Windows', quantity: 4, releaseYear: 2023, shortDescription: 'Elite gaming desktop.', longDescription: 'Experience incredible performance with the latest processors and graphics inside the Aurora R15.' },
//   { id: 22, productName: 'OMEN 45L', price: 1999, category: 'pc', brand: 'HP', company: 'HP', os: 'Windows', quantity: 6, releaseYear: 2023, shortDescription: 'Extreme cooling, extreme performance.', longDescription: 'Built for extreme performance, the OMEN 45L Gaming Desktop PC is designed for gaming from the ground up.' },
//   { id: 23, productName: 'Vengeance i7400', price: 2499, category: 'pc', brand: 'Corsair', company: 'Corsair', os: 'Windows', quantity: 3, releaseYear: 2023, shortDescription: 'Step up your game.', longDescription: 'A powerful gaming PC built with award-winning Corsair components.' },
//   { id: 24, productName: 'Gamer Supreme', price: 1599, category: 'pc', brand: 'CyberPowerPC', company: 'CyberPowerPC', os: 'Windows', quantity: 10, releaseYear: 2024, shortDescription: 'Liquid cooled gaming rig.', longDescription: 'The Gamer Supreme Liquid Cool series features monstrous processing power combined with advanced liquid cooling.' }
// ];

// Helper function to simulate multer upload
const processImagesForProduct = (productId) => {
    const finalImagePaths = [];
    const tempDir = path.join(__dirname, 'seed-images');
    const uploadsDir = path.join(__dirname, 'uploads');

    // Check if the source directory exists
    if (!fs.existsSync(tempDir)) {
        console.log(`Error: Source directory does not exist at path: ${tempDir}`);
        return finalImagePaths;
    }

    // Create the uploads directory if it does not exist
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    for (let i = 1; i <= 3; i++) {
        // Supported extensions including uppercase variations
        const extensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];
        let sourcePath = '';
        let extFound = '';

        for (const ext of extensions) {
            const potentialPath = path.join(tempDir, `${productId}-${i}${ext}`);
            if (fs.existsSync(potentialPath)) {
                sourcePath = potentialPath;
                extFound = ext;
                break;
            }
        }

        if (sourcePath) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newFilename = `images-${uniqueSuffix}${extFound.toLowerCase()}`;
            const destPath = path.join(uploadsDir, newFilename);

            fs.copyFileSync(sourcePath, destPath);
            finalImagePaths.push(`/uploads/${newFilename}`);
            console.log(`Success: ${productId}-${i}${extFound} copied to ${newFilename}`);
        } else {
            console.log(`Missing: Could not find image ${productId}-${i} in any format in directory ${tempDir}`);
        }
    }

    return finalImagePaths;
};

const seedProducts = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to Database');

        await Product.deleteMany();
        console.log('Cleared existing products');

        const formattedProducts = productsData.map((item) => {
            const images = processImagesForProduct(item.id);

            return {
                productName: item.productName,
                shortDescription: item.shortDescription,
                longDescription: item.longDescription,
                price: item.price,
                quantity: item.quantity,
                releaseYear: item.releaseYear,
                brand: item.brand,
                company: item.company,
                os: item.os,
                category: item.category,
                productImages: images,
                image: images[0] || '' // Fallback if no images found
            };
        });

        await Product.insertMany(formattedProducts);
        console.log('Successfully inserted 24 products and processed images!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error with seed data:', error);
        process.exit(1);
    }
};

seedProducts();