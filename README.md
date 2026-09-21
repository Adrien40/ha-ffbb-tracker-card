[![Français](https://img.shields.io/badge/Langue-Fran%C3%A7ais-blue)](README.fr.md) [![English](https://img.shields.io/badge/Language-English-red)](#)

# FFBB Tracker Card for Home Assistant 🏀
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/Adrien40/ha-ffbb-tracker-card)](https://github.com/Adrien40/ha-ffbb-tracker-card/releases)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/Adrien40/ha-ffbb-tracker-card/blob/main/LICENSE)
[![Validate](https://github.com/Adrien40/ha-ffbb-tracker-card/actions/workflows/validate.yml/badge.svg)](https://github.com/Adrien40/ha-ffbb-tracker-card/actions/workflows/validate.yml)

A **modern and interactive Lovelace card** for Home Assistant designed specifically to display fixtures, live scores, standings, and match statistics for your teams tracked with the [FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker) integration.

*Inspired by official sports broadcast layouts and optimized for fast glanceability on mobile devices as well as wall-mounted dashboard tablets.*

<p align="center">
  <img src="https://raw.githubusercontent.com/Adrien40/ha-ffbb-tracker-card/refs/heads/main/docs/screenshots/card_preview.gif" width="485" alt="FFBB Tracker Card preview">
</p>

If you find this project useful, you can support its development 🙏

<a href="https://www.buymeacoffee.com/adrien40"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="160"></a>

---

## ⚡ Key Features

* 🏀 **Automatic Entity Resolution:** Pick any single sensor belonging to the team (next match, pool, standings...), the card automatically detects and binds all related entities.
* 🔄 **Dynamic Match Carousel:** Step through every match of the season with the navigation chevrons (or tap a row of the season schedule to jump straight to it). Without a calendar, the chevrons toggle between the last and the next match.
* ⏱️ **Adaptive Match Display:**
  * **Pre-match:** Day, date, and tip-off time, plus a "Game day" badge on the day of the match (a "Postponed" badge replaces it when the fixture is postponed).
  * **Post-match:** Large final score display and high-contrast solid outcome badge (**Win**, **Loss**, or **Draw**).
  * **Live:** "Live" badge with pulsing white dot and kickoff time display.
* 🥇 **Podium Rank Badges:** Automatic visual highlight for Top 3 rankings (gold, silver, bronze) with customizable styles: subtle glowing outline (default), beveled metallic solid, or neutral without podium colors.
* 🎨 **Configurable Accent Color:** Use default basketball orange, your active Home Assistant theme primary color, or any custom HEX code to match your club's jersey colors.
* 🗺️ **Direct GPS Navigation:** Tap the venue to launch direct turn-by-turn routing in Google Maps.
* 📅 **Add to Calendar:** Tap the date to create a prefilled Google Calendar event with tip-off time, teams, and gym address.
* 🌐 **Official Club Link:** Tap team crests to open the team's official page on the FFBB portal (enabled by default).
* 📊 **Built-in Interactive Modals:**
  * **Full Standings:** Tap rank badges (`1st`, `4th`...) to inspect the complete pool standings table (points, played, wins, losses, draws) with team and opponent highlights.
  * **Season Schedule:** Tap the "Round" header to browse the ordered schedule of all pool matches with past scores and upcoming fixtures.
  * **Form Details:** Tap the recent form sequence (e.g. `W-W-L-W-D`) for match details and active streak counts.
* 🖼️ **Watermark Crests:** Background club crests rendered with a smooth elliptical radial mask to eliminate visible straight edges.
* ⚙️ **Complete Visual Editor (`ha-form`):** Fully manageable through the Home Assistant UI, no mandatory YAML editing.
* 🔒 **100% Local & Secure:** Zero external CDN calls - Lit is a tracked npm dependency, bundled in at build time.

> [!NOTE]
> **Crests and team links in the carousel.** For each match, the card uses the crest and link carried by the matching row of the pool sensor's `calendar` attribute (`home_logo`, `away_logo`, `home_url`, `away_url`). When a row doesn't provide them, it falls back to the next and last opponent sensors if the club name matches, then to the standings (links only). Without any data, the default crest is shown rather than another club's crest.

---

## 🚀 Installation

### 🧩 Prerequisites

> [!IMPORTANT]
> This card is a frontend display: it requires the **[FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker)** integration to work.
>
> 1. First, install and configure **[FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker)** to generate your entities (`sensor.*`).
> 2. Then, add this card to your Lovelace dashboard.

### Via HACS (Recommended)

1. Open **HACS** in Home Assistant.
2. Click the top-right three dots > **Custom repositories**.
3. Enter repository URL: `https://github.com/Adrien40/ha-ffbb-tracker-card`
4. Select category **Dashboard**, then click **Add**.
5. Click the **FFBB Tracker Card** entry that appears, then click **Download**.
6. Refresh your browser cache (or reload Lovelace resources).

### Manual Installation

1. Download the latest release assets from the [Releases](https://github.com/Adrien40/ha-ffbb-tracker-card/releases) page.
2. Verify that your installation contains all required files:
   * `ha-ffbb-tracker-card.js` (the bundled card, including the editor, Lit, and translations)
   * The `brand/` folder, kept as a **subfolder** right next to `ha-ffbb-tracker-card.js` (the card loads its fallback logo from there at render time)
3. Copy all files into your `/config/www/community/ha-ffbb-tracker-card/` directory.
4. In Home Assistant, go to **Settings** > **Dashboards** > **Resources**.
5. Add a new resource:
   * **URL:** `/local/community/ha-ffbb-tracker-card/ha-ffbb-tracker-card.js`
   * **Type:** JavaScript Module
6. Restart or hard-refresh your browser.

---

## ⚙️ Configuration

### Via UI Editor

1. On your dashboard, click **Edit Dashboard** > **Add Card**.
2. Search for **FFBB Tracker Card**.
3. Select your team in the entity picker and customize visual options as needed.

### YAML Example

```yaml
type: custom:ffbb-tracker-card
entity: sensor.my_team_next_match_opponent
custom_team_name: Basket Landes
logo_size: medium
logo_click_action: team_url
accent_color: default
default_match_view: auto
show_title: true
title: ''
icon: mdi:basketball
show_header: true
show_rank: true
rank_badge_style: outline
display_mode: match
standings_title: ''
standings_icon: mdi:format-list-numbered
show_form: true
show_venue: true
show_watermark: true
```

---

## 🛠️ Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `entity` | `string` | **Required** | Any sensor entity created by the FFBB Tracker integration for the team. |
| `custom_team_name` | `string` | `""` | Custom team label overriding official FFBB name (e.g., `Buglose Pontonx`). |
| `logo_size` | `string` | `medium` | Team crest size: `small`, `medium`, or `large`. |
| `logo_click_action` | `string` | `team_url` | Action on logo click: `team_url` (official FFBB page), `more-info` (HA dialog), or `none`. |
| `default_match_view` | `string` | `auto` | Initial match view: `auto` (last match until D+1), `next` (always upcoming), or `last` (last match). |
| `accent_color` | `string` | `default` | Accent color source: `default` (basketball orange), `theme` (HA primary color), or `custom`. |
| `custom_accent_color` | `string` | `""` | Custom HEX color code when `accent_color: custom` (e.g., `#1e88e5`). |
| `show_title` | `boolean` | `true` | Toggles the card title header. |
| `title` | `string` | `""` | Custom title. Leave blank for a dynamic default that follows the match state: "Next match", "Live match", or "Last match". |
| `icon` | `string` | `mdi:basketball` | Icon displayed beside the title. |
| `show_header` | `boolean` | `true` | Displays competition, pool name, and clickable round header. |
| `show_rank` | `boolean` | `true` | Displays interactive rank badges for each team. |
| `rank_badge_style` | `string` | `outline` | Rank badge visual style: `outline` (gold/silver/bronze border by default), `solid` (metallic fill), or `none` (neutral without podium colors). |
| `display_mode` | `string` | `match` | Which card(s) to show: `match` (only the match card, as today), `standings` (only the standings card), or `both`. The standings card shows the same columns as the official FFBB page: Pts, Games (J G P N), I, Pen., Forf., Def., Penalties (Ref / Coach) and Points (scored / conceded / difference) — only your own team is highlighted; on a narrow screen the table scrolls sideways with the rank and team columns pinned. If there is no standings data yet, the card still shows with a "no standings available" message instead of disappearing. The simple standings stays in the popup opened from the rank badges. |
| `standings_title` | `string` | `""` | Custom title for the standings card (defaults to translated "Standings" if left blank). Only used when `display_mode` is `standings` or `both`. |
| `standings_icon` | `string` | `mdi:format-list-numbered` | Icon displayed beside the standings card title. |
| `show_form` | `boolean` | `true` | Displays recent form streak indicator (last 5 games). |
| `show_venue` | `boolean` | `true` | Displays venue details with GPS navigation link in footer. |
| `show_watermark` | `boolean` | `true` | Shows faded team crest watermarks in background. |

---

### 🗑️ Uninstallation

1. Remove the card from your dashboards: switch each affected view to YAML mode (or delete the card through the visual editor) and remove the corresponding `type: custom:ffbb-tracker-card` block.
2. If installed via HACS: open **HACS**, find the **FFBB Tracker Card** entry (downloaded repositories are listed first, or use the search field), open its three-dots menu, then select **Remove**. HACS automatically removes the associated resource.
3. If installed manually:
   * Delete the `/config/www/community/ha-ffbb-tracker-card/` folder.
   * Remove the corresponding resource under **Settings** > **Dashboards** > **Resources**.
4. Refresh your browser (or force-reload Lovelace resources).

This card never creates any credentials, tokens, or external accounts -- there's nothing to revoke elsewhere.

---

### 🌐 Supported Languages

The card is fully available in **French** <img src="https://hatscripts.github.io/circle-flags/flags/fr.svg" width="16" valign="middle"> and **English** <img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" width="16" valign="middle"> (all labels, modals, and the visual editor).

If you would like to see the card translated into another language or contribute to a translation, feel free to open an [issue](https://github.com/Adrien40/ha-ffbb-tracker-card/issues) or contact me directly on GitHub.

---

### 🧑‍💻 Development

This project uses [esbuild](https://esbuild.github.io/) to bundle the card into a single self-contained file, and [Vitest](https://vitest.dev/) for unit tests.

```bash
git clone https://github.com/Adrien40/ha-ffbb-tracker-card.git
cd ha-ffbb-tracker-card
npm install

npm test         # Runs the unit tests
npm run lint     # Checks the code with ESLint
npm run build    # Generates dist/ha-ffbb-tracker-card.js
npm run watch    # Rebuilds automatically while developing
```

---

### 🤝 Contributions and Support
For bug reports or feature requests, please open an [Issue](https://github.com/Adrien40/ha-ffbb-tracker-card/issues) on this repository.

---

### ⚖️ License and Disclaimer
This project is licensed under the **GPLv3**. It is an independent, open-source project and is not officially affiliated with the French Basketball Federation (FFBB). Use of this software is at your own discretion.

---

**Developed with ❤️ by @Adrien40**

<a href="https://www.buymeacoffee.com/adrien40"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="180"></a>

<!-- Keywords: Home Assistant custom integration, FFBB, Basketball, basket, scores, standings, calendar, sports tracker, local automation -->
