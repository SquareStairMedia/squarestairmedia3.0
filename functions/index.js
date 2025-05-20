const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.downloadResource = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const filePath = 'resources/Digital Strategy for Nonprofits on Limited Budgets.pdf';
    const bucket = getStorage().bucket();

    try {
      const file = bucket.file(filePath);
      const [exists] = await file.exists();

      if (!exists) {
        return res.status(404).send('File not found.');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Digital Strategy for Nonprofits on Limited Budgets.pdf"');

      file.createReadStream().pipe(res);
    } catch (error) {
      console.error('Error retrieving file:', error);
      res.status(500).send('Error fetching file.');
    }
  });
});
