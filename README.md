awaybot [![Build Status](https://travis-ci.com/katydecorah/awaybot.svg?token=TZtB5nKVkXgMi2Yv8Ay6&branch=master)](https://travis-ci.com/katydecorah/awaybot)
-------------

A command line tool to run when you'll be out of the office for a while:

+ Calculates your first day back based on the amount of your leave and the day you you start your leave
+ Updates your Slack status
+ Sets you away in Slack
+ Sets a vacation response in Gmail
+ Sends an email to your team
+ Creates an event on your calendar for the duration of your leave

## Set up

### 1. Install all dependencies

```
npm install
npm link
```

### 2. Authenticate your Google account

You'll need to set this up once to allow the scripts to access parts of your Gmail and Calendar accounts.

1. Open the following guide: https://developers.google.com/gmail/api/quickstart/nodejs
2. Follow all steps under *Step 1: Turn on the Gmail API.*
3. From the instructions, save `client_secret.json` to this directory.
4. From the console, [enable Google Calendar](https://support.google.com/cloud/answer/6158841?hl=en).
5. Run `node bin/auth-google.js` and follow the instructions in terminal to authenticate your account.
6. In terminal, you should see the message: *Success! You are connected to Gmail and Calendar*.

### 3. Set some environment variables

You'll need to set your [Slack access token](https://api.slack.com/custom-integrations/legacy-tokens) for the channel where you want to update your status.

```
echo "export SlackAccessToken=0000ffff0000ffff0000ffff0000ffff0000ffff" >> ~/.bash_profile
```

You'll also need to get your Slack username in your channel. A fast way to find this is to use the [users.info method tester](https://api.slack.com/methods/users.info/test), select the desired channel, and then click your username next to the `user` field. This will populate the input with the value you'll set here:

```
echo "export SlackUser=U00000000" >> ~/.bash_profile
```

### 4. Set your preferences in config.js

Update [config.js](https://github.com/katydecorah/awaybot/blob/master/config.js) to set information about your leave, preferences, and customize all the messages that get sent along the way.

Run `npm test` to validate your config file.

## You're ready to get away

From terminal, run:

```
away
```
