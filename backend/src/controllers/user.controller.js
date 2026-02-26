import asyncHandler from "../utils/asyncHandler.js";
import * as userService from "../services/user.service.js";

/**
 * @desc    Create new User
 * @route   POST /user/signup
 * @access  Public
 */

export const registerUser = asyncHandler(async (req, res) => {

    const user = await userService.createUserService(req.body);

    res.status(201).json({
        success: true,
        data: user,
    });
});

/**
 * @desc    user login
 * @route   POST /user/login
 * @access  Public
 */

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.findUserByEmailService(email);

    if(!user){
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await userService.verifyPasswordService(
        password,
        user.password,
    );

    if(!isPasswordValid){
        throw new AppError("Invalid Password", 401);
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "24h"
        }
    );

    const safeUser = {
        name: user.name,
        email: user.email
    };

    res.status(200).json({
        success: true,
        data: {
            user: safeUser,
            token,
        }
    });
});

/**
 * @desc    find user by ID
 * @route   GET /user/me
 * @access  Public
 */

export const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await userService.findUserByIdService(req.user?.id);

    res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * @desc    get all users
 * @route   GET /user/all
 * @access  Admin
 */

export const getAllUsers = asyncHandler(async (req, res) => {
    
    const users = await userService.getAllUsersService();

    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * @desc    verify password
 * @route   POST /user/verify
 * @access  Public
 */

export const verifyPassword = asyncHandler(async (req, res) => {

    const { password } = req.body;
    const hashPassword  = await userService.getUserPasswordHashService(req.user.id);

    const verification = await userService.verifyPasswordService(
        password,
        hashPassword,
    );

    res.status(200).json({
        success: verification,
    });

});

/**
 * @desc    delete User
 * @route   DELETE /user/delete
 * @access  Public
 */

export const deleteUserById = asyncHandler(async (req, res) => {

    const deleted = await userService.deleteUserService(req.user?.id);

    res.status(200).json({
        success: deleted
    });
});

/**
 * @desc    update User
 * @route   PUT /user/update
 * @access  Public
 */


export const updateUser = asyncHandler(async (req, res) => {

    const user = await userService.updateUserService(
        req.user.id,
        req.body
    );

    res.status(200).json({
        success: true,
        data: user
    });

});