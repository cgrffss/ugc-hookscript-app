import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('x-n8n-secret');
    const secret = process.env.N8N_SECRET_TOKEN;

    if (!secret || authHeader !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { record_id, video_url } = await req.json();

    if (!record_id || !video_url) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Update the generation record
    const { error } = await supabase
      .from('generations')
      .update({ 
        video_url: video_url,
        status: 'completed'
      })
      .eq('id', record_id);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Record updated successfully' });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
