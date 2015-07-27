# Public iOS App of Orléans Tech

Public iOS application of [Orléans Tech Talks](http://orleans-tech.com), a monthly meetup organized at Orléans (France) by guys and women passionate about technology.

This application is built with [React-Native](https://facebook.github.io/react-native/) and it consumes data directly from the meetup.com API.

## Setup

Before, you need to follow the requirements of React-Native described on the ["Getting Started"](https://facebook.github.io/react-native/docs/getting-started.html#content) page.

```bash
git clone git@github.com:orleans-tech/public-ios-app.git
cd public-ios-app
npm install
```

The application needs an API Key to work, so, don't forget [to get yours directly on meetup.com](https://secure.meetup.com/meetup_api/key/) and replace the placeholder text 'enter-your-api-key' with it inside the file 'src/lib/Configuration.js'.

Then, click on the orleanstech.xcodeproj to launch Xcode or type the command below.

```bash
open orleanstech.xcodeproj/
```

And to finish, just click on the "Build and run" button.

## Contribute

Don't hesitate to contribute. We using the classic workflow of Pull-Request.
