import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

export function getR2PublicUrl(fileName) {
  if (!R2_PUBLIC_URL) {
    throw new Error("R2_PUBLIC_URL not configured");
  }

  const cleanFileName = fileName.startsWith("/") ? fileName.slice(1) : fileName;
  const baseUrl = R2_PUBLIC_URL.endsWith("/")
    ? R2_PUBLIC_URL.slice(0, -1)
    : R2_PUBLIC_URL;

  return `${baseUrl}/${cleanFileName}`;
}
