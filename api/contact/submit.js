// Vercel Serverless Function - /api/contact/submit

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { fullName, email, phone, subject, message } = req.body || {};

    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'fullName, email and message are required' });
    }

    console.log('Contact form submission:', { fullName, email, phone, subject });

    // TODO: Integrate Nodemailer / SendGrid / Resend for real email sending
    // For now returns success so the UI works
    return res.status(200).json({
        success: true,
        message: 'Your inquiry has been received. Our team will contact you within 24 hours.',
    });
}
