# Shiromi-Web - Giao Diện Tra Cứu Dữ Liệu Quét Discord ᓚᘏᗢ

<!-- Vietnamese -->
<details>
<summary>🇻🇳 Tiếng Việt</summary>

## Giới thiệu

Shiromi-Web là một giao diện người dùng (UI) web được thiết kế để hiển thị và tra cứu dữ liệu được thu thập bởi Shiromi Discord bot từ các lần quét máy chủ Discord. Dự án này cho phép người dùng dễ dàng xem thống kê hoạt động của thành viên, tìm kiếm người dùng cụ thể và khám phá các bảng xếp hạng trong server.

Main project : ---> https://github.com/Rin1809/Shiromi/


**Kiến trúc dự án:**

*   **Backend:** Một server Node.js sử dụng Express.js, giao tiếp với cơ sở dữ liệu PostgreSQL để lấy dữ liệu quét.
*   **Frontend:** Một ứng dụng React (sử dụng Vite và TypeScript) cung cấp giao diện người dùng tương tác trong trình duyệt, với hiệu ứng hạt (particles) và chủ đề "Vũ Trụ & Catppuccin Macchiato".


## Tính năng

*   **Tra cứu dữ liệu quét:** Xem thông tin chi tiết từ lần quét gần nhất của bot Shiromi cho một Guild Discord cụ thể.
*   **Tìm kiếm người dùng:** Dễ dàng tìm kiếm người dùng theo tên hoặc ID Discord của họ.
*   **Danh sách tất cả người dùng:** Hiển thị danh sách tất cả người dùng (không phải bot) có trong dữ liệu quét, được sắp xếp theo tên.
*   **Thống kê chi tiết:**
    *   Thông tin cơ bản: Tên hiển thị, ID người dùng, avatar, trạng thái bot.
    *   Số liệu tin nhắn: Tổng tin nhắn, link, ảnh, sticker, file khác.
    *   Tương tác: Số lượt trả lời, mentions gửi/nhận, reactions thả/nhận.
    *   Hoạt động: Số kênh/luồng hoạt động, thời gian hoạt động đầu tiên/cuối cùng, tổng thời gian hoạt động.
*   **Bảng xếp hạng & Thành tích:** Hiển thị thứ hạng của người dùng trong server cho các hạng mục khác nhau (ví dụ: tin nhắn nhiều nhất, hoạt động lâu nhất) và các thành tích nổi bật khác.
*   **Giao diện người dùng động & hấp dẫn:**
    *   Hoạt ảnh giới thiệu (intro animations).
    *   Nền hạt (particle background) sử dụng `tsparticles`.
    *   Chủ đề màu sắc "Vũ Trụ & Catppuccin Macchiato".
    *   Thiết kế responsive cho các kích thước màn hình khác nhau.
*   **Phân trang URL:** Truy cập dữ liệu quét của các server khác nhau thông qua đường dẫn `/scan/:guildId`.

## Công nghệ sử dụng

*   **Frontend:** React, Vite, TypeScript, React Router, tsparticles, CSS Modules/CSS thuần.
*   **Backend:** Node.js, Express.js.
*   **Database:** PostgreSQL (kết nối qua `pg` driver).
*   **Styling:** CSS Variables, Flexbox, Grid.

## Điều kiện tiên quyết

Trước khi cài đặt, bạn cần đảm bảo đã cài đặt các phần mềm sau:

1.  **Node.js và npm:** Phiên bản LTS (Long Term Support) được khuyến nghị. `npm` thường đi kèm với Node.js.
    *   Tải Node.js: [https://nodejs.org/](https://nodejs.org/)
2.  **Git:** Để tải mã nguồn từ GitHub.
    *   Tải Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)
3.  **Cơ sở dữ liệu PostgreSQL:** Cần có một instance PostgreSQL đang chạy và có thể truy cập được. Backend sẽ kết nối tới nó thông qua chuỗi kết nối được cung cấp trong file `.env`.

## Cài đặt

1.  **Tải mã nguồn:**
    ```bash
    git clone https://github.com/Rin1809/Shiromi-searchweb
    cd shiromi-web
    ```

