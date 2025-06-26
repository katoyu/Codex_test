import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = '', author = '' } = req.query;
  const titleQuery = Array.isArray(title) ? title.join(' ') : title;
  const authorQuery = Array.isArray(author) ? author.join(' ') : author;
  const query = `${titleQuery} ${authorQuery}`.trim();
  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;
  if (!key || !cx) {
    res.status(500).json({ error: 'Missing API credentials' });
    return;
  }
  const url =
    'https://www.googleapis.com/customsearch/v1?' +
    new URLSearchParams({
      q: query,
      searchType: 'image',
      num: '1',
      key,
      cx,
    });
  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(500).json({ error: 'Search failed' });
      return;
    }
    const data = await response.json();
    const imageUrl = data.items?.[0]?.link || null;
    res.status(200).json({ imageUrl });
  } catch (e) {
    res.status(500).json({ error: 'Search error' });
  }
}
