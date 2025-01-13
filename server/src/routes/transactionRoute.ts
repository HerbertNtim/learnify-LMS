import { Router } from "express";
import { createStripePaymentIntent, createTransaction, listTransactions } from "../controllers/transactionController";

const transactionRoute = Router();

transactionRoute.post("/", createTransaction)
transactionRoute.get("/", listTransactions);
transactionRoute.post("/stripe/payment-intent", createStripePaymentIntent);

export default transactionRoute;
