
<h1 align="center">
  Logos(λὀγος) AI
</h1>

<h4 align="center">A Greek-English interlinear New Testament reader desktop app built on top of <a href="http://electron.atom.io" target="_blank">Electron</a>.</h4>

<img width="1136" alt="Screenshot 2025-02-24 at 20 16 06" src="https://github.com/user-attachments/assets/9d16b92a-558b-40aa-8cc3-d96d36cb2853" />

## Key Features

* Reader 📖
  - Read through interlinear Greek and English text from the New Testament
  - Text-to-speech functionality to help with pronunciation
  - Note taking with each verse
 
* Ask AI ✨
  - AI functionality that allows you to highlight words that you would like to know more about
  - Breaks down grammar usage and morphology for the reader

* Cross platform 🍎🪟🐧
  - Configure for Windows, macOS and Linux platforms where desired.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/pauullamm/logos-ai.git

# Go into the repository
$ cd logos-ai

# Install dependencies
$ npm install
$ cd ../server && npm install

# Run the app (in separate terminals)
$ npm run dev
$ cd server && node server.js
```

To build the desktop app, run the following commands:

```bash
# Make sure you have a build folder with the icons for your application in them
$ npm run build && npm run dist
# This creates the application in the root folder called dist where the executable file is located
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## License

MIT


