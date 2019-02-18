require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const twitterWebhooks = require('twitter-webhooks')

const app = express()

// require routes
var index = require('./routes/index')
var another = require('./routes/another')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use routes
app.use('/', index)
app.use('/another', another)

const userActivityWebhook = twitterWebhooks.userActivity({
  serverUrl: 'https://yourdomain.com',
  route: '/', //default : '/'
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  environment: 'development',
  app
})

//Register your webhook url - just needed once per URL
userActivityWebhook.register()

// Subscribe for a particular user activity

// userActivityWebhook
//   .subscribe({
//     userId: '[TWITTER USER ID]',
//     accessToken: '[TWITTER USER ACCESS TOKEN]',
//     accessTokenSecret: '[TWITTER USER ACCESS TOKEN SECRET]'
//   })
//   .then(function(userActivity) {
//     userActivity
//       .on('favorite', data => console.log(userActivity.id + ' - favorite'))
//       .on('tweet_create', data =>
//         console.log(userActivity.id + ' - tweet_create')
//       )
//       .on('follow', data => console.log(userActivity.id + ' - follow'))
//       .on('mute', data => console.log(userActivity.id + ' - mute'))
//       .on('revoke', data => console.log(userActivity.id + ' - revoke'))
//       .on('direct_message', data =>
//         console.log(userActivity.id + ' - direct_message')
//       )
//       .on('direct_message_indicate_typing', data =>
//         console.log(userActivity.id + ' - direct_message_indicate_typing')
//       )
//       .on('direct_message_mark_read', data =>
//         console.log(userActivity.id + ' - direct_message_mark_read')
//       )
//       .on('tweet_delete', data =>
//         console.log(userActivity.id + ' - tweet_delete')
//       )
//   })

// listen to any user activity
userActivityWebhook.on('event', (event, userId, data) =>
  console.log(userId + ' - favorite')
)

// listen to unknown payload (in case of api new features)
userActivityWebhook.on('unknown-event', rawData => console.log(rawData))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))
