# iOS-Style Calculator

A sleek, fully responsive web calculator that visually and functionally recreates the native iOS calculator app. This project blends complex string-parsing math logic with a smooth, premium user experience.

## 🚀 Live Demo & Key Features

* **Authentic iOS Interface:** Deep graphite and vibrant orange color palettes, perfectly round buttons, and crisp Apple system fonts.
* **Ultra-Smooth Animations:** Custom cubic-bezier curves for a "springy" scale-up effect and dynamic button brightening upon click.
* **Advanced Math Logic (Stress-Tested):**
  * Flawless percentage chain calculations (handles complex discounts and real-time syntax parsing).
  * Robust repeat-equals functionality (the `=` button sequentially duplicates the last operation).
  * Built-in protection against duplicate leading zeros (anti-"007" bug) and incorrect syntax placement.
  * Smart rounding for long floating-point decimals and clean division-by-zero handling ("Ошибка").
* **Live page here:https://paravrp-cmyk.github.io/Calculator-project/**

## 🛠 Tech Stack

* **HTML5** – Semantic markup and crisp inline SVG iconography.
* **CSS3 (Flexbox)** – Scalable button grid built with `calc()`, container-isolated layout to prevent fullscreen stretching, and advanced transitions.
* **Vanilla JavaScript** – Dynamic expression parsing, calculator state machine, and extensive edge-case handling.