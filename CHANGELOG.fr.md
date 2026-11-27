# FFBB Tracker Card - Journal des modifications

Toutes les modifications notables du projet sont documentées dans ce fichier.
Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [0.6.24] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- **Dernier match :** seul le match joué le plus récent s'appelle « Dernier match ». Un match joué plus ancien, parcouru avec les chevrons, devient « Match joué ».
- **Noms d'équipe :** une catégorie après le nom du club (« BASKET LANDES U13 », « UJSBP U13M », « … NM3 ») ne cache plus ton équipe, et un nombre qui prolonge simplement un autre (« US DAX 2 » / « US DAX 21 », « BC LYON 1 » / « BC LYON 11 », « BASKET 40 » / « BASKET 401 ») n'est plus pris pour la même équipe.
- **Classement (tableau détaillé) :** « BC LYON » ne surligne plus, et ne prend plus le nom personnalisé de « BC LYON 2 » ; un nom court comme « ANGERS » est retrouvé dans « ETOILE ANGERS BASKET - 1 », comme dans le tableau simple.
- **Match en direct :** un match sélectionné avant le coup d'envoi, ou depuis la popup du calendrier, ne remplace plus le match en direct (le titre disait « Match en direct » sur le mauvais match).
- **Fin de saison** avec « Toujours le prochain match » : la carte reste en fin de saison, donc le chevron « précédent » fonctionne encore.
- **En-tête :** « unknown » et « unavailable » ne s'affichent plus comme compétition ou poule, et une poule sans compétition n'a plus de « • » orphelin.
- **Éditeur :** changer l'entité ou la vue par défaut oublie le match et la bascule des réglages précédents ; passer en mode classement seul ferme une popup de match ouverte ; une configuration vide donne le message d'erreur explicite.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.23] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Chevrons de navigation : ils parcourent maintenant la saison par date, alors que le calendrier de la saison garde l'ordre officiel par journée (J1, J2, J3, J4…). Depuis une J4 jouée le 24 nov., « précédent » mène à la J13 du 20 nov. et « suivant » à la J14 du 4 déc. (la 0.6.22 suivait l'ordre de la liste, ce qui menait à la J5).

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.22] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Calendrier de la saison : les matchs sont maintenant affichés dans l'ordre officiel de la fédération, par journée (J1, J2, J3, J4, J5…), comme sur le site de la FFBB. L'intégration les liste par date : un match reporté et joué tard (une J4 jouée le 24 nov.) apparaissait donc entre la J13 et la J14. Les chevrons suivent le même ordre. L'ordre de l'intégration est conservé quand un numéro de journée manque ou se répète (calendrier à plusieurs phases).
- Dernier et prochain match : ils suivent toujours la DATE, pas la journée. Le dernier match joué est le plus récent (la J4 jouée le 24 nov. vient après la J13 jouée le 20 nov.), et le prochain match est le plus proche parmi ceux qui restent à jouer.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.21] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Pastille de classement : quand les données du match fournissent l'adresse de la page de l'équipe adverse (`opponent_url`), le rang est maintenant cherché par cette adresse, unique pour chaque équipe. Un club qui a plusieurs équipes au classement (« BC LYON » et « BC LYON - 3 ») ne laisse plus la pastille vide et ne risque plus un mauvais rang. Sans adresse, la correspondance par nom de la 0.6.20 s'applique comme avant.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.20] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Pastille de classement : le rang de l'adversaire s'affiche maintenant pour une équipe numérotée (par exemple « LOUS MAROUS BASKET - 2 ») que le classement liste sous le nom nu du club (« LOUS MAROUS BASKET »). Ce n'est fait que lorsqu'une seule équipe de ce club figure au classement : « BC LYON » et « BC LYON - 3 » ensemble restent ambigus et n'ont pas de rang, plutôt qu'un rang faux.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.19] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Heure du match : le « : » retrouve la couleur de texte normale (le deux-points orange ajouté en 0.6.18 est retiré). La colonne centrale de 144 px et le décalage des chevrons de la 0.6.18 sont conservés.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.18] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Noms d'équipe de la carte match : la colonne centrale fixe passe de 160 px (0.6.16/0.6.17) à 144 px, chaque nom retrouve donc 8 px et les noms longs ne sont plus coupés par « … ». Les chevrons de navigation sont décalés de 26 px à l'extérieur de cette colonne (6 px plus loin qu'en 0.6.15).

