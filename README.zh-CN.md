[English](README.md) · **简体中文**

> 英文版是规范版本。本页与 [README.md](README.md) 不一致时，以英文版为准。

<!-- translation-of: README.md sha256:0c7df3c68f120a17 -->

<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# pixi_4.8.2_base

一个基于 PixiJS 4.8.2 的极简浏览器示例：飞机精灵在固定画布上跟随鼠标移动，并自动向上发射子弹；点击暂停按钮会在场景上覆盖一层半透明遮罩，直到恢复才继续。

[![CI](https://github.com/anyingiit/pixi_4.8.2_base/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/pixi_4.8.2_base/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/pixi_4.8.2_base)](LICENSE)

[报告问题](https://github.com/anyingiit/pixi_4.8.2_base/issues/new?template=bug_report.yml) · [提出需求](https://github.com/anyingiit/pixi_4.8.2_base/issues/new?template=feature_request.yml)

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#about-the-project">关于本项目</a></li>
    <li><a href="#getting-started">开始使用</a></li>
    <li><a href="#usage">用法</a></li>
    <li><a href="#contributing">参与贡献</a></li>
    <li><a href="#license">许可证</a></li>
    <li><a href="#contact">联系方式</a></li>
  </ol>
</details>

## 关于本项目

pixi_4.8.2_base 是一个用 [pixi.js](https://pixijs.com/) 4.8.2 渲染的小场景，版本被固定住，并配有匹配版本的 `@types/pixi.js`。`src/js/index.ts` 用一个 `MyPIXI` 辅助类封装渲染器，并在此之上构建了一个交互场景：飞机精灵在固定的 512x768 画布上跟随鼠标移动，ticker 回调以固定节奏向上发射子弹精灵，子弹滚出画布顶部后即被移除。

角落里的暂停按钮会切入一个半透明遮罩精灵和一个继续按钮，冻结 ticker 对场景的效果，直到玩家点击恢复。这里没有敌机、计分或道具——正如其名，这只是交互功能所依托的基础场景，而不是完整的游戏。

仓库中并列保留了两份内容：`src/` 是构建所编译的源码，`docs/` 是预先构建好的副本（打包文件与素材），放在这里是为了让 GitHub Pages 无需构建步骤即可直接提供该示例。

## 开始使用

### 环境要求

- Node.js 与 npm，用于安装 `package.json` 声明的依赖——pixi.js 本身，以及把
  `src/` 转换为可运行打包文件的 webpack 工具链（`webpack`、`ts-loader`、
  `html-webpack-plugin`、`copy-webpack-plugin`、`clean-webpack-plugin`、
  `image-minimizer-webpack-plugin`）

### 安装

```sh
git clone https://github.com/anyingiit/pixi_4.8.2_base.git
cd pixi_4.8.2_base
npm install
```

仓库中还提交了 `yarn.lock`；`yarn install` 会直接读取它，持续集成也正是用它
来保证构建可复现。

## 用法

启动开发服务器，它会在保存时自动重新构建，并携带 source map 提供该示例：

```sh
npm run dev
```

在浏览器中打开 `http://localhost:9000`——将鼠标移到画布上以操控飞机，点击角落的暂停图标可冻结场景。

要将生产环境打包文件构建到 `dist/` 并预览最终发布的内容：

```sh
npm run build
npm run start
```

`npm run start` 使用 `http-server` 提供 `dist/` 目录，它会打印所选用的本地地址（默认是 `http://localhost:8080`）。

## 参与贡献

欢迎参与。[CONTRIBUTING.md](CONTRIBUTING.md) 说明如何提交 issue 或 pull request，[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明对所有参与者的行为要求。

请不要在公开的 issue 或 pull request 中报告安全问题。[SECURITY.md](SECURITY.md) 说明了私下报告的方式。

## 许可证

以 MIT 许可证分发。详见 [LICENSE](LICENSE)。

## 联系方式

项目地址：[https://github.com/anyingiit/pixi_4.8.2_base](https://github.com/anyingiit/pixi_4.8.2_base)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
