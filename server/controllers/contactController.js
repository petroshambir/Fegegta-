
import nodemailer from 'nodemailer'

// ============================================================
// SEND CONTACT MESSAGE
// ============================================================

export const sendContactMessage = async (req, res, next) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body

    // ========================================================
    // VALIDATE REQUIRED FIELDS
    // ========================================================

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        message:
          'Please provide your name, email, subject, and message.',
      })
    }

    // ========================================================
    // CREATE EMAIL TRANSPORTER
    // ========================================================

    const transporter =
      nodemailer.createTransport({
        service: 'gmail',

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

    // ========================================================
    // SEND EMAIL
    // ========================================================

    await transporter.sendMail({
      from: `"Fegegta Contact Form" <${process.env.EMAIL_USER}>`,

      to:
        process.env.CONTACT_EMAIL ||
        'ibrobraat@gmail.com',

      replyTo: email,

      subject: `Fegegta Contact: ${subject}`,

      text: `
New Contact Message from Fegegta

Name:
${name}

Customer Email:
${email}

Subject:
${subject}

Message:
${message}

--------------------------------
This message was sent from the Fegegta Contact Us form.
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 30px;
          "
        >

          <div
            style="
              max-width: 700px;
              margin: auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid #e5e5e5;
            "
          >

            <!-- HEADER -->

            <div
              style="
                background: #000000;
                color: #ffffff;
                padding: 25px;
              "
            >

              <h1
                style="
                  margin: 0;
                  font-size: 24px;
                "
              >
                ፈገግታ Fegegta
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #d1d1d1;
                  font-size: 14px;
                "
              >
                New Contact Us Message
              </p>

            </div>

            <!-- CONTENT -->

            <div
              style="
                padding: 30px;
              "
            >

              <h2
                style="
                  margin-top: 0;
                  color: #111111;
                "
              >
                Customer Information
              </h2>

              <p>
                <strong>Name:</strong>
                ${name}
              </p>

              <p>
                <strong>Email:</strong>
                ${email}
              </p>

              <p>
                <strong>Subject:</strong>
                ${subject}
              </p>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #eeeeee;
                  margin: 25px 0;
                "
              />

              <h2
                style="
                  color: #111111;
                "
              >
                Message
              </h2>

              <div
                style="
                  background: #f8f8f8;
                  border-radius: 8px;
                  padding: 20px;
                  line-height: 1.7;
                  color: #333333;
                  white-space: pre-wrap;
                "
              >
                ${message}
              </div>

              <p
                style="
                  margin-top: 30px;
                  font-size: 13px;
                  color: #777777;
                "
              >
                This message was sent through the
                Fegegta Contact Us form.
              </p>

            </div>

          </div>

        </div>
      `,
    })

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message:
        'Your message has been sent successfully.',
    })
  } catch (error) {
    console.error(
      'Contact email error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to send your message. Please try again later.',
    })
  }
}

