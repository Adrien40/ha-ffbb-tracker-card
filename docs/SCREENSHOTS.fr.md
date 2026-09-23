[![Français](https://img.shields.io/badge/Langue-Fran%C3%A7ais-blue)](#) [![English](https://img.shields.io/badge/Language-English-red)](SCREENSHOTS.md)

# 📸 Captures d'écran

Un aperçu rapide du rendu de la carte selon différentes configurations. Retour au [README principal](../README.fr.md).

## Exemples actuels

<p align="center">
  <img src="screenshots/gallery-overview.png" alt="FFBB Tracker Card -- cartes de match, match en direct, et classement">
</p>

De gauche à droite :

* **Prochain match** (`display_mode: match`, par défaut) -- blasons d'équipes, badge journée/poule cliquable, forme récente et lieu de la rencontre avec lien Google Maps.
* **Prochain match, une autre poule** -- même mise en page, avec un nom d'adversaire plus long tronqué pour tenir.
* **Match en direct** -- une fois le match commencé, le compte à rebours est remplacé par le badge rouge "En direct" et l'heure du coup d'envoi.
* **Classement** (`display_mode: standings`, carte en bas à gauche) -- le tableau complet de la poule, avec votre équipe mise en évidence et un défilement horizontal sur petit écran.

## À venir

Certaines configurations ne sont pas encore illustrées ici :

* `display_mode: both` (carte de match + carte de classement empilées sur la même entrée)
* `logo_size: extra_large`
* Les variantes de `rank_badge_style` (`solid` / `none`)
* L'interface en anglais (toutes les captures actuelles sont en français)

Vous avez une capture pour l'une de ces configurations ? Ouvrez une PR ou une issue avec l'image et le `display_mode` / `logo_size` utilisé pour l'obtenir, et elle sera ajoutée ici.
