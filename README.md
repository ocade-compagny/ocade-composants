# Bibliothèque de composants Ocade Components
[Voir la documentation](https://ocade-compagny.github.io/ocade-components/)

# Package.json

Différentes bonnes pratiques pour la gestion des paquets via npm.

## Changer de version un paquet en développement

En gros l'idée c'est d'utiliser `npm install` ou `npm uninstall` avec l'option `--no-save-dev` pour faire des (dés-)installations de paquets et d'installer ta bibliothèque en utilisant le dépôt local plutôt que le paquet npm, à volonté, sans que ça modifie ton package.json (qui lui est versionné et donc utilisé pour le déploiement, donc pas reposer sur un truc local). La commande `npm update` remet tout au clair. 

Exemple imaginaire avec `atob`

### Prod

En prod, atob est un paquet installé via npm de façon classique :

Le code source en node js est plus ou moins celui-là :

```
function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}
```

Le package.json est en gros : 

```
{
  "name": "npm-tests",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "atob": "^2.1.2"
  }
}
```

#### Procédure pour passer en prod

Si c'est une "fresh install", rien de spécial. Un `npm ci` devrait suffire.

Si le projet a été en dev et qu'on veut basculer en prod : `npm update`.

### Dev

En dev, on veut une variante de notre fonction `atob` : 

```
function atob(str) {
  return str;
}
```

On a donc exactement le même paquet, sous `/lib/atob` au lieu du classique `node_modules`.
Ce dossier est le dépôt de travail cloné. On modifie le fichier approprié et
on modifie la fonction.

**On ne touche pas au fichier package.json.**
Cela permet de travailler sur un fichier package.json qui est toujours "propre".

#### Procédure pour passer en dev

```
[clement@clement-gco npm-tests]$ node index.js 
function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}
[clement@clement-gco npm-tests]$ npm uninstall --no-save atob && npm install --no-save atob@file:./lib/atob

removed 1 package, and audited 1 package in 177ms

found 0 vulnerabilities

added 1 package, and audited 3 packages in 11s

found 0 vulnerabilities
[clement@clement-gco npm-tests]$ node index.js 
function atob(str) {
  return str;
}
```

En vrai c'est une seule commande : 

```
npm uninstall --no-save atob && npm install --no-save atob@file:./lib/atob
```

(L'exéuction de `node index.js` n'est là que pour montrer si on est en prod ou en dev.)


### Exemple d'un package.json
```
{
  "name": "@ocade-compagny/ocade-components",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@ocade-compagny/ocade-components": "file:ocade-components",
    "@reduxjs/toolkit": "^1.8.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "node-sass": "^7.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.2",
    "react-scripts": "^5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "eslint": "./node_modules/eslint/bin/eslint.js --fix --ext .js,.jsx,.ts,.tsx,.mjs .",
    "dev": "npm uninstall --no-save-dev @ocade-compagny/ocade-components && npm install --no-save-dev @ocade-compagny/ocade-components@file:./ocade-components",
    "prod": "npm install --no-save-dev @ocade-compagny/ocade-components && npm uninstall --no-save-dev @ocade-compagny/ocade-components@file:./ocade-components"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint": "^8.23.1",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.6.1",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.31.8",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.7.1"
  }
}
```