2.  **Cài đặt Backend:**
    *   Điều hướng đến thư mục `server`: `cd server`
    *   Cài đặt các dependencies: `npm install`
    *   Tạo file `.env` trong thư mục `server` và cấu hình các biến môi trường cần thiết. Tối thiểu bạn cần `DATABASE_URL`. Bạn có thể tham khảo file `server/.env` trong tài liệu dự án:
        ```env
        DATABASE_URL=postgresql://user:password@host:port/database
        PORT=3001 # Tùy chọn, mặc định là 3001
        ```

3.  **Cài đặt Frontend:**
    *   Điều hướng đến thư mục `client` từ thư mục gốc của dự án: `cd ../client` (nếu bạn đang ở `server`) hoặc `cd client` (nếu bạn đang ở gốc `shiromi-web`).
    *   Cài đặt các dependencies: `npm install`

## Chạy ứng dụng

1.  **Chạy Backend Server:**
    *   Mở terminal, điều hướng đến thư mục `server`.
    *   Chạy lệnh: `npm start` (để chạy bản production) hoặc `npm run dev` (để chạy với nodemon cho development, tự động khởi động lại khi có thay đổi code).
    *   Theo mặc định, server backend sẽ chạy trên cổng `3001` (hoặc cổng bạn đã cấu hình trong `server/.env`).

2.  **Chạy Frontend Development Server:**
    *   Mở một terminal **khác**, điều hướng đến thư mục `client`.
    *   Chạy lệnh: `npm run dev`
    *   Frontend development server (Vite) thường sẽ chạy trên cổng `5173` (hoặc một cổng khác nếu 5173 đã được sử dụng). Vite sẽ thông báo URL truy cập trong terminal.

3.  **Truy cập ứng dụng:**
    *   Mở trình duyệt web và truy cập vào địa chỉ mà Vite cung cấp (thường là `http://localhost:5173`).
    *   Để xem dữ liệu của một server cụ thể, hãy truy cập đường dẫn có dạng: `http://localhost:5173/scan/:guildId` (thay `:guildId` bằng ID thực của server Discord).

## Hướng dẫn sử dụng

1.  **Truy cập trang quét:** Điều hướng đến URL `http://your-frontend-url/scan/GUILD_ID_HERE`, thay `GUILD_ID_HERE` bằng ID của server Discord bạn muốn xem.
2.  **Xem hiệu ứng Intro:** Khi trang tải, bạn sẽ thấy một chuỗi hiệu ứng giới thiệu ngắn gọn.
3.  **Tìm kiếm người dùng:**
    *   Sử dụng thanh tìm kiếm ở giữa màn hình để nhập tên hoặc ID của người dùng bạn muốn tra cứu.
    *   Nhấn nút tìm kiếm (biểu tượng kính lúp) hoặc phím `Enter`.
    *   Kết quả (nếu có) sẽ được hiển thị bên dưới.
4.  **Hiển thị tất cả người dùng:**
    *   Nhấn vào nút có biểu tượng mũi tên xuống (toggle button) bên dưới thanh tìm kiếm.
    *   Một danh sách tất cả người dùng không phải bot từ lần quét gần nhất sẽ hiện ra.
    *   Bạn có thể nhấp vào một người dùng trong danh sách này để tự động điền tên họ vào thanh tìm kiếm và thực hiện tìm kiếm.
5.  **Xem thông tin chi tiết:**
    *   Thông tin chi tiết của người dùng tìm thấy sẽ được hiển thị trong một thẻ (card) bao gồm avatar, tên, ID, và các số liệu thống kê, xếp hạng, thành tích.
    *   Nếu tìm kiếm trả về nhiều người dùng (ví dụ, tìm theo tên), mỗi người dùng sẽ có một thẻ riêng.

