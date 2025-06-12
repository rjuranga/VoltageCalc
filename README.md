# 480Y/277V Electrical Calculators

A lightweight static web tool for basic electrical calculations. It helps convert
between Volt‑Amperes (VA) and Amps, and provides circuit breaker and wire size
recommendations.

## Features
- **Conversion tools:** VA → Amps and Amps → VA for 277V single‑phase, 480V single‑phase, and 480V three‑phase systems.
- **Circuit Breaker & Wire Size:** Uses predefined ranges in `vaRanges.js` to suggest appropriate breaker sizes and wire gauges.
- **Clipboard Helper:** Quickly copy the AWG configuration from the results.

## Usage
1. Clone or download this repository.
2. Open `index.html` in a modern web browser (or serve the files with any static web server).
3. Use the tabs to switch between calculators and enter your values. Results update automatically.

## File Overview
- `index.html` – Page layout with conversion forms and circuit breaker calculator.
- `main.js` – Handles form logic, calculations, and UI updates.
- `vaRanges.js` – Lookup data for breaker and wire size recommendations.
- `styles.css` – Basic styling for the interface.

## Customizing
Update the tables in `vaRanges.js` if you need different VA ranges or wire sizes.

## License
Distributed under the [GNU General Public License v3.0](LICENSE).
