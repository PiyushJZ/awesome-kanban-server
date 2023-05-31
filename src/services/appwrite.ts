import { Client, Storage, ID, InputFile } from 'node-appwrite';

const appwriteClient = new Client();
const storage = new Storage(appwriteClient);

/**
 * Function to upload image file to the appwrite image bucket
 */
export async function appwriteImageUploadService() {
  const {
    APPWRITE_URL,
    APPWRITE_PROJECT_ID,
    APPWRITE_BUCKET_SECRET,
    APPWRITE_IMAGE_BUCKET_ID,
  } = process.env;

  appwriteClient
    .setEndpoint(APPWRITE_URL) // API Endpoint
    .setProject(APPWRITE_PROJECT_ID) // Project ID
    .setKey(APPWRITE_BUCKET_SECRET); // Secret API key for bucket

  // TODO: Implement fetching the file name from the uploaded file
  const filePath = 'public/assets/workflow.png';
  const fileName = 'workflow.png';

  try {
    const { $id, name } = await storage.createFile(
      APPWRITE_IMAGE_BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    //TODO: Add the file and file url to the mongodb
    return { id: $id, name };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could upload the file`);
    console.log(`due to error\n${error}`);
    console.log(`=================================`);
  }
}

/**
 * Function to upload document file to the appwrite document bucket
 */
export async function appwriteDocumentUploadService() {
  const {
    APPWRITE_URL,
    APPWRITE_PROJECT_ID,
    APPWRITE_BUCKET_SECRET,
    APPWRITE_DOCUMENT_BUCKET_ID,
  } = process.env;

  appwriteClient
    .setEndpoint(APPWRITE_URL) // API Endpoint
    .setProject(APPWRITE_PROJECT_ID) // Project ID
    .setKey(APPWRITE_BUCKET_SECRET); // Secret API key for bucket

  // TODO: Implement fetching the file name from the uploaded file
  const filePath = 'some path';
  const fileName = 'file name';

  try {
    const { $id, name } = await storage.createFile(
      APPWRITE_DOCUMENT_BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    //TODO: Add the file and file url to the mongodb
    return { id: $id, name };
  } catch (error) {
    console.log(`=================================`);
    console.log(`Could upload the file`);
    console.log(`due to error:\n${error}`);
    console.log(`=================================`);
  }
  return;
}