## Cấu trúc thư mục
```
Shiromi-web/
├── .git/
├── client/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   │   ├── styles/
│   │   │   │   ├── App.css
│   │   │   │   ├── index.css
│   │   │   │   ├── SearchBar.css
│   │   │   │   ├── UserInfoDisplay.css
│   │   │   │   ├── UserSuggestionList.css
│   │   │   │   ├── UserSuggestions.css
│   │   │   ├── SearchBar.tsx
│   │   │   ├── UserInfoDisplay.tsx
│   │   │   ├── UserSuggestionItem.tsx
│   │   │   ├── UserSuggestionList.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── server/
│   ├── node_modules/
│   ├── src/
│   │   ├── api.js
│   │   ├── db.js
│   │   ├── server.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
├── .gitignore
├── package-lock.json  # (Root level, có thể không cần thiết nếu client/server tự quản lý)
```

## Lưu ý

*   **Nguồn dữ liệu:** Dữ liệu hiển thị trên Shiromi-Web phụ thuộc vào lần quét hoàn chỉnh và có thể truy cập web gần nhất được thực hiện bởi bot Shiromi cho guild được chỉ định. Tính chính xác và cập nhật của dữ liệu dựa trên tần suất và kết quả của các lần quét đó.
*   **Mục đích:** Dự án này được xây dựng cho mục đích thông tin và tra cứu.

</details>

<!-- English -->
<details>
<summary>🇬🇧 English</summary>

## Introduction

Shiromi-Web is a web-based user interface (UI) designed to display and look up data collected by the Shiromi Discord bot from Discord server scans. This project allows users to easily view member activity statistics, search for specific users, and explore server rankings.

Main project : ---> https://github.com/Rin1809/Shiromi/

**Project Architecture:**

*   **Backend:** A Node.js server using Express.js, which communicates with a PostgreSQL database to retrieve scan data.
*   **Frontend:** A React application (built with Vite and TypeScript) that provides an interactive user interface in the browser, featuring particle effects and a "Cosmic & Catppuccin Macchiato" theme.

The project's thematic name "Hôm qua ᓚᘏᗢ | きのう" (Yesterday) reflects that the displayed data is from past scans.

## Features

*   **Scan Data Lookup:** View detailed information from the latest scan performed by the Shiromi bot for a specific Discord Guild.
*   **User Search:** Easily search for users by their Discord name or ID.
*   **Show All Users List:** Display a list of all non-bot users present in the scan data, sorted by name.
*   **Detailed Statistics:**
    *   Basic info: Display name, user ID, avatar, bot status.
    *   Message metrics: Total messages, links, images, stickers, other files.
    *   Interactions: Reply count, mentions sent/received, reactions given/received.
    *   Activity: Distinct channels/threads active in, first/last seen time, total activity span.
*   **Rankings & Achievements:** Show user rankings within the server for various categories (e.g., most messages, longest activity) and other notable achievements.
*   **Dynamic & Engaging UI:**
    *   Introductory animations.
    *   Particle background using `tsparticles`.
    *   "Cosmic & Catppuccin Macchiato" color theme.
    *   Responsive design for various screen sizes.
*   **URL-based Navigation:** Access scan data for different servers via the `/scan/:guildId` path.

## Technology Stack

*   **Frontend:** React, Vite, TypeScript, React Router, tsparticles, CSS Modules/Plain CSS.
*   **Backend:** Node.js, Express.js.
*   **Database:** PostgreSQL (connected via `pg` driver).
*   **Styling:** CSS Variables, Flexbox, Grid.

## Prerequisites

Before installation, ensure you have the following software installed:

1.  **Node.js and npm:** The LTS (Long Term Support) version is recommended. `npm` usually comes bundled with Node.js.
    *   Download Node.js: [https://nodejs.org/](https://nodejs.org/)
2.  **Git:** To clone the source code from GitHub.
    *   Download Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)
3.  **PostgreSQL Database:** A running and accessible PostgreSQL instance is required. The backend connects to it via a connection string provided in an `.env` file.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://your-repository-url/shiromi-web.git
    cd shiromi-web
    ```
    *(Replace `https://your-repository-url/shiromi-web.git` with your actual repository URL).*

