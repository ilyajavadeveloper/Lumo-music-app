const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 5000;
const JAMENDO_CLIENT_ID = 'fc610b1f';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // ✅ /test
  if (pathname === '/test') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: '✅ /test работает' }));
    return;
  }

  // ✅ /jamendo/search?q=...
  if (pathname === '/jamendo/search' && query.q) {
    const jamendoUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&namesearch=${encodeURIComponent(query.q)}&include=musicinfo+stats`;

    https.get(jamendoUrl, (jamRes) => {
      let data = '';
      jamRes.on('data', chunk => data += chunk);
      jamRes.on('end', () => {
        try {
          const parsed = JSON.parse(data).results || [];
          res.writeHead(200);
          res.end(JSON.stringify(parsed));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse Jamendo search data' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch from Jamendo' }));
    });
    return;
  }

  // ✅ /jamendo/top-tracks
  if (pathname === '/jamendo/top-tracks') {
    const jamendoUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&order=popularity_total&include=musicinfo+stats`;

    https.get(jamendoUrl, (jamRes) => {
      let data = '';
      jamRes.on('data', chunk => data += chunk);
      jamRes.on('end', () => {
        try {
          const parsed = JSON.parse(data).results || [];
          res.writeHead(200);
          res.end(JSON.stringify(parsed));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse top tracks' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch top tracks' }));
    });
    return;
  }

  // ✅ /jamendo/artist/:id
  if (pathname.startsWith('/jamendo/artist/')) {
    const artistId = pathname.split('/')[3];

    if (!artistId) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Missing artist ID' }));
      return;
    }

    const artistUrl = `https://api.jamendo.com/v3.0/artists/?client_id=${JAMENDO_CLIENT_ID}&id=${artistId}&format=json`;
    const tracksUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&artist_id=${artistId}&include=musicinfo+stats`;

    // Получаем артиста и его треки параллельно
    Promise.all([
      fetchHttps(artistUrl),
      fetchHttps(tracksUrl)
    ])
      .then(([artistData, trackData]) => {
        const artist = artistData.results?.[0];
        const tracks = trackData.results || [];

        if (!artist) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Artist not found' }));
          return;
        }

        // Формируем artist.image
        artist.image = artist.image || artist.shareurl || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';

        res.writeHead(200);
        res.end(JSON.stringify({
          artist: {
            id: artist.id,
            name: artist.name,
            image: artist.image,
          },
          tracks,
        }));
      })
      .catch((err) => {
        console.error(err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch artist data or tracks' }));
      });

    return;
  }

  // ❌ Unknown route
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Утилита для запроса данных по HTTPS и парсинга JSON
function fetchHttps(apiUrl) {
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Jamendo proxy running at http://localhost:${PORT}`);
});
