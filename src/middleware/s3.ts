import S3 from "aws-sdk/clients/s3";
import config from "config";
import fs from "fs";

const AwsBucketName: string = config.get("AwsBucketName");
const AwsBucketRegion: string = config.get("AwsBucketRegion");
const AwsAccessKey: string = config.get("AwsAccessKey");
const AwsSecretKey: string = config.get("AwsSecretKey");

const s3 = new S3({
    region: AwsBucketRegion,
    accessKeyId: AwsAccessKey,
    secretAccessKey: AwsSecretKey,
});

// Uploads a file to s3
export const upload = (file: any) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: AwsBucketName,
        Key: file.filename,
        Body: fileStream,
    };

    return s3.upload(uploadParams).promise();
};

// Downloads a file from s3
export const download = (fileKey: string) => {
    const downloadParams = {
        Bucket: AwsBucketName,
        Key: fileKey,
    };

    return s3.getObject(downloadParams).createReadStream();
};
