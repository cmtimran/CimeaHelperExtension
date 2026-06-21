import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// POST /api/track
// Endpoint to receive tracking events from the Chrome Extension
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { event, user_info, url } = data;

    const ip = user_info?.ip || 'Unknown';
    const country = user_info?.country || 'Unknown';
    const city = user_info?.city || 'Unknown';
    const timestamp = data.timestamp || new Date().toISOString();

    // Create table if not exists (Vercel Postgres approach)
    await sql`
      CREATE TABLE IF NOT EXISTS usage_logs (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(255) NOT NULL,
        ip_address VARCHAR(255),
        country VARCHAR(255),
        city VARCHAR(255),
        page_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert log
    await sql`
      INSERT INTO usage_logs (event_type, ip_address, country, city, page_url, created_at)
      VALUES (${event}, ${ip}, ${country}, ${city}, ${url || ''}, ${timestamp})
    `;

    return NextResponse.json({ success: true, message: 'Logged successfully' }, { status: 200 });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET /api/track
// Retrieve logs for the dashboard
export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM usage_logs ORDER BY created_at DESC LIMIT 100;`;
    return NextResponse.json({ success: true, logs: rows }, { status: 200 });
  } catch (error: any) {
    // If table doesn't exist yet, return empty
    if (error.message.includes('relation "usage_logs" does not exist')) {
      return NextResponse.json({ success: true, logs: [] }, { status: 200 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch logs' }, { status: 500 });
  }
}
