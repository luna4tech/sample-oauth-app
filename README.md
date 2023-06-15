This is a sample application that demonstrates how to access Google Photos API using OAuth functionality. It enables the retrieval and display of a user's photos from their Google account.

## Prerequisites
Before running the application, make sure you have the following:
- Node.js installed on your machine
- A Google account
- OAuth client ID and client secret from the Google Developers Console by following steps here [Get started with REST | Google Photos APIs | Google for Developers](https://developers.google.com/photos/library/guides/get-started)

## Installation
- Clone or download this repository.
- Open a terminal and navigate to the project directory.
- Run `npm install` to install the required dependencies.

## Configuration
- Open the `config.js` file and update the following values:
- `config.oAuthClientID`: Add your OAuth client ID obtained from the Google Developers Console.
- `config.oAuthClientSecret`: Add your OAuth client secret obtained from the Google Developers Console.

## Usage
- Start the application by running `npm start` in the project directory.
- Open your web browser and navigate to http://localhost:8888.
- Click on the "Access Google Photos" button to initiate the OAuth flow.
- You will be redirected to the Google authorization page. Sign in with your Google account and grant access to the application.
- After successful authorization, you will be redirected back to the application.
- The application will fetch and display a collection of your Google Photos.

## License
This project is licensed under the MIT License.

## References
- [Google Photos APIs](https://developers.google.com/photos)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
