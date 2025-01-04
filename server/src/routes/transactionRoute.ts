import { Router } from "express";
import { createStripePaymentIntent } from "../controllers/transactionController";

const transactionRoute = Router();

transactionRoute.post("/stripe/payment-intent", createStripePaymentIntent);

export default transactionRoute;
