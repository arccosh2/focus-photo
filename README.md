# Focus Photo

## 概要

写真用のポートフォリオサイト
[Focus Photo](https://focus-photo.vercel.app/)

<img width="1393" alt="Image" src="https://github.com/user-attachments/assets/4126448d-0ab8-433e-bc36-fa2d2e368ee9" />

### 👉 使用技術

- Astro v4.11.5
- React v18.3.1
- TypeScript v5.5.3
- Panda CSS v0.51.1
- microcms-js-sdk v3.1.2
- Vercel（hosting）

#### 技術選定理由

- Astro
  - パフォーマンスの観点から、インタラクティブな箇所と静的な箇所それぞれで使用する技術を分けたかったため。また、ViewTransitionを用いたページ遷移のアニメーションを簡単に実装できることからAstroを採用
- Panda CSS
  - 開発効率を上げるためにライブラリを使用したかった。ゼロランタイムCSSに興味もあり、Panda CSSを採用。

### 🚀 ディレクトリ構成

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├──assets
│   │   └── 2020...
│   ├── components/
│   │   └── Cards.astro...
│   ├── layouts/
│   │   └── BaseLayout.astro...
│   ├── library/
│   │   └── microcms.ts
│   ├── pages/
│   │   └── index.astro...
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── constants.ts
└── package.json
```

### 🧞 こだわったこと・難しかったこと・これからの展望

#### こだわったこと

SP用の表示とPC用の表示で、レイアウトを大幅に変えた。</br>
PC上ではなるべく写真を大きく見せたかったことから、スライド形式のレイアウトにした。一方でスマホでは、一覧性を担保するためにグリッド上のレイアウトにした。

#### 難しかったこと

レスポンシブ対応が難しかった。</br>
ある程度の画面幅には対応できていると思うが、改善の余地はあると思う。

#### これからの展望

コンポーネントを共通化したり、コンテンツが増えたらページングも実装したい。タグごとに検索できるような機能も追加したい。
