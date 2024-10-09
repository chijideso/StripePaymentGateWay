const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
app.use(express.static('public'));
app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.get("/product", (req, res) => {
  const product = {
    name: "Example Product",
    description: "This is an example product description",
    price: 40000 , // in cents
    currency: "EUR",
    image: "/niceshoe.jpg" 
  };

  res.send(product);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const product = await getProductDetails(); // Get product details from database or API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price,
      currency: product.currency,
      automatic_payment_methods: { enabled: false },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);

var amount = 2000
// Helper function to get product details
async function getProductDetails() {
  // Replace with your own implementation to fetch product details from database or API
  return {
    name: "Example Product",
    description: "This is an example product description",
    price: amount * 100, // in cents
    currency: "EUR",
    image: "/niceshoe.jpg" 
  }
}