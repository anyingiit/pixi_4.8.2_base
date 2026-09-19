<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# pixi_4.8.2_base

A minimal PixiJS 4.8.2 browser demo where a plane tracks the mouse on a fixed canvas and auto-fires bullets upward, with a pause button that dims the scene behind a translucent mask until resumed.

**English** · [简体中文](README.zh-CN.md)

[![CI](https://github.com/anyingiit/pixi_4.8.2_base/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/pixi_4.8.2_base/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/pixi_4.8.2_base)](LICENSE)

[Report a bug](https://github.com/anyingiit/pixi_4.8.2_base/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/anyingiit/pixi_4.8.2_base/issues/new?template=feature_request.yml)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

pixi_4.8.2_base is a small scene rendered with [pixi.js](https://pixijs.com/) 4.8.2, kept at a pinned version alongside its matching `@types/pixi.js`. `src/js/index.ts` wraps the renderer in a `MyPIXI` helper and builds one interactive scene on top of it: a plane sprite follows the mouse across a fixed 512x768 canvas, and a ticker callback fires a bullet sprite upward at a steady cadence, removing each one once it scrolls off the top.

A pause button in the corner swaps in a translucent mask sprite and a continue button, freezing the ticker's effect on the scene until the player clicks to resume. There are no enemies, scoring or pickups here -- as the name says, this is the base scene the interaction was built on, not the full game.

The repository ships two things side by side: `src/` is the source the build compiles from, and `docs/` is a pre-built copy (bundle and assets) kept there so GitHub Pages can serve the demo directly without a build step.

## Getting Started

### Prerequisites

- Node.js and npm, to install the dependencies `package.json` declares --
  pixi.js itself plus the webpack toolchain (`webpack`, `ts-loader`,
  `html-webpack-plugin`, `copy-webpack-plugin`, `clean-webpack-plugin`,
  `image-minimizer-webpack-plugin`) that turns `src/` into a runnable bundle

### Installation

```sh
git clone https://github.com/anyingiit/pixi_4.8.2_base.git
cd pixi_4.8.2_base
npm install
```

The repository also commits `yarn.lock`; `yarn install` reads it directly and
is what continuous integration uses for a reproducible build.

## Usage

Run the development server, which rebuilds on save and serves the demo with source maps:

```sh
npm run dev
```

Open `http://localhost:9000` in a browser -- move the mouse over the canvas to steer the plane, and click the pause icon in the corner to freeze the scene.

To build the production bundle into `dist/` and preview exactly what ships:

```sh
npm run build
npm run start
```

`npm run start` serves `dist/` with `http-server`, which prints the local URL it picked (`http://localhost:8080` by default).

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open an issue or a pull request, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standards expected of everyone taking part.

Please do not report security issues in public issues or pull requests. [SECURITY.md](SECURITY.md) explains how to report them privately.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Project link: [https://github.com/anyingiit/pixi_4.8.2_base](https://github.com/anyingiit/pixi_4.8.2_base)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
