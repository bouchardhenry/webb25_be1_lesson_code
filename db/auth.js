import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.js";

<<<<<<< HEAD
function _generateTokens(userId, role) {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId);
=======
function _generateTokens(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
>>>>>>> 53c0d95923e6e27ecd2ffe03a9a9ff541e1e87f6
  return { accessToken, refreshToken };
}

function _getUserObject(user) {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

export async function registerUser(name, email, password) {
  const newUser = new User({ name, email, password });
  await newUser.save();
<<<<<<< HEAD
  const { accessToken, refreshToken } = _generateTokens(newUser.id, newUser.role);
=======
  const { accessToken, refreshToken } = _generateTokens(newUser);
>>>>>>> 53c0d95923e6e27ecd2ffe03a9a9ff541e1e87f6

  const userObject = _getUserObject(newUser);

  return { user: userObject, accessToken, refreshToken };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isSamePassword = await user.isSamePassword(password);

  if (!isSamePassword) {
    throw new Error("Invalid credentials");
  }
<<<<<<< HEAD
  const { accessToken, refreshToken } = _generateTokens(user.id, user.role);
=======
  const { accessToken, refreshToken } = _generateTokens(user);
>>>>>>> 53c0d95923e6e27ecd2ffe03a9a9ff541e1e87f6

  const userObject = _getUserObject(user);

  return { user: userObject, accessToken, refreshToken };
}

export async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return _getUserObject(user);
}

export async function refreshAccessToken(refreshToken) {
  const decodedToken = verifyRefreshToken(refreshToken);
  const userId = decodedToken?.userId;
  if (!userId) {
    throw new Error("Invalid refresh token");
  }

  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const accessToken = generateAccessToken(userId, decodedToken.role);
  return { accessToken };
}

export async function requestPassword(email = "") {
  await User.findOneAndUpdate(
    {
      email: email.toLowerCase(),
    },
    {
      resetPasswordCode: `${Math.floor(Math.random() * 100000)}`,
    },
  );

  return {
    message: "If the email exists, a reset code has been sent",
  };
}

export async function confirmPasswordReset(email, code, newPassword) {
  const user = await User.findOne({
    email: email.toLowerCase(),
    resetPasswordCode: code,
  });

  if (!user) {
    throw new Error("Unauthorized");
  }
  user.password = newPassword;
  user.resetPasswordCode = null;
  await user.save();
  return {
    message: "Password has been reset",
  };
}
