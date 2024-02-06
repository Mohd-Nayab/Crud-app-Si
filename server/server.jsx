import axios from '../src/utils/axios';     // server.js


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import axios for your getProducts function

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema and Model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model('Product', productSchema);

// API Routes
// Define an API route to handle product updates
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title, image, description, category, price } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, image, description, category, price },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/products', async (req, res) => {
    const { title, image, price, category, description } = req.body;

    try {
        const newProduct = new Product({ title, image, price, category, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/products', async (req, res) => {
    // Your get products route logic here
});

const getProducts = async () => {
    try {
        const { data } = await axios("/api/products");
        console.log(data); // Log the data to the console
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getProducts();
}, []);

const startServer = async () => {
    try {
        await app.listen(PORT);
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
};

startServer();
