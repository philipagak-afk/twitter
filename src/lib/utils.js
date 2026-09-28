// firebase auth errors

export const firebaseAuthErrors = {
  // =========================
  // General Auth Errors
  // =========================
  "auth/network-request-failed":
    "Network error. Check your internet connection.",

  "auth/too-many-requests":
    "Too many attempts. Please try again later.",

  "auth/internal-error":
    "Something went wrong. Please try again.",

  "auth/invalid-credential":
    "Invalid login credentials.",

  "auth/user-token-expired":
    "Your session has expired. Please login again.",

  "auth/requires-recent-login":
    "Please login again to continue.",

  "auth/operation-not-allowed":
    "This authentication method is disabled.",

  // =========================
  // Signup Errors
  // =========================
  "auth/email-already-in-use":
    "This email is already registered.",

  "auth/invalid-email":
    "Please enter a valid email address.",

  "auth/weak-password":
    "Password should be at least 6 characters.",

  "auth/missing-password":
    "Please enter your password.",

  // =========================
  // Login Errors
  // =========================
  "auth/user-not-found":
    "No account found with this email.",

  "auth/wrong-password":
    "Incorrect password.",

  "auth/invalid-login-credentials":
    "Incorrect email or password.",

  "auth/user-disabled":
    "This account has been disabled.",

  // =========================
  // Logout Errors
  // =========================
  "auth/sign-out-failed":
    "Failed to sign out. Please try again.",

  // =========================
  // Popup / Provider Errors
  // =========================
  "auth/popup-closed-by-user":
    "Authentication popup was closed.",

  "auth/popup-blocked":
    "Popup was blocked by your browser.",

  "auth/cancelled-popup-request":
    "Authentication request was cancelled.",

  "auth/account-exists-with-different-credential":
    "An account already exists with a different sign-in method.",

  // =========================
  // Phone Auth Errors
  // =========================
  "auth/invalid-verification-code":
    "Invalid verification code.",

  "auth/code-expired":
    "Verification code has expired.",

  "auth/missing-verification-code":
    "Enter the verification code.",

  "auth/invalid-phone-number":
    "Invalid phone number.",

  // =========================
  // Default
  // =========================
  default: "Something went wrong. Please try again.",
};

export function getFirebaseAuthError(code) {
  return firebaseAuthErrors[code] || firebaseAuthErrors.default;
}