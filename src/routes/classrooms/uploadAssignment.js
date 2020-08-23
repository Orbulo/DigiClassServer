const fs = require('fs');
const AWS = require('aws-sdk');
const { nanoid } = require('nanoid');
const appRoot = require('app-root-path');
const path = require('path');
const mime = require('mime-types');
const url = require('url');

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = 'digiclass-files';

function baseUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
  });
}

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

async function uploadFile(file, fileName, classId) {
  // Read content from the file
  const fileContent = fs.readFileSync(file);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: `public/digiclass/class/${classId}/assignment/${fileName}`, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  const url = await new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data.Location);
    });
  });

  return url;
}

export default async (req, res) => {
	const classroomId = req.params.classroomId;
	console.log(classroomId);

	const fullPath = path.join(appRoot.path, req.file.path);
	console.log(fullPath);
  // URL is the s3 url where the file has been uploaded in s3 and can be downloaded
  // const URL = await uploadFile(fullPath, fileName, classroomId);

  const fileName = `${nanoid()}.${mime.extension(req.file.mimetype)}`;
  fs.renameSync(req.file.path, path.join(req.file.destination, fileName));
  const resp = {
    s3URL: `${baseUrl(req)}/uploads/${fileName}`
  }
  res.json(resp);
}







