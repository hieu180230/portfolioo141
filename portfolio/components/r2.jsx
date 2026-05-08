
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export function getR2PublicUrl(R2_PUBLIC_URL, fileName) {

  const cleanFileName = fileName.startsWith("/") ? fileName.slice(1) : fileName;
  const baseUrl = R2_PUBLIC_URL.endsWith("/")
    ? R2_PUBLIC_URL.slice(0, -1)
    : R2_PUBLIC_URL;

  return `${baseUrl}/${cleanFileName}`;
}
