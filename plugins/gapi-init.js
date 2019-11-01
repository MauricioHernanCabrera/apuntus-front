import {
  CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPE,
  updateState
} from '@/helpers/google-drive-api';

export default async ({ store }) => {
  await gapi.load('client:auth2', async () => {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE
      });

      updateState(gapi.auth2.getAuthInstance().isSignedIn.get(), store);
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
        updateState(isSignedIn, store);
      });
    } catch (error) {
      console.log('error', error);
    }
  });
};
