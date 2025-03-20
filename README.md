# League Companion

## Overview
League Companion is a web application designed to help League of Legends players track their stats, champion mastery, and overall progress. By integrating with Riot’s API, it provides real-time insights and useful data to enhance gameplay. Whether you're trying to improve your champion mastery, monitor your in-game challenges, or simply explore detailed champion stats, League Companion makes it easy.

This project is both a passion project and a way to showcase my development skills—working with APIs, managing state, and building an interactive front-end using **Next.js, Jotai, and Radix UI**.

## Features
- **Player Account Lookup** – Fetch player details using Riot ID.
- **Champion Mastery Tracking** – View and analyze champion progression.
- **Challenges Overview** – Track completed and in-progress challenges.
- **Champion Stats & Data** – Retrieve champion details using the Data Dragon API.
- **Modern UI/UX** – Built with Radix UI for a clean, accessible design.

## Technologies Used
- **Next.js** – React framework for building a fast, scalable web app.
- **Jotai** – State management for efficient data handling.
- **Radix UI** – Accessible and customizable UI components.
- **Riot Games API** – Fetches real-time player and champion data.
- **TypeScript** – Ensures type safety and scalability.

## APIs Used
- **Account API** – Fetches player data using Riot ID.
- **Champion Mastery API** – Retrieves champion progression data.
- **Challenges API** – Displays a player's in-game challenges.
- **Data Dragon API** – Provides champion information and images.

## Setup & Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/jamesbartnik/league-companion-app.git
   cd league-companion-app
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Riot API key:
   ```sh
   RIOT_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```sh
   yarn run dev
   ```

5. Open your browser and visit `http://localhost:3000`.

## Future Enhancements
- **Personalized Player Insights** – Generate gameplay recommendations based on performance.
- **Advanced Analytics** – Provide in-depth statistics and trends.
- **Mobile-Friendly Design** – Optimize for mobile users.
- **Expanded Data Integration** – Pull additional insights from Riot’s API.

## License
This project is licensed under the MIT License.

---

### Contact
For questions or feedback, feel free to reach out or open an issue on GitHub.

