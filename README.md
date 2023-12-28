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

## Documentation
### Client side
#### App component
- The App component is the main component responsible for rendering the chessboard, managing the game state, and handling user moves in a real-time multiplayer environment.
- Socket.IO Integration
    - Uses Socket.IO to establish a real-time connection with the server.
    - Listens for 'move', 'assignColor', and 'message' events from the server.
    - Updates the game state and FEN string based on the received move information.
    - Assigns a color to the player and displays turn notifications or additional messages.
- States:
    - fen: Represents the current position of the chess pieces on the board using Forsyth-Edwards Notation (FEN).
    - color: Represents the color (black or white) assigned to the current player.
    - text: Represents additional text information (turn notifications or game outcome messages)
- useRef: game is Chess object reference created using the chess.js library, responsible for managing the chess game logic. It is initialized using the Chess constructor from the chess.js library.
- onDrop function
    - Handles the logic when a chess piece is dropped/moved on the board.
    - Checks if it's the player's turn based on the color assigned and sends the move information to the server using Socket.IO.
    - Updates the FEN string to reflect the new board position.
- Rendering
    - Renders the chessboard using the ChessBoard component from the chessboardjsx library.
    - Displays player information, turn notifications, and game outcome messages.
    - Conditionally renders the outcome message if the game is over.

### Server side
- Server Configuration
    - Sets up an Express app and HTTP server.
    - Configures Socket.IO with CORS settings to allow communication with the frontend application running on http://localhost:3000.
    - Listens for incoming connections on port 3001.
- Socket.IO Connection Handling
    - Increments a counter (cnt) to determine the order of connection.
     -Emits the 'assignColor' event to the connected client, assigning 'white' or 'black' as the player's color based on the connection order.
    - Listens for 'move' events from clients, broadcasting the move to other connected player.
    - Listens for 'disconnect' events, handling disconnection by resetting the counter and broadcasting a message to the remaining player.
