# XLImageGen

[![Deploy with GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://empirefx.github.io/XLImageGen)

XLImageGen is a Vite-based project for generating large, title-stamped images using Web Workers and OffscreenCanvas. The project features a modular design with customizable dimensions and preset sizes for quick testing.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/empirefx/XLImageGen.git
   cd your-repo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Development
Start the development server with:
   ```bash
   npm run dev
   ```

## Build and Deploy
   ```bash
   npm run build
   npm run deploy
   ```

## Project Structure
- **index.html:** Contains the UI and input fields for custom dimensions.
- **main.js:** Handles DOM interactions, preset button logic, and initializes the worker.
- **worker/worker.js:** The worker script that imports the image generation module.
- **lib/XLImageGen.js:** Main `XLImageGen` class for drawing logic.

## License
This project is licensed under the MIT License.