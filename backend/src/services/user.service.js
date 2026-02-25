import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = 10;

/**
 * create new user
 */

export async function createUserService({ name, email, password, role = "CONSUMER" }) {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if(existingUser){
        throw new AppError("User already exists", 409, {
            email
        });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        date: {
            name,
            email,
            passwordHash,
            role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            cretedAt: true,
        }
    });

    return user;
}

/**
 * Find user by ID
 */

export async function findUserByIdService(userId){
    
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            cretedAt: true,
        }
    });

    if(!user){
        throw new AppError("User not found", 404, {
            userId
        });
    }

    return user;
}

/**
 * get hash password
 */

export async function getUserPasswordHashService(userId){

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            passwordHash: true
        }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user.passwordHash;
}

/**
 * verify password
 */

export async function verifyPasswordService(plainPassword, hashPassword){

    const isValid = await bcrypt.compare(plainPassword, hashPassword);

    if(isValid){
        throw new AppError("Invalid email or password", 401);
    }

    return true;
}

/**
 * Get all the users (Admin)
 */

export async function getAllUsersService(){
    
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            cretedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return users;
}

/**
 * delete user
 */

export async function deleteUserService(userId){
    try{
        await prisma.user.delete({
            where: { id: userId }
        });

        return true;

    }catch(error){

        if(error.code === "P2025"){
            throw new AppError("User not found", 404, {
                userId
            });

            throw error;
        }
    }
}

/**
 * update user
 */

export async function updateUserService(userId, data){

    const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            updatedAt: true
        }
    });

    return user;
}

/**
 * login user
 */

export async function findUserByEmailService(email){

    return await prisma.user.findUnique({
        where: { email }
    });

}