### ✨ Améliorations
- Le « : » de l'heure du match (matchs à venir) s'affiche maintenant dans la couleur d'accent (orange par défaut) ; les chiffres gardent la couleur de texte normale.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.17] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Améliorations
- Classements (popup et blocs classement) : la position et le nom de mon équipe s'affichent maintenant dans la couleur d'accent (orange par défaut), comme dans le calendrier. La ligne de l'adversaire dans le popup garde uniquement le fond grisé, et les autres colonnes gardent la couleur de texte normale.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.16] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Chevrons de navigation : décalés davantage vers l'extérieur, comme en 0.6.11 (même taille qu'avant). La colonne centrale fixe est plus large (128 px → 160 px) et les chevrons sont décalés de 24 px à l'extérieur, pour rester à l'écart du score. Les logos et noms d'équipes se décalent donc légèrement vers l'extérieur (la colonne gagne 32 px, soit 16 px de chaque côté) ; ils restent au même endroit d'un match à l'autre.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.15] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Chevrons de navigation : décalés de 4 px vers l'extérieur (même taille qu'avant). Depuis que la colonne centrale est fixe, ils s'étaient rapprochés du score d'un match joué ; l'espace entre un chevron et le score retrouve sa valeur d'avant la 0.6.12.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.14] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Le score s'affiche de nouveau sur une seule ligne (la 0.6.13 pouvait le couper en deux). Il ne peut plus passer à la ligne, quelle que soit sa longueur (« 105 - 98 » compris), et les logos restent au même endroit d'un match à l'autre.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.13] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Les noms d'équipe longs (par exemple « BISCARROSSE OLYMPIQUE BASKET - 1 ») ne sont plus coupés : la colonne centrale fixe de la 0.6.12 était plus large que l'ancienne et prenait de la place aux noms. Elle retrouve la largeur de l'ancienne mise en page, et les logos restent au même endroit d'un match à l'autre.
- Chevrons de navigation : ils gardent leur taille agrandie et leur zone de clic élargie, et sont décalés vers l'extérieur pour rester à l'écart du bloc du match.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.12] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Les logos des équipes ne se décalent plus latéralement d'un match à l'autre (match joué, à venir, exempt...) : la colonne centrale de la zone du match a maintenant une largeur fixe au lieu de suivre son contenu.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.11] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Améliorations
- Les chevrons de navigation sont plus grands (32 px au lieu de 22 px) et leur zone cliquable est élargie (48 × 48 px), ce qui les rend plus faciles à toucher, surtout sur téléphone.