2.  **Backend Setup:**
    *   Navigate to the `server` directory: `cd server`
    *   Install dependencies: `npm install`
    *   Create an `.env` file in the `server` directory and configure the necessary environment variables. At a minimum, you need `DATABASE_URL`. You can refer to the `server/.env` file in the project documentation:
        ```env
        DATABASE_URL=postgresql://user:password@host:port/database
        PORT=3001 # Optional, defaults to 3001
        ```

3.  **Frontend Setup:**
    *   Navigate to the `client` directory from the project root: `cd ../client` (if you are in `server`) or `cd client` (if you are at the `shiromi-web` root).
    *   Install dependencies: `npm install`

## Running the Application

1.  **Run the Backend Server:**
    *   Open a terminal and navigate to the `server` directory.
    *   Run the command: `npm start` (for production) or `npm run dev` (for development with nodemon, which auto-restarts on code changes).
    *   By default, the backend server will run on port `3001` (or the port you configured in `server/.env`).

2.  **Run the Frontend Development Server:**
    *   Open **another** terminal and navigate to the `client` directory.
    *   Run the command: `npm run dev`
    *   The Vite frontend development server will typically run on port `5173` (or another port if 5173 is in use). Vite will display the access URL in the terminal.

3.  **Access the Application:**
    *   Open your web browser and go to the address provided by Vite (usually `http://localhost:5173`).
    *   To view data for a specific server, navigate to a path like: `http://localhost:5173/scan/:guildId` (replace `:guildId` with the actual Discord server ID).

## Usage Guide

1.  **Access the Scan Page:** Navigate to the URL `http://your-frontend-url/scan/GUILD_ID_HERE`, replacing `GUILD_ID_HERE` with the ID of the Discord server you want to view.
2.  **Watch the Intro Animation:** As the page loads, you'll see a short introductory animation sequence.
3.  **Search for Users:**
    *   Use the search bar in the center of the screen to enter the name or ID of the user you want to look up.
    *   Click the search button (magnifying glass icon) or press `Enter`.
    *   Results (if any) will be displayed below.
4.  **Show All Users:**
    *   Click the button with the down-arrow icon (toggle button) located below the search bar.
    *   A list of all non-bot users from the latest scan will appear.
    *   You can click a user in this list to auto-fill their name into the search bar and perform a search.
5.  **View Detailed Information:**
    *   Detailed information for a found user will be displayed in a card, including their avatar, name, ID, various statistics, rankings, and achievements.
    *   If the search returns multiple users (e.g., when searching by name), each user will have their own card.

## Folder Structure
```
Shiromi-web/
├── .git/
├── client/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   │   ├── styles/
│   │   │   │   ├── App.css
│   │   │   │   ├── index.css
│   │   │   │   ├── SearchBar.css
│   │   │   │   ├── UserInfoDisplay.css
│   │   │   │   ├── UserSuggestionList.css
│   │   │   │   ├── UserSuggestions.css
│   │   │   ├── SearchBar.tsx
│   │   │   ├── UserInfoDisplay.tsx
│   │   │   ├── UserSuggestionItem.tsx
│   │   │   ├── UserSuggestionList.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── server/
│   ├── node_modules/
│   ├── src/
│   │   ├── api.js
│   │   ├── db.js
│   │   ├── server.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
├── .gitignore
├── package-lock.json  # (Root level, may not be needed if client/server manage their own)
```

## Notes

*   **Data Source:** The data displayed on Shiromi-Web is dependent on the last completed and web-accessible scan performed by the Shiromi bot for the specified guild. The accuracy and recency of the data are based on the frequency and outcome of these scans.
*   **Purpose:** This project is built for informational and lookup purposes.

</details>

<!-- Japanese -->
<details>
<summary>🇯🇵 日本語</summary>

## 概要

Shiromi-Webは、Shiromi DiscordボットがDiscordサーバーのスキャンから収集したデータを表示および検索するために設計されたWebベースのユーザーインターフェース（UI）です。このプロジェクトにより、ユーザーはメンバーのアクティビティ統計を簡単に表示したり、特定のユーザーを検索したり、サーバー内のランキングを探索したりできます。

