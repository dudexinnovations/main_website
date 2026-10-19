/**
 * Cloudflare Pages Edge Function
 * Handles POST requests to /api/leads/presence-score
 */

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();

    // Log the lead data inside Cloudflare dashboard runtime logs
    console.log('[Presence Score Lead Captured]:', JSON.stringify(body));

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Presence score lead captured successfully',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Invalid request body'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
