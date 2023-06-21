const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51NKpmoIT6PnnCmJ0e" +
"Y1VpiOYt8PNo2QBdgFd7fKLxEu3tiuWmcxRNJgZ0ToL1SOGNkMXfyl856FSA" +
"4IstQ6tWFsj00Q8Qi51Eg");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received for >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/clone-f93da/us-central1/api
