const { S3Client, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
const s3Client = new S3Client({
  region: "eu-north-1", // Replace with your desired region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Ensure these environment variables are set
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");


const getObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "learn-engine-x",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

// put object 
const putObjectURL = async (key, body) => {
  const command = new PutObjectCommand({
    Bucket: "learn-engine-x",
    Key: `img/user/${key}`,
    ContentType: body,
  });

  const url = await getSignedUrl(s3Client, command);
  return url
  
}

//get bucket objects
const getbucketObjects = async () => {
  const command = new ListObjectsV2Command({
    Bucket: "learn-engine-x",
    key: '/'
  });
  const response = await s3Client.send(command);
  console.log(response);
  
}
//delete object
const deleteObject = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: "learn-engine-x",
    Key: key,
  });
  const response = await s3Client.send(command);
  return response;
}

async function init() {
  // console.log(await getObject('demo.pdf'));
  // console.log(`url for put object: ${await putObjectURL(`image-${Date.now()}.jpg`, 'image/jpeg')}`);
  // await getbucketObjects();
    await deleteObject('demo.pdf');
}


init();
