import { z } from "zod";

/**
 * UUID validation
 */
const uuidSchema = z.string().uuid({
  message: "Invalid UUID format"
});

/**
 * Register User Validation
 */
export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required"
      })
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: z
      .string({
        required_error: "Email is required"
      })
      .trim()
      .toLowerCase()
      .email("Invalid email format"),

    password: z
      .string({
        required_error: "Password is required"
      })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters")
  })
});

/**
 * Login Validation
 */
export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required"
      })
      .trim()
      .toLowerCase()
      .email("Invalid email format"),

    password: z
      .string({
        required_error: "Password is required"
      })
      .min(1, "Password is required")
  })
});

/**
 * Get User Validation
 */
export const getUserSchema = z.object({
  params: z.object({
    id: uuidSchema
  })
});

/**
 * Update User Validation
 */
export const updateUserSchema = z.object({
  params: z.object({
    id: uuidSchema
  }),

  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email format")
      .optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters")
      .optional()
  })
});

/**
 * Delete User Validation
 */
export const deleteUserSchema = z.object({
  params: z.object({
    id: uuidSchema
  })
});