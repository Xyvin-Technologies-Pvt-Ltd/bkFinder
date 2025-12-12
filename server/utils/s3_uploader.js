const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET,
} = process.env;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const upload_file_to_s3 = async (file, folder_path = "userPhotos") => {
  // file is multer file (memoryStorage) with .originalname, .buffer, .mimetype
  const file_name = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
  const key = `${folder_path}/${file_name}`;

  const uploadParams = {
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploader = new Upload({
    client: s3,
    params: uploadParams,
  });

  await uploader.done();

  // return url (public)
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = { upload_file_to_s3 };