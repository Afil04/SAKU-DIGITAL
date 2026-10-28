export default async function handler(req, res) {
  // Pastikan request menggunakan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ambil pesan dari frontend Anda
    const { query, conversation_id, mode } = req.body;

    // Panggil API Dify menggunakan API Key yang tersimpan aman di Vercel Environment Variables
    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: { Mode: mode ? mode.toLowerCase() : 'current' },
        query: query,
        response_mode: 'blocking',
        conversation_id: conversation_id || '',
        user: 'user-saku-digital'
      })
    });

    const data = await response.json();

    // Kirim kembali hasil dari Dify ke frontend Anda
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Gagal terhubung ke server Dify' });
  }
}