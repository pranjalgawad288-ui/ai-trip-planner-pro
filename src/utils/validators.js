export const validateEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) || "Enter a valid email address";
};

export const validatePassword = (value) =>
  value.length >= 6 || "Password must be at least 6 characters";

export const validateRequired = (label) => (value) =>
  (value && value.toString().trim().length > 0) || `${label} is required`;

export const validateConfirmPassword = (password) => (value) =>
  value === password || "Passwords do not match";
