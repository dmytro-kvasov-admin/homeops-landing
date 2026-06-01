function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function userConfirmationEmail(name: string | undefined): string {
  const greeting = name ? `Hi ${escape(name)},` : 'Hi,'

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>You're on the HomeOps waitlist</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6fb;padding:48px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;border-radius:12px;overflow:hidden;">
<tr>
  <td style="background-color:#004ac6;padding:24px 40px;">
    <span style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;font-family:system-ui,-apple-system,sans-serif;">HomeOps</span>
  </td>
</tr>
<tr>
  <td style="background-color:#ffffff;padding:40px;">
    <h1 style="font-size:22px;font-weight:700;color:#151c27;margin:0 0 20px;line-height:1.3;font-family:system-ui,-apple-system,sans-serif;">Got it. You're on the list.</h1>
    <p style="font-size:15px;color:#434655;line-height:1.7;margin:0 0 12px;font-family:system-ui,-apple-system,sans-serif;">${greeting}</p>
    <p style="font-size:15px;color:#434655;line-height:1.7;margin:0 0 12px;font-family:system-ui,-apple-system,sans-serif;">Your early access request is confirmed. We're launching summer 2026. When we open the doors, you're first in line.</p>
    <p style="font-size:15px;color:#434655;line-height:1.7;margin:0 0 28px;font-family:system-ui,-apple-system,sans-serif;">No lottery. No credit card to hold your spot.</p>
    <div style="border-top:1px solid #e8eaf2;margin-bottom:28px;"></div>
    <p style="font-size:15px;font-weight:600;color:#151c27;margin:0 0 12px;font-family:system-ui,-apple-system,sans-serif;">One ask while you wait</p>
    <p style="font-size:15px;color:#434655;line-height:1.7;margin:0 0 14px;font-family:system-ui,-apple-system,sans-serif;">Reply to this email. Two questions:</p>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px;">
      <tr>
        <td style="padding:5px 0;font-size:15px;color:#004ac6;font-weight:700;vertical-align:top;width:24px;font-family:system-ui,-apple-system,sans-serif;">1.</td>
        <td style="padding:5px 0;font-size:15px;color:#434655;line-height:1.65;font-family:system-ui,-apple-system,sans-serif;">Why did you sign up? What grocery problem are you trying to fix?</td>
      </tr>
      <tr>
        <td style="padding:5px 0;font-size:15px;color:#004ac6;font-weight:700;vertical-align:top;width:24px;font-family:system-ui,-apple-system,sans-serif;">2.</td>
        <td style="padding:5px 0;font-size:15px;color:#434655;line-height:1.65;font-family:system-ui,-apple-system,sans-serif;">What does your current grocery routine look like?</td>
      </tr>
    </table>
    <p style="font-size:15px;color:#434655;line-height:1.7;margin:0 0 28px;font-family:system-ui,-apple-system,sans-serif;">Takes 2 minutes. Helps us build the right thing for you specifically.</p>
    <div style="background-color:#f0f4ff;border-radius:8px;padding:16px 20px;margin:0 0 32px;">
      <p style="font-size:13px;color:#5a6a8a;margin:0;line-height:1.65;font-family:system-ui,-apple-system,sans-serif;">We'll reach out before launch with your access details and a short walkthrough of what's ready. Nothing else in your inbox until then.</p>
    </div>
    <p style="font-size:14px;color:#6b7280;margin:0;line-height:1.7;font-family:system-ui,-apple-system,sans-serif;">Talk soon,<br><strong style="color:#151c27;">The HomeOps team</strong></p>
  </td>
</tr>
<tr>
  <td style="background-color:#f9f9ff;padding:20px 40px;border-top:1px solid #e8eaf2;">
    <p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.6;font-family:system-ui,-apple-system,sans-serif;">HomeOps &middot; US early access &middot; Launching summer 2026<br>You received this because you requested access at homeopsapp.com</p>
  </td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

export function adminNotificationEmail(
  name: string | undefined,
  email: string,
  age: string | undefined,
  zip: string | undefined,
): string {
  const now = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const row = (label: string, value: string) =>
    `<tr>
      <td style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;padding:10px 0;border-bottom:1px solid #f0f0f0;width:100px;white-space:nowrap;font-family:system-ui,-apple-system,sans-serif;">${label}</td>
      <td style="font-size:14px;color:#151c27;padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;font-family:system-ui,-apple-system,sans-serif;">${value}</td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>New waitlist signup</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6fb;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;border-radius:12px;overflow:hidden;">
<tr>
  <td style="background-color:#151c27;padding:20px 32px;">
    <span style="font-size:14px;font-weight:700;color:#ffffff;font-family:system-ui,-apple-system,sans-serif;">HomeOps / New waitlist signup</span>
  </td>
</tr>
<tr>
  <td style="background-color:#ffffff;padding:28px 32px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      ${row('Name', escape(name || '&mdash;'))}
      ${row('Email', escape(email))}
      ${row('Age range', escape(age || '&mdash;'))}
      ${row('ZIP code', escape(zip || '&mdash;'))}
    </table>
    <p style="font-size:12px;color:#9ca3af;margin:16px 0 0;font-family:system-ui,-apple-system,sans-serif;">Signed up ${now} ET</p>
  </td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`
}
