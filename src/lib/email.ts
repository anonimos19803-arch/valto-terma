import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingEmailData {
  to: string
  name: string
  tableNo: number
  bookingId: number
  eventDate: string
  eventTime: string
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set — skipping email")
    return
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; color: #000000; }
    .container { max-width: 520px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; border-bottom: 1px solid #e5e5e5; padding-bottom: 24px; margin-bottom: 24px; }
    .header h1 { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin: 0; }
    .content { font-size: 15px; line-height: 1.6; }
    .detail { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .detail-label { color: #666; }
    .detail-value { font-weight: 600; }
    .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5; color: #999; font-size: 13px; }
    .booking-id { text-align: center; background: #f5f5f5; padding: 12px; border-radius: 6px; margin: 20px 0; font-size: 13px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ΒάΛτο Τέρμα</h1>
    </div>
    <div class="content">
      <p>Γεια σου <strong>${data.name}</strong>,</p>
      <p>Η κράτησή σου επιβεβαιώθηκε!</p>
      <div style="margin: 24px 0;">
        <div class="detail">
          <span class="detail-label">Τραπέζι</span>
          <span class="detail-value">#${data.tableNo}</span>
        </div>
        <div class="detail">
          <span class="detail-label">Ημερομηνία</span>
          <span class="detail-value">${data.eventDate}</span>
        </div>
        <div class="detail">
          <span class="detail-label">Ώρα</span>
          <span class="detail-value">${data.eventTime}</span>
        </div>
      </div>
      <div class="booking-id">
        Κωδικός κράτησης: <strong>#${data.bookingId}</strong>
      </div>
    </div>
    <div class="footer">
      <p>Θα σε δούμε εκεί</p>
    </div>
  </div>
</body>
</html>`

  await resend.emails.send({
    from: "ΒάΛτο Τέρμα <onboarding@resend.dev>",
    to: data.to,
    subject: "Η κράτησή σου επιβεβαιώθηκε — ΒάΛτο Τέρμα",
    html,
  })
}
