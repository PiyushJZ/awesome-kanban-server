import { StatusCode } from '@types';

export interface ApiResponse {
  statusCode: StatusCode;
  message: string;
  content: string;
}

export interface StorageResponse {
  id: string;
  name: string;
  mimeType: string;
}
