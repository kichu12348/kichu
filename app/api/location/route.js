export async function GET(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();

    res.status(200).json({
      city: geoData.city,
      region: geoData.region,
      country: geoData.country_name,
      otherstuff:res.headers
    });
  } catch {
    res.status(500).json({ error: 'Could not determine location' });
  }
}
