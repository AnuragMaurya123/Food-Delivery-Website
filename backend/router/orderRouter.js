import express from "express"
import { allOrder, placeOrder, placeOrderStripe, updateOrder, userOrder, verifyStripe } from "../controller/orderController.js";
import { authenticate, restrict } from "../middleware/auth.js";
const orderRouter=express.Router()
//admin router
orderRouter.post("/list",authenticate,restrict('admin'),allOrder)
orderRouter.post("/status",authenticate,restrict('admin'),updateOrder)

//payment router
orderRouter.post("/place",authenticate,placeOrder)
orderRouter.post("/stripe",authenticate,placeOrderStripe)

//user router
orderRouter.post("/userorders",authenticate,userOrder)

//verify payment
orderRouter.post("/verifystripe",authenticate,verifyStripe)

export default orderRouter 