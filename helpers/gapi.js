export const CLIENT_ID =
  '1075043922086-3gllkkprcfkdudmlqnvea885dsmm3ckn.apps.googleusercontent.com';
export const API_KEY = 'AIzaSyDsINDMWyuImmqhLRQNzbbcXPC95cFfZg4';
export const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
];

export const SCOPE = 'https://www.googleapis.com/auth/drive';
export const NAME_BASE_FOLDER = 'apuntus.com';
export const MIME_TYPE_FOLDER = 'application/vnd.google-apps.folder';

export const PERMISSION_ANYONE_READER = {
  type: 'anyone',
  role: 'reader'
};

export const PERMISSION_APUNTUS_READER = {
  type: 'user',
  role: 'reader',
  emailAddress: 'apuntusweb@gmail.com'
};

export const accessToken = () => {
  return gapi.auth.getToken().access_token;
};

export const deleteFile = fileId => {
  return gapi.client.drive.files.delete({
    fileId
  });
};

export const createFolder = (config = {}) => {
  return gapi.client.drive.files.create({
    mimeType: MIME_TYPE_FOLDER,
    ...config
  });
};

export const createFile = (
  $axios,
  parentId,
  fileContent,
  onUploadProgress = null
) => {
  const file = new Blob([fileContent], { type: fileContent.type });
  const metadata = {
    name: fileContent.name,
    parents: [parentId]
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const config = {
    headers: {
      Authorization: 'Bearer ' + accessToken()
    },
    onUploadProgress
  };

  return $axios.$post(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    form,
    config
  );
};

export const createPermission = ({ fileId, resource }) => {
  return gapi.client.drive.permissions.create({
    resource,
    fileId
  });
};

export const getFiles = (parentId, config = {}) => {
  return gapi.client.drive.files.list({
    q: `not trashed and '${parentId}' in parents`,
    ...config
  });
};

export const getFolderApuntus = () => {
  return gapi.client.drive.files.list({
    pageSize: 1,
    q: `name='${NAME_BASE_FOLDER}' and mimeType='${MIME_TYPE_FOLDER}' and not trashed`
  });
};

export const signOut = () => {
  gapi.auth2.getAuthInstance().signOut();
};

export const signIn = () => {
  gapi.auth2.getAuthInstance().signIn();
};

export const updateState = async (isSignedIn, store) => {
  store.commit('user/SET_IS_SIGNED_IN', isSignedIn);

  if (isSignedIn) {
    try {
      const response = await getFolderApuntus();

      if (response.result.files.length) {
        store.commit('user/SET_BASE_FOLDER', response.result.files[0]);
        console.log('Ya estaba creado');
      } else {
        const baseFolder = await createFolder({
          name: NAME_BASE_FOLDER
        });

        await createPermission({
          resource: PERMISSION_APUNTUS_READER,
          fileId: baseFolder.result.id
        });

        store.commit('user/SET_BASE_FOLDER', baseFolder.result);
        console.log('Se creo');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// export const aaa = () => {}
// export const aaa = () => {}
