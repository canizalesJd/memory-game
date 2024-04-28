# Memoji

Memoji is a simple yet engaging memory game built on React. The objective is to click on each emoji only once without repeating any. It's a fun way to test and improve your memory skills.

![memoji](https://github.com/canizalesJd/memory-game/assets/62571804/2a5f6386-e297-43d8-9375-2d3821f22a13)

## How to Play

1. The game starts with a grid of randomly placed emojis.
2. Click on any emoji (but just once 🗿).
3. Continue clicking on different emojis, trying not to click on the same one twice.
4. The game ends when you click on a repeated emoji.
5. Your score is displayed at the top, along with your best score.
6. Try to beat your best score by playing again!

## Features

- Randomized emoji placement on each new game.
- Score tracking with best score display.
- Simple and intuitive user interface.
- Fun and engaging gameplay for all ages.

## Getting Started

To run the game locally, follow these steps:

1. Clone this repository: `git clone git@github.com:canizalesJd/memory-game.git`
2. Navigate to the project directory: `cd memory-game`
3. Create a .env file and add your API url and key:
```
VITE_API_URL=https://emoji-api.com/emojis?access_key=
VITE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
- You can get your API key at [Open Emoji API](https://emoji-api.com/).
4. Run `npm install` && `npm run dev` and open `http://localhost:5173/`

Alternatively, you can play the game online by visiting [the live demo]([https://your-username.github.io/memoji/](https://memory-game-ruddy-nine.vercel.app/)]).

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## Acknowledgments

- Emojis API provided by [Open Emoji API](https://emoji-api.com/).
- Tailwind Animations by [midudev](https://github.com/midudev/tailwind-animations).
- Inspiration and guidance by [theodinproject](https://www.theodinproject.com/dashboard).

Have fun playing Memoji!
