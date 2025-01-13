import { Router } from "express";
import { createStripePaymentIntent, createTransaction } from "../controllers/transactionController";

const transactionRoute = Router();

transactionRoute.post("/", createTransaction)
transactionRoute.post("/stripe/payment-intent", createStripePaymentIntent);

export default transactionRoute;
