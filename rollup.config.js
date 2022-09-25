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
      extract: false, // conserve le CSS dans le fichier JavaScript. Si vous souhaitez générer un fichier CSS séparé, vous pouvez définir extractet trueRollup créera un index.css fichier qui sera également placé dans le répertoire des projets dist/.
      modules: true, // active les modules CSS pour le bundle.
      use: ['sass'], // indique au plugin d'activer le support Sass. Vous devez également installer node-sassexplicitement dans le projet
    }),
    babel({ exclude: 'node_modules/**' })
  ],
  external: ['react', 'react-dom']
};