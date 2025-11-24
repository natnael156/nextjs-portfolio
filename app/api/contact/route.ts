import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log('Contact form submission:', { name, email, messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if Formspree ID is configured
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    if (!formspreeId || formspreeId === 'YOUR_FORM_ID') {
      console.error('Formspree Form ID not configured');
      return NextResponse.json(
        { success: false, error: 'Contact form not configured. Please email directly.' },
        { status: 500 }
      );
    }

    console.log('Sending to Formspree:', formspreeId);
    
    // Using Formspree (free service, easier setup)
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Contact Form Submission from ${name}`,
      }),
    });

    console.log('Formspree response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Formspree error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Formspree response:', data);

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully!' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
