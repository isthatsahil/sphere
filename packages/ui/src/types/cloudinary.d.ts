export interface ICloudinaryUploadResponse {
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image";
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  // optional fields you might see depending on params
  etag?: string;
  placeholder?: boolean;
  tags?: string[];
  context?: Record<string, never>;
  metadata?: Record<string, never>;
}
