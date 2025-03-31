const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 5000;

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

  // ✅ /deezer/top-artists
  if (pathname === '/deezer/top-artists') {
    https.get('https://api.deezer.com/chart/0/tracks', (deezerRes) => {
      let data = '';
      deezerRes.on('data', chunk => (data += chunk));
      deezerRes.on('end', () => {
        try {
          const parsed = JSON.parse(data).data || [];
          const artistsMap = new Map();
          parsed.forEach((track) => {
            if (track.artist && !artistsMap.has(track.artist.id)) {
              artistsMap.set(track.artist.id, track.artist);
            }
          });
          res.writeHead(200);
          res.end(JSON.stringify([...artistsMap.values()]));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse Deezer data' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch from Deezer' }));
    });
    return;
  }

  // ✅ /deezer/top-charts
  if (pathname === '/deezer/top-charts') {
    https.get('https://api.deezer.com/chart/0/tracks', (deezerRes) => {
      let data = '';
      deezerRes.on('data', chunk => (data += chunk));
      deezerRes.on('end', () => {
        try {
          const parsed = JSON.parse(data).data || [];
          res.writeHead(200);
          res.end(JSON.stringify(parsed));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse Deezer data' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch from Deezer' }));
    });
    return;
  }

  // ✅ /deezer/search?q=...
  if (pathname === '/deezer/search' && query.q) {
    const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query.q)}`;
    https.get(deezerUrl, (deezerRes) => {
      let data = '';
      deezerRes.on('data', chunk => (data += chunk));
      deezerRes.on('end', () => {
        try {
          const parsed = JSON.parse(data).data || [];
          res.writeHead(200);
          res.end(JSON.stringify(parsed));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse search results' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch search results' }));
    });
    return;
  }

  // ✅ /deezer/artist/:id
  if (pathname.startsWith('/deezer/artist/')) {
    const artistId = pathname.split('/')[3];
    if (!artistId) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Missing artist ID' }));
      return;
    }

    https.get(`https://api.deezer.com/artist/${artistId}`, (deezerRes) => {
      let data = '';
      deezerRes.on('data', chunk => (data += chunk));
      deezerRes.on('end', () => {
        try {
          const artist = JSON.parse(data);
          if (!artist.id) {
            throw new Error('Invalid artist data');
          }

          // теперь получаем top tracks
          https.get(`https://api.deezer.com/artist/${artistId}/top?limit=10`, (topRes) => {
            let topData = '';
            topRes.on('data', chunk => (topData += chunk));
            topRes.on('end', () => {
              try {
                const topParsed = JSON.parse(topData).data || [];
                artist.topSongs = topParsed;
                res.writeHead(200);
                res.end(JSON.stringify(artist));
              } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Failed to parse artist top songs' }));
              }
            });
          }).on('error', () => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to fetch artist top songs' }));
          });
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to parse artist data' }));
        }
      });
    }).on('error', () => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch artist info' }));
    });

    return;
  }

  // ❌ Unknown route
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 Basic Node proxy running at http://localhost:${PORT}`);
});