Main project : ---> https://github.com/Rin1809/Shiromi/

**プロジェクト構成:**

*   **バックエンド:** Express.jsを使用したNode.jsサーバーで、PostgreSQLデータベースと通信してスキャンデータを取得します。
*   **フロントエンド:** Reactアプリケーション（ViteとTypeScriptで構築）で、ブラウザでインタラクティブなユーザーインターフェースを提供し、パーティクルエフェクトと「宇宙＆Catppuccin Macchiato」テーマが特徴です。

プロジェクトのテーマ名「Hôm qua ᓚᘏᗢ | きのう」（昨日）は、表示されるデータが過去のスキャンからのものであることを反映しています。

## 機能

*   **スキャンデータ検索:** 特定のDiscordギルドに対してShiromiボットが実行した最新のスキャンからの詳細情報を表示します。
*   **ユーザー検索:** Discord名またはIDでユーザーを簡単に検索します。
*   **全ユーザーリスト表示:** スキャンデータに存在するすべての非ボットユーザーを名前順でリスト表示します。
*   **詳細統計:**
    *   基本情報: 表示名、ユーザーID、アバター、ボットステータス。
    *   メッセージメトリクス: 総メッセージ数、リンク、画像、スタンプ、その他ファイル数。
    *   インタラクション: 返信数、送受信メンション数、送受信リアクション数。
    *   アクティビティ: アクティブなチャンネル/スレッド数、初回/最終確認日時、総アクティビティ期間。
*   **ランキングと実績:** 様々なカテゴリ（例: 最多メッセージ、最長アクティビティ）におけるサーバー内でのユーザーランキングやその他の注目すべき実績を表示します。
*   **ダイナミックで魅力的なUI:**
    *   イントロアニメーション。
    *   `tsparticles`を使用したパーティクル背景。
    *   「宇宙＆Catppuccin Macchiato」カラーテーマ。
    *   様々な画面サイズに対応するレスポンシブデザイン。
*   **URLベースのナビゲーション:** `/scan/:guildId`パスを介して異なるサーバーのスキャンデータにアクセスします。

## 技術スタック

*   **フロントエンド:** React, Vite, TypeScript, React Router, tsparticles, CSS Modules/プレーンCSS.
*   **バックエンド:** Node.js, Express.js.
*   **データベース:** PostgreSQL (`pg`ドライバ経由で接続).
*   **スタイリング:** CSS Variables, Flexbox, Grid.

## 前提条件

インストールする前に、以下のソフトウェアがインストールされていることを確認してください。

