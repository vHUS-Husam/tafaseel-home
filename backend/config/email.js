import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };
  await transporter.sendMail(msg);
};

export const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const html = `
    <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B6914;">مرحباً بك في تفاصيل هوم</h2>
      <p>شكراً لتسجيلك في متجرنا. يرجى تأكيد بريدك الإلكتروني بالضغط على الزر أدناه:</p>
      <a href="${verifyUrl}" style="display: inline-block; background: #8B6914; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">تأكيد البريد الإلكتروني</a>
      <p>أو انسخ هذا الرابط: ${verifyUrl}</p>
      <p style="color: #666; font-size: 12px;">إذا لم تقم بالتسجيل، يمكنك تجاهل هذا البريد.</p>
    </div>
  `;
  await sendEmail({ to: email, subject: 'تأكيد البريد الإلكتروني - تفاصيل هوم', html });
};

export const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const html = `
    <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B6914;">إعادة تعيين كلمة المرور</h2>
      <p>لقد طلبت إعادة تعيين كلمة المرور. اضغط على الزر أدناه:</p>
      <a href="${resetUrl}" style="display: inline-block; background: #8B6914; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">إعادة تعيين كلمة المرور</a>
      <p>أو انسخ هذا الرابط: ${resetUrl}</p>
      <p style="color: #666; font-size: 12px;">إذا لم تطلب ذلك، يمكنك تجاهل هذا البريد.</p>
    </div>
  `;
  await sendEmail({ to: email, subject: 'إعادة تعيين كلمة المرور - تفاصيل هوم', html });
};

export const sendOrderNotification = async (email, order) => {
  const html = `
    <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B6914;">تم استلام طلبك بنجاح</h2>
      <p>رقم الطلب: <strong>#${order.orderNumber}</strong></p>
      <p>السعر الإجمالي: <strong>${order.totalPrice} ₪</strong></p>
      <p>حالة الطلب: <strong>قيد الانتظار</strong></p>
      <p>سنقوم بالتواصل معك قريباً لتأكيد الطلب.</p>
      <p style="color: #666; font-size: 12px;">شكراً لاختيارك تفاصيل هوم</p>
    </div>
  `;
  await sendEmail({ to: email, subject: `طلب جديد #${order.orderNumber} - تفاصيل هوم`, html });
};
