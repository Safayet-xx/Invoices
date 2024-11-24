const express = require('express');
const ImageKit = require('imagekit');

const app = express();

const imagekit = new ImageKit({
  publicKey: 'public_oqQgn8KlbR4og8xmzwk+UIoAKYY=',
  privateKey: 'private_Os0vh/9g5mVHt42i12xBPinQ/vs=',
  urlEndpoint: 'https://ik.imagekit.io/ant9lfnrk',
});

// Authentication endpoint
app.get('/auth', (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
