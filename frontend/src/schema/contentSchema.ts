import { z } from "zod";

export const formSchema = z.object({
  contentType: z.enum(
    [
      "Blog Post",
      "Instagram Caption",
      "Email Newsletter",
      "Product Description",
    ],
    {
      error: "Please select a content goal",
    }
  ),
  topic: z.string().min(2, "Topic must be at least 2 characters"),
  keywords: z.string().optional(),
  tone: z.enum(["Friendly", "Professional", "Casual"], {
    error: "Please select a tone",
  }),
  language: z.enum(["English", "Hindi", "Marathi"], {
    error: "Please select a language",
  }),
});

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be between 3 and 15 characters" })
    .max(15, { message: "Username must be between 3 and 15 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must only contain alphanumeric characters",
    }),
  email: z
    .email({ message: "Email is Required" })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, {
      message: "Email does not match the required format",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const loginSchema = z.object({
  email: z
    .email({ message: "Email is Required" })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, {
      message: "Email does not match the required format",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});
