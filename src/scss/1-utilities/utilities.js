const path = require("path");

const resources = [
    "_variables.scss",
    "_colours.scss",
    "_mediaQueries.scss",
    "_mixins.scss",
    "_placeholders.scss"
];

module.exports = resources.map(file => path.resolve(__dirname, file));