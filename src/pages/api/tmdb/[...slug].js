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
    const { slug } = req.query;
    const externalPath = slug.join('/');
    // Get searchParams from 'req'
    const searchParams = new URLSearchParams(req.query).toString();
    // Construct url to be sent
    const url = `${process.env.TMDB_API_BASE_URL}/${externalPath}${searchParams ? `?${searchParams}` : ''}`;
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Add access token
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
        ...req.headers,
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
}
