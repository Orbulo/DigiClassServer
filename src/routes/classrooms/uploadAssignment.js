const fs = require('fs');
const AWS = require('aws-sdk');

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = 'digiclass-files';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const uploadFile = (file, fileName, classId) => {
    // Read content from the file
    const fileContent = fs.readFileSync(file);
  
    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME,
      Key: `public/digiclass/class/${classId}/assignment/${fileName}`, // File name you want to save as in S3
      Body: fileContent,
    };
  
    // Uploading files to the bucket
    const s3URL = s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
    //   console.log(`File uploaded successfully. ${data.Location}`);
      return data.Location;
    });

    return s3URL;
  };

export default async (req, res) => {
	const files = req.files.files;
	const classroomId = req.params.classroomId;
	console.log(classroomId);
    console.log(files);
	
	const fileName = "fileName";
    // URL is the s3 url where the file has been uploaded in s3 and can be downloaded
    const URL = uploadFile(files, fileName, classroomId);

    const resp = {
        files,
        s3URL: URL
    }
    res.json(resp); 

}







