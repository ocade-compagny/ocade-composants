import babel from 'rollup-plugin-babel';
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";


const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extract: true, // conserve le CSS dans le fichier JavaScript. Si vous souhaitez générer un fichier CSS séparé, vous pouvez définir extractet trueRollup créera un index.css fichier qui sera également placé dans le répertoire des projets dist/.
      modules: false, // active les modules CSS pour le bundle.
      use: ['sass'], // indique au plugin d'activer le support Sass. Vous devez également installer node-sassexplicitement dans le projet
      minimize: false, // active la minimisation du CSS.
      sourceMap: true, // active la génération de source maps pour le CSS.
      extensions: ['.css', '.scss'], // liste des extensions de fichier à traiter.
      inject: true, // désactive l'insertion du CSS dans le document HTML.
    }),
    babel({ 
      exclude: 'node_modules/**'
    })
  ],
  external: ['react', 'react-dom']
};