export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 3,
};

// TMDB API proxy
// Only accept GET request for now,
// other request methods will get error 405 response!
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug, ...urlParams } = req.query;
      const externalPath = slug.join('/');
      // Get searchParams from 'req'
      const searchParams = new URLSearchParams(urlParams).toString();
      // Construct url to be sent
      const url = `${process.env.TMDB_API_BASE_URL}${externalPath}${searchParams ? `?${searchParams}` : ''}`;
      const response = await fetch(url, {
        method: req.method,
        headers: {
          // Add access token
          Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
          accept: 'application/json',
        },
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
