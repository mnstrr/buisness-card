import '../scss/styles.scss';

const __svg__ = {path: '../img/svg/icons/*.svg', name: 'assets/svg/[hash].logos.svg'};
// require basic or custom sprite loader
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);