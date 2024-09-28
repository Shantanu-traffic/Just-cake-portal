const multer = require("multer");
const { bucket } = require("../config/firebase.config");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFileToFirebase = async (file) => {
  if (!file) {
    throw new Error("No file provided.");
  }

  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      console.error(err);
      reject(new Error("Unable to upload file."));
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Optionally set file metadata, like making it publicly accessible
      await blob.makePublic();

      resolve({ message: "File uploaded successfully", url: publicUrl });
    });

    blobStream.end(file.buffer);
  });
};

module.exports = uploadFileToFirebase;
