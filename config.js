export const config = {};
config.oAuthClientID = 'ADD_YOUR_CLIENT_ID';
config.oAuthclientSecret = 'ADD_YOUR_CLIENT_SECRET';
config.oAuthCallbackUrl = 'http://localhost:8888/auth/google/callback';
config.port = 8888;
config.scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly'];
config.photosToLoad = 10;
config.apiEndpoint = 'https://photoslibrary.googleapis.com';