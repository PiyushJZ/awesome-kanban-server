import { Client, Storage, ID, InputFile } from 'node-appwrite';
import { ApiResponse } from '@interfaces/api';
import { StorageResponse } from '@interfaces/appwrite';

const appwriteClient = new Client();
const storage = new Storage(appwriteClient);

function setStorageOptions(): void {
  const { APPWRITE_URL, APPWRITE_PROJECT_ID, APPWRITE_BUCKET_SECRET } =
    process.env;

  appwriteClient
    .setEndpoint(APPWRITE_URL) // API Endpoint
    .setProject(APPWRITE_PROJECT_ID) // Project ID
    .setKey(APPWRITE_BUCKET_SECRET); // Secret API key for bucket
}

/**
 * Function to upload image file to the appwrite task image bucket
 */
export async function uploadTaskImage(
  filePath: string,
  fileName: string
): Promise<StorageResponse | void> {
  const { APPWRITE_TASK_IMAGE_BUCKET_ID } = process.env;

  // TODO: Implement fetching the file name from the uploaded file in the utils

  setStorageOptions();

  try {
    const { $id, name, mimeType } = await storage.createFile(
      APPWRITE_TASK_IMAGE_BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    //TODO: Add the file and file url to the mongodb
    return { id: $id, name, mimeType };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not upload the file`);
    console.log(`due to error\n${error}`);
    console.log(`=================================`);
  }
}

/**
 * Function to upload document file to the appwrite document bucket
 */
export async function uploadTaskDocument(
  filePath: string,
  fileName: string
): Promise<StorageResponse | void> {
  const { APPWRITE_DOCUMENT_BUCKET_ID } = process.env;

  // TODO: Implement fetching the file name from the uploaded file in the utils

  setStorageOptions();

  try {
    const { $id, name, mimeType } = await storage.createFile(
      APPWRITE_DOCUMENT_BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    //TODO: Add the file and file url to the mongodb
    return { id: $id, name, mimeType };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not upload the file`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
  }
  return;
}

/**
 * Function to upload image file to the appwrite profile image bucket
 */
export async function uploadProfileImage(
  filePath: string,
  fileName: string
): Promise<StorageResponse | void> {
  const { APPWRITE_PROFILE_IMAGE_BUCKET_ID } = process.env;

  // TODO: Implement fetching the file name from the uploaded file in the utils

  setStorageOptions();

  try {
    const { $id, name, mimeType } = await storage.createFile(
      APPWRITE_PROFILE_IMAGE_BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    //TODO: Add the file and file url to the mongodb
    return { id: $id, name, mimeType };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not upload the file`);
    console.log(`due to error\n${error}`);
    console.log(`=================================`);
  }
}

/**
 * Function to delete image file from the appwrite task image bucket
 */
export async function deleteTaskImage(fileId: string): Promise<ApiResponse> {
  const { APPWRITE_TASK_IMAGE_BUCKET_ID } = process.env;

  setStorageOptions();

  // TODO: Implement fetching the file id from the uploaded file in the utils

  try {
    const response = await storage.deleteFile(
      APPWRITE_TASK_IMAGE_BUCKET_ID,
      fileId
    );

    console.log(response);

    //TODO: Add the file and file url to the mongodb
    return {
      statusCode: 204,
      message: 'File deleted successfully',
      content: 'No Content',
    };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not delete the file`);
    console.log(`due to error\n${error}`);
    console.log(`=================================`);
    return {
      statusCode: 400,
      message: 'File could not be deleted',
      content: 'No Content',
    };
  }
}

/**
 * Function to delete document file from the appwrite task document bucket
 */
export async function deleteTaskDocument(fileId: string): Promise<ApiResponse> {
  const { APPWRITE_DOCUMENT_BUCKET_ID } = process.env;

  setStorageOptions();

  // TODO: Implement fetching the file id from the uploaded file in the utils

  try {
    const response = await storage.deleteFile(
      APPWRITE_DOCUMENT_BUCKET_ID,
      fileId
    );

    console.log(response);

    //TODO: Add the file and file url to the mongodb
    return {
      statusCode: 204,
      message: 'File deleted successfully',
      content: 'No Content',
    };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could not delete the file`);
    console.log(`due to error\n${error}`);
    console.log(`=================================`);
    return {
      statusCode: 400,
      message: 'File could not be deleted',
      content: 'No Content',
    };
  }
}