### 🐛 Corrections
- Classement : la ligne d'exempt (« EXEMPT » sur le site de la FFBB) s'affiche « Exempt » (traduit) au lieu de « N/A », avec le logo de la FFBB, comme dans le classement officiel.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.10] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Forme : les lettres (et la série en cours) suivent maintenant la langue de la carte et non celle de l'instance Home Assistant. Une carte en anglais sur une instance en français affiche « L-W-W-W (1L) » au lieu de « D-V-V-V (1D) ».
- Popup de la forme : un « D » est lu avec les lettres propres à l'instance, donc le « D » d'une instance en anglais (nul) n'est plus affiché comme une défaite.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.9] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Ton équipe n'était plus reconnue quand le nom de son capteur de poule est plus court que celui écrit sur ses matchs (par exemple « ANGERS » et « ETOILE ANGERS BASKET - 1 ») : rien n'était orange dans la popup du calendrier, et la ligne de l'équipe n'était pas surlignée dans le classement. Un « - 1 » final ne compte plus comme le numéro d'une autre équipe ; « BC LYON » et « BC LYON 2 » restent bien distincts.
- Popup du calendrier : le score et le nom qui sont les tiens sont maintenant lus dans l'indicateur `is_home` de chaque ligne, qui ne dépend pas de l'orthographe des noms. Les noms ne sont comparés que si une ligne n'a pas cet indicateur.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.8] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup de la forme : les pastilles verte / rouge / grise (V / D / N) sont de nouveau visibles. Elles étaient toutes empilées au même endroit et coupées, car elles héritaient du positionnement absolu du badge de résultat central.
- Noms d'équipes : une équipe n'est plus associée à une équipe dont le nom ne diffère que par un numéro (par exemple « BC LYON » et « BC LYON 2 ») pour son lien, son logo ou sa ligne du classement, y compris dans le repli utilisé quand aucun nom exact n'existe.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.7] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Badge de résultat : un match joué n'affiche plus le résultat d'un autre match. Le badge n'apparaît qu'avec un vrai résultat (victoire, défaite ou nul) et disparaît quand aucun n'est connu, au lieu d'un badge vide ou d'un « Nul » inventé.
- Score : un match joué sans score dans le calendrier (un forfait, par exemple) n'affiche plus le score du dernier match. Il affiche « - ».
- Liens des adversaires : une équipe n'est plus liée à une autre équipe dont le nom ne diffère que par un numéro (par exemple « BC LYON » et « BC LYON 2 »), dans les liens comme dans la recherche du classement.
- Popup du calendrier de la saison : les pastilles « DOM » / « EXT » sont maintenant traduites (HOME / AWAY en anglais).

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.6] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : la date est maintenant en gras et l'heure du match un peu plus grande. La hauteur des lignes ne change pas.
- Popup du calendrier de la saison : le disque derrière l'icône de pause d'une journée d'exempt est d'un gris nettement plus foncé.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.5] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : la date et l'heure du match ont maintenant la même taille que les noms d'équipe, et la date est un peu plus basse, plus proche de l'heure. La hauteur des lignes ne change pas.
- Popup du calendrier de la saison : le disque derrière l'icône de pause d'une journée d'exempt est d'un gris plus foncé, pour mieux faire ressortir l'icône blanche.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.4] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : la date n'est plus collée au bord haut de la ligne ni le score au bord bas. Les deux se rapprochent légèrement du milieu, et le score est un peu plus grand. La hauteur des lignes ne change pas.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.3] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : la date est maintenant en haut de chaque ligne et le score (ou l'heure du match) en bas. La date est donc au même endroit avec ou sans score, et les deux ne sont plus collés. La hauteur des lignes ne change pas.
- Popup du calendrier de la saison : l'icône de pause d'une journée d'exempt est désormais blanche sur un disque gris uni, lisible en thème clair comme en thème sombre.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.2] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : une journée d'exempt a désormais la même hauteur que les autres lignes. Une icône de pause, de la taille des logos d'équipe, remplace le logo adverse, et le libellé « Exempt » reprend la couleur normale des noms d'équipe en semi-gras, au lieu d'un italique estompé.

### ✨ Améliorations
- Popup du calendrier de la saison : un match déjà joué affiche maintenant sa date au-dessus du score. Les lignes gardent la même hauteur.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.1] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Popup du calendrier de la saison : une journée d'exempt affiche désormais le libellé traduit (« Exempt » en français, « Bye » en anglais) au lieu du « Exempt » brut de la fédération, sans logo adverse, sans pastille domicile/extérieur, sans heure de match ni badge « En attente ».
- Une journée d'exempt n'est plus jamais considérée comme en attente de résultat.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.0] — 2026-11-23

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Corrections
- Carte : la date, l'heure/le score et les badges de statut (Victoire, Défaite, Nul, Exempt…) sont désormais alignés de la même façon dans tous les états de match.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.5.0] — 2026-11-23

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Nouveautés
- Première version publique.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀
