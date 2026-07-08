import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/VerifyEmail.js";
import validator from "validator";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already exists."
            : "Username already exists.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15min",
    });

    // verify link to users email
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;

    await transporter.sendMail({
      from: `"LensFlow" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Verification</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#111827;">📸 LensFlow</h1>
                    <p style="color:#6b7280;font-size:16px;margin-top:10px;">
                      Welcome! Please verify your email to activate your account.
                    </p>

                    <a
                      href="${verificationLink}"
                      style="
                        display:inline-block;
                        margin:30px 0;
                        padding:14px 32px;
                        background:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                        font-size:16px;
                      "
                    >
                      Verify Email
                    </a>

                    <p style="color:#6b7280;font-size:14px;line-height:1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>

                    <p style="word-break:break-all;font-size:13px;color:#2563eb;">
                      ${verificationLink}
                    </p>

                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;" />

                    <p style="font-size:13px;color:#9ca3af;">
                      If you didn't create a LensFlow account, you can safely ignore this email.
                    </p>

                    <p style="font-size:13px;color:#9ca3af;margin-top:20px;">
                      © ${new Date().getFullYear()} LensFlow. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
    });

    return res.status(201).json({
      success: true,
      message: "Account created, Please check your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in signup controller.",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Verification link is invalid or expired.",
      });
    }

    if (user.isVerified === true) {
      return res.status(200).json({
        success: true,
        message: "Email already verified.",
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      isVerified: user.isVerified,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in verifyEmail controller.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before logging in.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in login controller.",
      error: error.message,
    });
  }
};
