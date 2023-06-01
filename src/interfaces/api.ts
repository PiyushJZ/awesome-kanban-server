export interface ApiResponse {
  statusCode: 200 | 201 | 204 | 400;
  message: string;
  content: string;
}
