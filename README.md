# 2 players Chess game

### Contents of this file
- Description
- Installation
- Usage
- Documentation

## Description

- This website allows 2 players to play chess in real time. To achieve this, I used websockets. As for the game itself, I used chessboardjsx and chess.js to create the board and the logic of the game and movement validation.

## Installation

Here are the steps you need to follow to clone this repository: 

1. Install Git:
If you don't have Git installed, download and install it from https://git-scm.com/.

2. Navigate to the directory where you want to clone the repository. In your terminal, type: 

```sh
cd path/to/your/directory
```
or you can directly open the built-in terminal from VSCode.

3. Clone the reporitory, using: 
```sh
git clone "https://github.com/Luisa-Elena/Chess-game.git"
```

4. Install the dependencies: 
```sh
cd Chess-game
cd server
npm install
cd ../chess-game
npm install
```

5. In order to  run the project, you can split the built-in terminal from VSCode. Use one to navigate in the client folder, and the other one to navigate in the server folder
6. To run the server side, type:
```sh
npm run dev
```
7. To run the client side, type:
```sh
npm start
```

## Usage
- At the first run, it is assumed that a user started the game and it is assigned with the color white.
- After opening the website in another tab, it is assumed that this is the second player connected and he has to play with black.
- The game ends when one of the users wins.
