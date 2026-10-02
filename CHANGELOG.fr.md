# FFBB Tracker Card - Journal des modifications

## 0.7.3

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

Cette version corrige les flèches précédent/suivant quand un match passé n'a pas encore de résultat, et le dit sur la carte : un tel match est maintenant présenté comme « Résultat en attente » au lieu d'un match à venir.

### 🐛 Corrections
- **Les flèches précédent/suivant pouvaient sauter un match, ou sembler ne rien faire.** La carte affiche le match que décrivent les capteurs du prochain/dernier match, que l'intégration choisit par la date, mais les flèches partaient du premier match du calendrier sans score. Dès qu'un match passé n'avait pas encore de résultat (le club ne l'a pas saisi, ou les données de la FFBB sont en retard), les deux ne coïncidaient plus : « précédent » sautait ce match et « suivant » y atterrissait. Les flèches partent maintenant du match réellement affiché, retrouvé par son numéro de match (ou par sa date, pour une ancienne intégration). Avec le vrai calendrier qui a mis le défaut en évidence, « précédent » depuis le prochain match va maintenant au match passé sans résultat, puis à celui d'avant.
- **Un match passé sans résultat ressemblait à un match à venir.** Dès qu'un match a commencé il y a plus de 3 heures (le délai de grâce de l'intégration) sans score, la carte affiche un badge « Résultat en attente » à la place de la présentation d'un match à venir, en remplacement de « Jour de match », et toucher sa date ne propose plus de l'ajouter à votre calendrier. Dans le calendrier de la saison, son heure est remplacée par « En attente ».
- **Le calendrier de la saison mettait en évidence la mauvaise ligne comme prochain match** quand un match passé n'avait pas de résultat : il ignore maintenant les matchs qui attendent leur résultat, comme la carte.

### 🧰 Maintenance
- Suite de tests passée de 555 à 672 tests. La navigation est testée dans la logique pure et dans la carte rendue, en rejouant la suite de clics qui avait mal tourné sur un vrai calendrier de saison, y compris le cas où la fenêtre live de l'intégration garde un match terminé comme prochain match plus longtemps que les 3 heures de la carte.
- CI : le badge Validate du README pointait vers `validate.yml` alors que le workflow est `validate.yaml`, donc il n'affichait jamais de statut. Corrigé, et un badge de validation HACS ajouté. Un test échoue maintenant si un badge du README pointe vers un workflow inexistant, ou si un fichier cite encore un ancien nom de workflow.
- `build-dist.yaml` installe avec `npm ci`, comme les autres workflows, au lieu de `npm install` : le bundle est construit avec les versions verrouillées des dépendances.
- Nouveau `release.yaml` : pousser un tag de version publie la release GitHub à partir de ce journal (`scripts/release-notes.mjs`). Il échoue si le tag ne correspond pas à `CARD_VERSION`, si ce journal n'a pas d'entrée pour la version, ou si le `dist/` commité à ce tag n'est pas ce que ses sources produisent : taguez le commit fait par le workflow *Build dist*, pas le commit de sources qui le précède, sinon les utilisateurs HACS recevraient un bundle périmé. Aucun fichier n'est joint à la release, donc HACS continue d'installer `dist/` en entier, y compris l'icône `brand/` que la carte utilise comme logo de secours.

### 📚 Documentation
- README : badge Validate corrigé et badge HACS ajouté, dans les deux langues.
- Ajout de `CHANGELOG.md` et `CHANGELOG.fr.md`.

### 📋 Notes de mise à jour
- Rien à faire. Une carte dont tous les scores sont à jour a exactement le même aspect et le même comportement qu'avant.
- Le badge « Reporté » existant est inchangé. Il s'affiche quand l'intégration signale le prochain match comme périmé, ce qui veut en réalité dire qu'un match passé sans résultat est le seul qui reste à afficher. « Résultat en attente » couvre les autres matchs passés sans résultat.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀
