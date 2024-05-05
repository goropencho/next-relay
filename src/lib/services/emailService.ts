import nodemailer from "nodemailer";
import { env } from "@/env.mjs";
import { AccessTokenRepository } from "../repository/accessToken.repository";
import { UserRepository } from "../repository/users.repository";

export class EmailService {
  private userRepository: UserRepository;
  private accessTokenRepository: AccessTokenRepository;
  constructor() {
    this.accessTokenRepository = new AccessTokenRepository();
    this.userRepository = new UserRepository();
  }

  async sendMail(body: any) {
    const user = await this.accessTokenRepository.findByToken(body.token);

    if (!user) {
      return {
        result: [],
        error: ["Invalid Token"],
        success: false,
      };
    }

    const transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });

    try {
      // Craft the email content
      if (user.user?.email) {
        const message = {
          from: "SMTP Service <user@example.org>",
          to: user?.user.email,
          subject: "Your Input Submission",
          text: `You submitted the following input: ${JSON.stringify(body)}`,
        };

        // Send the email
        await transporter.sendMail(message);
      }
    } catch (err) {
      return {};
    }
  }
}
