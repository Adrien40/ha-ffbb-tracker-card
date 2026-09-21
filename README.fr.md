[![English](https://img.shields.io/badge/Language-English-red)](README.md) [![Français](https://img.shields.io/badge/Langue-Fran%C3%A7ais-blue)](#)

# FFBB Tracker Card pour Home Assistant 🏀
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/Adrien40/ha-ffbb-tracker-card)](https://github.com/Adrien40/ha-ffbb-tracker-card/releases)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/Adrien40/ha-ffbb-tracker-card/blob/main/LICENSE)
[![Validate](https://github.com/Adrien40/ha-ffbb-tracker-card/actions/workflows/validate.yml/badge.svg)](https://github.com/Adrien40/ha-ffbb-tracker-card/actions/workflows/validate.yml)

Une **carte Lovelace moderne et interactive** pour Home Assistant, conçue spécialement pour afficher les rencontres, scores en direct, classements et statistiques de vos équipes suivies avec l'intégration [FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker).

*Inspirée du design sportif officiel et optimisée pour une consultation rapide sur mobile comme sur tableau de bord mural.*

<p align="center">
  <img src="https://raw.githubusercontent.com/Adrien40/ha-ffbb-tracker-card/refs/heads/main/docs/screenshots/card_preview.gif" width="485" alt="Aperçu FFBB Tracker Card">
</p>

Si ce projet vous est utile, vous pouvez soutenir son développement 🙏

<a href="https://www.buymeacoffee.com/adrien40"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="160"></a>

---

## ⚡ Fonctionnalités principales

* 🏀 **Détection automatique des entités :** renseignez simplement n'importe quel capteur de l'équipe (prochain match, poule, classement...), la carte résout automatiquement l'ensemble des données associées.
* 🔄 **Carrousel dynamique de match :** parcourez tous les matchs de la saison avec les chevrons de navigation (ou touchez une ligne du calendrier pour y accéder directement). Sans calendrier, les chevrons basculent entre le dernier et le prochain match.
* ⏱️ **Affichage adaptatif de la rencontre :**
  * **Avant-match :** jour, date et heure du coup d'envoi, avec un badge « Jour de match » le jour de la rencontre (remplacé par « Reporté » si le match est reporté).
  * **Après-match :** score final grand format et badge de résultat plein à fort contraste (**Victoire**, **Défaite** ou **Nul**).
  * **Direct :** badge « En direct » avec point blanc pulsant et affichage de l'heure du match en cours.
* 🥇 **Badges de classement podium :** mise en valeur visuelle automatique du Top 3 (or, argent, bronze) avec style au choix : bordure lumineuse (par défaut), plein métallique biseauté, ou neutre sans podium.
* 🎨 **Couleur d'accentuation personnalisable :** appliquez l'orange basket officiel par défaut, la couleur primaire de votre thème Home Assistant, ou n'importe quel code couleur hexadécimal (HEX) pour calquer la carte sur les couleurs réelles de votre club.
* 🗺️ **Guidage GPS direct :** un clic sur le gymnase lance immédiatement l'itinéraire dans Google Maps.
* 📅 **Ajout au calendrier :** un clic sur la date génère un événement Google Agenda prérempli avec l'horaire, les équipes et l'adresse de la salle.
* 🌐 **Lien officiel du club :** un clic sur le blason ouvre la page officielle de l'équipe sur le site de la FFBB (activé par défaut).
* 📊 **Modales interactives intégrées :**
  * **Classement complet :** un clic sur la pastille de position (`1er`, `4e`...) ouvre le tableau complet de la poule (points, joués, victoires, défaites, nuls) avec surlignage de votre équipe et de l'adversaire.
  * **Calendrier de la saison :** un clic sur l'en-tête « Journée » ouvre la liste ordonnée de tous les matchs de la poule avec les scores passés et les matchs à venir.
  * **Détail de la forme :** un clic sur la série (ex. `V-V-D-V-N`) affiche le récapitulatif détaillé et la série active.
* 🖼️ **Logos en filigrane :** logos des clubs affichés en arrière-plan avec masque radial elliptique adouci pour donner du relief sans arête brute.
* ⚙️ **Éditeur visuel complet (`ha-form`) :** personnalisable intégralement via l'interface graphique de Home Assistant, sans YAML obligatoire.
* 🔒 **100 % local & sécurisé :** aucune dépendance CDN distante - Lit est une dépendance npm suivie, intégrée au build.

> [!NOTE]
> **Blasons et liens d'équipe dans le carrousel.** Pour chaque match, la carte utilise le blason et le lien portés par la ligne correspondante de l'attribut `calendar` du capteur poule (`home_logo`, `away_logo`, `home_url`, `away_url`). Quand une ligne ne les fournit pas, elle se rabat sur les capteurs du prochain et du dernier adversaire si le nom du club correspond, puis sur le classement (liens uniquement). Sans aucune donnée, le blason par défaut s'affiche plutôt que celui d'un autre club.

---

## 🚀 Installation

### 🧩 Prérequis

> [!IMPORTANT]
> Cette carte est une interface d'affichage : elle nécessite l'intégration **[FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker)** pour fonctionner.
>
> 1. Installez et configurez d'abord **[FFBB Tracker](https://github.com/Adrien40/ha-ffbb-tracker)** pour générer vos entités (`sensor.*`).
> 2. Ajoutez ensuite cette carte à votre tableau de bord Lovelace.

### Via HACS (recommandé)

1. Ouvrez **HACS** dans Home Assistant.
2. Cliquez sur les trois points en haut à droite > **Dépôts personnalisés**.
3. Saisissez l'adresse : `https://github.com/Adrien40/ha-ffbb-tracker-card`
4. Sélectionnez le type **Tableau de bord** puis cliquez sur **Ajouter**.
5. Cliquez sur la fiche **FFBB Tracker Card** qui apparaît, puis sur **Télécharger**.
6. Rafraîchissez votre navigateur (ou rechargez les ressources Lovelace).

### Installation manuelle

1. Téléchargez la dernière version depuis la page des [Releases](https://github.com/Adrien40/ha-ffbb-tracker-card/releases).
2. Vérifiez que votre installation contient l'ensemble des fichiers obligatoires :
   * `ha-ffbb-tracker-card.js` (la carte packagée, éditeur, Lit et traductions inclus)
   * Le dossier `brand/`, à garder comme **sous-dossier** juste à côté de `ha-ffbb-tracker-card.js` (la carte y charge son logo de secours au moment de l'affichage)
3. Copiez ces fichiers dans le répertoire `/config/www/community/ha-ffbb-tracker-card/` de votre instance.
4. Accédez à **Paramètres** > **Tableaux de bord** > **Ressources**.
5. Ajoutez une nouvelle ressource :
   * **URL :** `/local/community/ha-ffbb-tracker-card/ha-ffbb-tracker-card.js`
   * **Type :** Module JavaScript
6. Redémarrez ou forcez l'actualisation de votre navigateur.

---

## ⚙️ Configuration

### Via l'éditeur graphique (UI)

1. Dans votre tableau de bord, cliquez sur **Modifier le tableau de bord** > **Ajouter une carte**.
2. Recherchez **FFBB Tracker Card**.
3. Sélectionnez votre équipe dans le sélecteur d'entité et ajustez les options visuelles selon vos préférences.

### Exemple YAML

```yaml
type: custom:ffbb-tracker-card
entity: sensor.mon_equipe_prochain_match_adversaire
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

## 🛠️ Options de configuration

| Option | Type | Valeur par défaut | Description |
| :--- | :--- | :--- | :--- |
| `entity` | `string` | **Requis** | N'importe quelle entité capteur créée par l'intégration FFBB Tracker pour l'équipe. |
| `custom_team_name` | `string` | `""` | Nom personnalisé affiché à la place du nom officiel FFBB (ex. : `Buglose Pontonx`). |
| `logo_size` | `string` | `medium` | Taille des blasons d'équipes : `small`, `medium` ou `large`. |
| `logo_click_action` | `string` | `team_url` | Action au clic sur un logo : `team_url` (page officielle FFBB), `more-info` (fiche détaillée HA) ou `none`. |
| `default_match_view` | `string` | `auto` | Vue affichée initialement : `auto` (dernier match jusqu'à J+1), `next` (toujours le prochain) ou `last` (dernier match). |
| `accent_color` | `string` | `default` | Style de la couleur d'accentuation : `default` (orange basket), `theme` (couleur primaire HA) ou `custom`. |
| `custom_accent_color` | `string` | `""` | Code couleur HEX si `accent_color: custom` (ex. : `#1e88e5`). |
| `show_title` | `boolean` | `true` | Affiche ou masque la barre de titre supérieure. |
| `title` | `string` | `""` | Titre personnalisé. Laissez vide pour un titre dynamique qui suit l'état du match : « Prochain match », « Match en direct » ou « Dernier match ». |
| `icon` | `string` | `mdi:basketball` | Icône affichée à côté du titre. |
| `show_header` | `boolean` | `true` | Affiche l'en-tête avec la compétition, la poule et la journée interactive. |
| `show_rank` | `boolean` | `true` | Affiche la pastille interactive du classement de chaque équipe. |
| `rank_badge_style` | `string` | `outline` | Style visuel des badges de classement : `outline` (bordure or/argent/bronze par défaut), `solid` (plein métallique) ou `none` (neutre sans podium). |
| `display_mode` | `string` | `match` | Carte(s) à afficher : `match` (uniquement la carte de match, comme aujourd'hui), `standings` (uniquement la carte classement), ou `both` (les deux). La carte classement reprend les colonnes du site officiel FFBB : Pts, Rencontres (J G P N), I, Pén., For., Déf., Pénalités (Arb / Ent) et Points (M / E / D) — seule votre équipe est surlignée ; sur petit écran, le tableau défile horizontalement, les colonnes rang et équipe restant épinglées. S'il n'y a pas encore de classement disponible, la carte reste affichée avec un message "aucun classement disponible" au lieu de disparaître. Le classement simple reste dans la popup ouverte depuis les pastilles de classement. |
| `standings_title` | `string` | `""` | Titre personnalisé de la carte classement (par défaut, "Classement" traduit si laissé vide). Utilisé seulement si `display_mode` vaut `standings` ou `both`. |
| `standings_icon` | `string` | `mdi:format-list-numbered` | Icône affichée à côté du titre de la carte classement. |
| `show_form` | `boolean` | `true` | Affiche la pastille de forme récente (5 derniers matchs joués). |
| `show_venue` | `boolean` | `true` | Affiche l'adresse de la salle avec le lien de navigation GPS en pied de carte. |
| `show_watermark` | `boolean` | `true` | Affiche les logos des clubs en filigrane en arrière-plan. |

---

### 🗑️ Désinstallation

1. Retirez la carte de vos tableaux de bord : passez chaque vue concernée en mode YAML (ou supprimez la carte via l'éditeur visuel) et supprimez le bloc `type: custom:ffbb-tracker-card` correspondant.
2. Si installée via HACS : ouvrez **HACS**, trouvez la fiche **FFBB Tracker Card** (les dépôts téléchargés sont listés en premier, ou utilisez la recherche), ouvrez son menu à trois points, puis sélectionnez **Supprimer**. HACS retire automatiquement la ressource associée.
3. Si installée manuellement :
   * Supprimez le dossier `/config/www/community/ha-ffbb-tracker-card/`.
   * Retirez la ressource correspondante dans **Paramètres** > **Tableaux de bord** > **Ressources**.
4. Rafraîchissez votre navigateur (ou forcez le rechargement des ressources Lovelace).

Cette carte ne crée aucun identifiant, jeton ou compte externe : il n'y a donc rien à révoquer ailleurs.

---

### 🌐 Langues supportées

La carte est entièrement disponible en **Français** <img src="https://hatscripts.github.io/circle-flags/flags/fr.svg" width="16" valign="middle"> et en **Anglais** <img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" width="16" valign="middle"> (tous les libellés, modales et l'éditeur visuel).

Si vous souhaitez voir la carte traduite dans une autre langue ou contribuer à une traduction, vous pouvez ouvrir une [issue](https://github.com/Adrien40/ha-ffbb-tracker-card/issues) ou me contacter directement sur GitHub.

---

### 🧑‍💻 Développement

Ce projet utilise [esbuild](https://esbuild.github.io/) pour regrouper la carte en un seul fichier autonome, et [Vitest](https://vitest.dev/) pour les tests unitaires.

```bash
git clone https://github.com/Adrien40/ha-ffbb-tracker-card.git
cd ha-ffbb-tracker-card
npm install

npm test         # Lance les tests unitaires
npm run lint     # Vérifie le code avec ESLint
npm run build    # Génère dist/ha-ffbb-tracker-card.js
npm run watch    # Rebuild automatique pendant le développement
```

---

### 🤝 Contributions et support
Pour tout bug ou demande d'amélioration, merci d'ouvrir une [Issue](https://github.com/Adrien40/ha-ffbb-tracker-card/issues) sur ce dépôt.

---

### ⚖️ Licence et avertissement
Projet sous licence **GPLv3**. Il s'agit d'un projet indépendant et open source, sans aucun lien officiel avec la Fédération Française de BasketBall (FFBB). L'utilisation de ce logiciel se fait sous votre propre responsabilité.

---

**Développé avec ❤️ par @Adrien40**

<a href="https://www.buymeacoffee.com/adrien40"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="180"></a>

<!-- Keywords: Home Assistant custom integration, FFBB, Basketball, basket, scores, standings, calendar, sports tracker, local automation -->
