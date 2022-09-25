module.exports = {
  "stories": [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "typescript": { reactDocgen: false },
  "core": {
    "builder": "@storybook/builder-webpack5", 
  }
}