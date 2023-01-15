const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLUOD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
const bucket = storage.bucket(process.env.GCS_BUCKET);
const uploadCloud = (req) => {
  const { name } = JSON.parse(req.body.info);
  const newName = uuidv4() + "-" + name;
  return new Promise((resolve, reject) => {
    const blob = bucket.file(newName);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => console.log(err));
    blobStream.on("finish", () => {
      const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`;
      const imageDetails = JSON.parse(req.body.info);
      imageDetails.image = publicURL;
      resolve(imageDetails);
    });

    blobStream.end(req.file.buffer);
  });
};

module.exports = { uploadCloud };
