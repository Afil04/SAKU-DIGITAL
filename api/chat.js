export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { query, conversation_id, mode } = req.body;

  const r = await fetch(`${process.env.DIFY_BASE_URL}/v1/chat-messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: { mode },                 // harus ada variabel "mode" di Start node Dify
      query,
      response_mode: 'blocking',
      conversation_id: conversation_id || '',
      user: 'web-user'
    })
  });

  const data = await r.json();
  res.status(r.status).json(data);
}
