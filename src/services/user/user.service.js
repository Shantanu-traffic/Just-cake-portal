const masterDb = require("../../config/db.connect");
const jwt = require("jsonwebtoken");
const {
  hashPassowrd,
  comparePassword,
} = require("../../helper/bcrypt.password");
const { sendEmailCustomerAdmin } = require("../../helper/email.helper");
const generateEmailContent = require("../../mailTemplate/mail.template");
class UserService {
  async registerUser(profile) {
    const { id, displayName } = profile;
    const email = profile.emails[0].value;
    const profile_image = profile.photos[0].value;

    const checkUserQuery = "SELECT * FROM users WHERE google_id = $1";
    const result = await masterDb.query(checkUserQuery, [id]);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return existing user
    } else {
      const insertUserQuery = await masterDb.query(
        `
                            INSERT INTO users (google_id, display_name,profile_picture, email, is_admin)
                            VALUES ($1, $2, $3,$4, $5)
                            RETURNING *;     
            `,
        [id, displayName, profile_image, email, false]
      );
      return insertUserQuery.rows[0];
    }
  }

  async registerUserManually(body) {
    const { name, email, password } = body;
    let newUserInsert;
    try {
      const userExist = await masterDb.query(
        `
                      SELECT email FROM users WHERE email = $1
              `,
        [email]
      );
      if (userExist.rows.length > 0) {
        return `${email} this user already registered`;
      } else {
        const hash_pass = await hashPassowrd(password);
        newUserInsert = await masterDb.query(
          `
                        INSERT INTO users (display_name,email,password)
                        VALUES ($1, $2, $3) returning id
                `,
          [name, email, hash_pass]
        );
      }
      return newUserInsert.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async loginUserManually(body) {
    const { email, password } = body;
    let result;
    try {
      result = await masterDb.query(
        `
          SELECT id,display_name, email, password, is_admin FROM users WHERE email = $1
          AND password IS NOT NULL
        `,
        [email]
      );

      if (result.rows.length === 0) {
        return {
          success: false,
          message: `${email} is not registered in the database`,
        };
      }
      let password_in_db = result.rows[0].password;
      const compare_password = await comparePassword(password, password_in_db);

      if (!compare_password) {
        return {
          success: false,
          message: "Wrong credentials",
        };
      }

      return {
        success: true,
        message: "Login successful",
        user: result.rows[0],
      };
    } catch (error) {
      throw error; // Or you can send a response with the error message if required
    }
  }

  async forgotPassword(email) {
    let result;
    try {
      result = await masterDb.query(
        `
            SELECT email,display_name FROM users WHERE email = $1 AND password IS NOT NULL
        `,
        [email]
      );
      if (result.rows.length == 0) {
        return `${email} does not exist in our database, or the account may have been created through Single Sign-On (SSO).`;
      }
      console.log(result.rows[0]);
      const generateOtp = Math.floor(1000 + Math.random() * 9000);
      const data = {
        name: result.rows[0].display_name,
        otp: generateOtp,
      };
      const JWT_SECRET = process.env.JWT_SECRET_KEY;
      const otpToken = jwt.sign(
        { otp: generateOtp, email: result.rows[0].email },
        JWT_SECRET,
        { expiresIn: "2m" }
      );
      const sendEamil = await sendEmailCustomerAdmin(
        [result.rows[0].email],
        "forgot_password_otp",
        data
      );
      return {
        message: `An OTP has been sent to ${email}`,
        token: otpToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(body) {
    const { otp, token, newPassword } = body;
    try {
      const JWT_SECRET = process.env.JWT_SECRET_KEY;
      // Verify the OTP token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("decond data", decoded);
      const { email } = decoded;
      // Check if the input OTP matches the one in the token
      if (decoded.otp !== parseInt(otp)) {
        return { status: "error", message: "Invalid OTP" };
      }

      // If OTP is valid, hash the new password

      const hashedPassword = await hashPassowrd(newPassword);
      await masterDb.query(
        `UPDATE users SET password = $1 WHERE email = $2`,
        [hashedPassword, email] // Use the email decoded from the token
      );

      return { status: "success", message: "Password reset successfully" };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { status: "error", message: "OTP has expired" };
      }
      return error;
    }
  }
}

const User = new UserService();
module.exports = User;
