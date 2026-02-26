import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as userValidater from "../validation/user.validate.js";
import validate from "../middleware/validate.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route   POST /api/users/register
 * @desc    Register new user
 * @access  Public
 */
router.post(
  "/register",
  validate(userValidater.registerUserSchema),
  userController.registerUser,
);

/**
 * @route   POST /api/users/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  "/login",
  validate(userValidater.loginUserSchema),
  userController.loginUser,
);

/**
 * @route   GET /api/users/:id
 * @desc    Get current user by ID
 * @access  Private
 */
router.get(
  "/me",
  auth,
  validate(userValidater.getUserSchema),
  userController.getCurrentUser,
);

/**
 * @route   PATCH /api/users/:id
 * @desc    Update user
 * @access  Private
 */
router.patch(
  "/:id",
  auth,
  validate(userValidater.updateUserSchema),
  userController.updateUser,
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private
 */
router.delete(
  "/:id",
  auth,
  validate(userValidater.deleteUserSchema),
  userController.deleteUserById,
);

export default router;
