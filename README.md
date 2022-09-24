<a href="https://ocade-compagny.github.io/ocade-composants/">
  <p align="center">
    <img src="./readme/logo-ocade-composants-1.png" />
  </p>
</a>

# Ocade Composants
[Documentation de la librairie](https://ocade-compagny.github.io/ocade-composants/)

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
  "name": "@ocade-compagny/ocade-composants",
  "version": "1.0.1",
  "description": "Banque de composants by Ocade Compagny",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "prepare": "npx husky install",
  "scripts": {
    "test": "jest",
    "eslint": "eslint --fix --ext .js,.jsx,.ts,.tsx,.mjs --resolve-plugins-relative-to .",
    "stylelint": "stylelint --fix \"src/**/*.scss\"",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "build": "rollup -c",
    "dev": "nodemon -e ts,tsx -w ./src -x npm run build",
    "deploy-storybook": "storybook-to-ghpages"
  },
  "keywords": [
    "Ocade Components"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.19.1",
    "@babel/preset-env": "^7.19.1",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "babel-jest": "^29.0.3",
    "babel-loader": "^8.2.5",
    "@rollup/plugin-babel": "^5.3.1",
    "@rollup/plugin-node-resolve": "^14.1.0",
    "@rollup/plugin-typescript": "^8.5.0",
    "@storybook/addon-actions": "^6.5.12",
    "@storybook/addon-essentials": "^6.5.12",
    "@storybook/addon-interactions": "^6.5.12",
    "@storybook/addon-links": "^6.5.12",
    "@storybook/builder-webpack4": "^6.5.12",
    "@storybook/builder-webpack5": "^6.5.12",
    "@storybook/manager-webpack4": "^6.5.12",
    "@storybook/manager-webpack5": "^6.5.12",
    "@storybook/preset-scss": "^1.0.3",
    "@storybook/react": "^6.5.12",
    "@storybook/storybook-deployer": "^2.8.12",
    "@storybook/testing-library": "^0.0.13",
    "@types/jest": "^29.0.3",
    "@types/react": "^18.0.21",
    "@types/react-dom": "^18.0.6",
    "@types/react-test-renderer": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.38.0",
    "css-loader": "^6.7.1",
    "eslint": "^8.23.1",
    "eslint-config-standard-with-typescript": "^23.0.0",
    "eslint-plugin-n": "^15.2.5",
    "eslint-plugin-promise": "^6.0.1",
    "html-webpack-plugin": "^5.5.0",
    "husky": "^8.0.1",
    "jest": "^29.0.3",
    "nodemon": "^2.0.20",
    "postcss": "^8.4.16",
    "postcss-loader": "^7.0.1",
    "postcss-scss": "^4.0.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-test-renderer": "^18.2.0",
    "rollup": "^2.79.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-scss": "^3.0.0",
    "rollup-plugin-terser": "^7.0.2",
    "sass": "^1.54.9",
    "sass-loader": "^13.0.2",
    "style-loader": "^3.3.1",
    "stylelint": "^14.12.1",
    "stylelint-config-standard-scss": "^5.0.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.3"
  },
  "dependencies": {
    "@jest/globals": "^29.0.3"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ocade-compagny/ocade-components.git"
  },
  "bugs": {
    "url": "https://github.com/ocade-compagny/ocade-components/issues"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "homepage": "https://github.com/ocade-compagny/ocade-components#readme"
}
```