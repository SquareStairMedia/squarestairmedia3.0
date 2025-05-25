const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.downloadResource = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let filePath = '';
    let downloadName = '';

    // Determine the requested resource
    if (req.query.resource === 'nonprofit-ai') {
      filePath = 'resources/Digital-Strategy-for-Nonprofits-on-Limited-Budgets.pdf';
      downloadName = 'Digital-Strategy-for-Nonprofits-on-Limited-Budgets.pdf';
    } else if (req.query.resource === 'ai-playbook') {
      filePath = 'resources/AI-Web-Strategy-Playbook-for-Small-Businesses.pdf';
      downloadName = 'AI-Web-Strategy-Playbook-for-Small-Businesses.pdf';
    } else {
      return res.status(400).send('Invalid resource type.');
    }

    const bucket = getStorage().bucket();

    try {
      const file = bucket.file(filePath);
      const [exists] = await file.exists();

      if (!exists) {
        return res.status(404).send('File not found.');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);

      file.createReadStream().pipe(res);
    } catch (error) {
      console.error('Error retrieving file:', error);
      res.status(500).send('Error fetching file.');
    }
  });
});
