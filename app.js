import { config } from './config.js';
import { createRequire } from 'module';
import fetch from 'node-fetch';
import { access } from 'fs';

/* Initial setup */
const require = createRequire(import.meta.url);

const express = require('express')
const app = express()
const port = config.port

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.set('view engine', 'ejs')

/* OAuth client from googleapis library */
const { google } = require('googleapis')
const oauth2Client = new google.auth.OAuth2(
    config.oAuthClientID,
    config.oAuthclientSecret,
    config.oAuthCallbackUrl
)

/** Access token shared by Google after user allowed access to Google photos */
var access_token

/* Main page */
app.get('/', (req, res) => {
    res.send('<a href="/auth/google" id="import">Import Google photos</a>')
})

/* Error page */
app.get('/error', (req, res) => {
    res.send('Something went wrong!')
})

/* Redirect to Google's authorization URL */
app.get('/auth/google', (req, res) => {
    const scopes = config.scopes;

    const url = oauth2Client.generateAuthUrl({
        scope: scopes
    })
    console.log('Authorization URL: ', url)
    res.redirect(url)
})

/* Get access token from Google */
app.get('/auth/google/callback', async (req, res) => {
    
    console.log('Redirect url: ', req.url)

    const { code } = req.query
    console.log('Auth code: ', code)

    const { tokens } = await oauth2Client.getToken(code)
    access_token = tokens.access_token
    console.log(access_token)

    res.redirect('/photos')
})

/* Use access token to get last 10 photos of the user */
app.get('/photos', async (req, res) => {
    const parameters = {
        pageSize: 10
    }
    const response = await fetch(config.apiEndpoint + '/v1/mediaItems:search', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(parameters)
    });
    console.log(response)

    if (response.ok) {
        const result = await response.json()
        console.log(result)

        const items = result && result.mediaItems ?
            result.mediaItems
                .filter(x => x)  // Filter empty or invalid items.
                // Only keep media items with an image mime type.
                .filter(x => x.mimeType && x.mimeType.startsWith('image/')) :
            []
        res.render('photos', {photos: items})
    }
    else {
        res.redirect('/error')
    }
})



