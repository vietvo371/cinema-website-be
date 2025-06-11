import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('email.host'),
      port: this.configService.get('email.port'),
      secure: false,
      auth: {
        user: this.configService.get('email.user'),
        pass: this.configService.get('email.password'),
      },
    });
  }

  async sendBookingConfirmation(to: string, bookingDetails: any) {
    const { movieTitle, showtime, seats, totalPrice } = bookingDetails;

    await this.transporter.sendMail({
      from: this.configService.get('email.user'),
      to,
      subject: 'Booking Confirmation - Cinema Website',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Thank you for your booking!</p>
        <h2>Booking Details:</h2>
        <ul>
          <li>Movie: ${movieTitle}</li>
          <li>Showtime: ${new Date(showtime).toLocaleString()}</li>
          <li>Seats: ${seats.join(', ')}</li>
          <li>Total Price: $${totalPrice}</li>
        </ul>
        <p>Please arrive at least 15 minutes before the showtime.</p>
      `,
    });
  }

  async sendPasswordReset(to: string, resetToken: string) {
    const resetUrl = `${this.configService.get('app.url')}/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      from: this.configService.get('email.user'),
      to,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });
  }
} 