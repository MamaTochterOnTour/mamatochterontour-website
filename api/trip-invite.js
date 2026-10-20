export default function handler(req, res) {
  const token = req.query.token;

  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) {
    return res.status(404).send("Ungültiger Einladungslink");
  }

  const invitationUrl =
    `https://www.mamatochterontour.de/app/trip/invite/${token}`;

  const title = "Du bist zu einer Reise auf Momentry eingeladen!";
  const description =
    "Plane eure gemeinsame Reise mit Momentry. Öffne deine Einladung und sei dabei!";
  const image =
    "https://www.mamatochterontour.de/app/favicon.png";

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Momentry">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:url" content="${escapeHtml(invitationUrl)}">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
</head>
<body>
    <script>
    window.location.replace(
      "/invite/${token}"
    );
  </script>
  <p>Deine Momentry-Einladung wird geöffnet …</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).send(html);
}