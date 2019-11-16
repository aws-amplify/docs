const aws = require('aws-sdk');
const Jimp = require('jimp');

// S3 Trigger Events:
const S3PUT = 'ObjectCreated:Put';
const S3DELETE = 'ObjectRemoved:Delete';

// Support `amplify mock`
const s3 = new aws.S3(
  process.env.AWS_EXECUTION_ENV
    ? undefined
    : {
        endpoint: 'http://localhost:20005',
        s3BucketEndpoint: true,
        s3ForcePathStyle: true
      }
);

const THUMBNAIL_FOLDER = 'thumbnails';

exports.handler = async function(event) {
  const [record] = event.Records;
  const { eventName } = record;
  const Bucket = record.s3.bucket.name;
  const Key = record.s3.object.key;
  const parts = Key.split('/');
  const basename = parts[parts.length - 1];

  // Prefix original image path with THUMBNAIL_FOLDER
  const thumbnailKey = [...parts.slice(0, -1), THUMBNAIL_FOLDER, basename].join(
    '/'
  );

  if (Key.includes(THUMBNAIL_FOLDER)) {
    return;
  }

  if (eventName === S3DELETE) {
    await s3.deleteObject({ Bucket, Key: thumbnailKey });
    return;
  }

  const photoResponse = await s3.getObject({ Bucket, Key }).promise();
  const thumbnail = await Jimp.read(photoResponse.Body);
  await thumbnail.resize(Jimp.AUTO, Math.min(thumbnail.bitmap.height, 210));
  const thumbnailBuffer = await thumbnail.getBufferAsync(Jimp.AUTO);

  await s3
    .putObject({
      Body: thumbnailBuffer,
      Bucket,
      Key: thumbnailKey
    })
    .promise();

  return `Resized ${Key} to ${thumbnailKey}`;
};