1.  **Node.js と npm:** LTS (Long Term Support) バージョンを推奨します。`npm` は通常Node.jsにバンドルされています。
    *   Node.jsのダウンロード: [https://nodejs.org/](https://nodejs.org/)
2.  **Git:** GitHubからソースコードをクローンするために必要です。
    *   Gitのダウンロード: [https://git-scm.com/downloads](https://git-scm.com/downloads)
3.  **PostgreSQL データベース:** 実行中でアクセス可能なPostgreSQLインスタンスが必要です。バックエンドは`.env`ファイルで提供される接続文字列を介して接続します。

## インストール

1.  **リポジトリのクローン:**
    ```bash
    git clone https://your-repository-url/shiromi-web.git
    cd shiromi-web
    ```
    *( `https://your-repository-url/shiromi-web.git` を実際のリポジトリURLに置き換えてください。)*

2.  **バックエンドのセットアップ:**
    *   `server` ディレクトリに移動します: `cd server`
    *   依存関係をインストールします: `npm install`
    *   `server` ディレクトリに `.env` ファイルを作成し、必要な環境変数を設定します。最低限 `DATABASE_URL` が必要です。プロジェクトドキュメントの `server/.env` ファイルを参照できます:
        ```env
        DATABASE_URL=postgresql://user:password@host:port/database
        PORT=3001 # オプション、デフォルトは3001
        ```

3.  **フロントエンドのセットアップ:**
    *   プロジェクトルートから `client` ディレクトリに移動します: `cd ../client` (`server` ディレクトリにいる場合) または `cd client` (`shiromi-web` ルートにいる場合)。
    *   依存関係をインストールします: `npm install`

## アプリケーションの実行

1.  **バックエンドサーバーの実行:**
    *   ターミナルを開き、`server` ディレクトリに移動します。
    *   コマンドを実行します: `npm start` (本番用) または `npm run dev` (開発用、nodemonを使用しコード変更時に自動再起動)。
    *   デフォルトでは、バックエンドサーバーはポート `3001` (または `server/.env` で設定したポート) で実行されます。

2.  **フロントエンド開発サーバーの実行:**
    *   **別の**ターミナルを開き、`client` ディレクトリに移動します。
    *   コマンドを実行します: `npm run dev`
    *   Viteフロントエンド開発サーバーは通常ポート `5173` (または5173が使用中の場合は別のポート) で実行されます。ViteはターミナルにアクセスURLを表示します。

3.  **アプリケーションへのアクセス:**
    *   Webブラウザを開き、Viteが提供するアドレス (通常は `http://localhost:5173`) にアクセスします。
    *   特定のサーバーのデータを表示するには、 `http://localhost:5173/scan/:guildId` のようなパスにアクセスします (`:guildId` を実際のDiscordサーバーIDに置き換えてください)。

## 使用ガイド

1.  **スキャンページへのアクセス:** URL `http://your-frontend-url/scan/GUILD_ID_HERE` に移動します。`GUILD_ID_HERE` を表示したいDiscordサーバーのIDに置き換えてください。
2.  **イントロアニメーションの視聴:** ページが読み込まれると、短いイントロアニメーションシーケンスが表示されます。
3.  **ユーザー検索:**
    *   画面中央の検索バーを使用して、検索したいユーザーの名前またはIDを入力します。
    *   検索ボタン（虫眼鏡アイコン）をクリックするか、`Enter`キーを押します。
    *   結果（もしあれば）が下に表示されます。
4.  **全ユーザー表示:**
    *   検索バーの下にある下向き矢印アイコンのボタン（トグルボタン）をクリックします。
    *   最新のスキャンからの非ボットユーザー全員のリストが表示されます。
    *   このリスト内のユーザーをクリックすると、その名前が検索バーに自動入力され、検索が実行されます。
5.  **詳細情報の表示:**
    *   見つかったユーザーの詳細情報が、アバター、名前、ID、様々な統計、ランキング、実績を含むカードに表示されます。
    *   検索で複数のユーザーが返された場合（例: 名前で検索した場合）、各ユーザーは独自のカードを持ちます。

## フォルダ構造
```
Shiromi-web/
├── .git/
├── client/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   │   ├── styles/
│   │   │   │   ├── App.css
│   │   │   │   ├── index.css
│   │   │   │   ├── SearchBar.css
│   │   │   │   ├── UserInfoDisplay.css
│   │   │   │   ├── UserSuggestionList.css
│   │   │   │   ├── UserSuggestions.css
│   │   │   ├── SearchBar.tsx
│   │   │   ├── UserInfoDisplay.tsx
│   │   │   ├── UserSuggestionItem.tsx
│   │   │   ├── UserSuggestionList.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── server/
│   ├── node_modules/
│   ├── src/
│   │   ├── api.js
│   │   ├── db.js
│   │   ├── server.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
├── .gitignore
├── package-lock.json  # (ルートレベル、client/serverが独自に管理する場合は不要かもしれません)
```

## 注意事項

*   **データソース:** Shiromi-Webに表示されるデータは、指定されたギルドに対してShiromiボットが実行した、最後に完了しWebアクセス可能なスキャンに依存します。データの正確性と最新性は、これらのスキャンの頻度と結果に基づきます。
*   **目的:** このプロジェクトは情報提供および検索目的で構築されています。

</details>


## Image 1:

![image](https://github.com/user-attachments/assets/9173bcd7-841c-4479-9bab-f5832927aa1d)


![image](https://github.com/user-attachments/assets/da8d8a77-8bdf-4cc7-9ba6-8d5910c4e898)


