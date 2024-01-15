import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgot password routes
router.post("/forgot-password",forgotPasswordController);

//PROTECTED USER ROUTES
router.get('/user-auth',requireSignIn, (req,res) => {
  res.status(200).send({ok:true});
} )


//Protected ADMIN ROUTES
router.get('/admin-auth',requireSignIn,isAdmin, (req,res) => {
  res.status(200).send({ok:true});
} )

//update profile
router.put('/profile',requireSignIn,updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController);

//orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
