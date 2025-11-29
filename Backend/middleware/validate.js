// backend/middlewares/validation.js

import validator from "validator";

// ✅ Sanitize user input (basic cleanup)
export const sanitizeInput = (value) => {
  if (typeof value !== "string") return "";
  return validator.escape(value.trim());
};

// ✅ Validate email format
export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  if (!validator.isEmail(email)) return "Invalid email format.";
  return "";
};

// ✅ Validate password rules
export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";
  if (!/[!@#$%^&*]/.test(password))
    return "Password must contain at least one special character (!@#$%^&*).";
  return "";
};

// ✅ Validate name (for registration)
export const validateName = (name) => {
  if (!name) return "Full name is required.";
  if (name.length < 3) return "Name must be at least 3 characters long.";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return "Name can only contain letters and spaces.";
  return "";
};
