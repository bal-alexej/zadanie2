// import * as $ from 'jquery'

import Post from './Post'
import './styles/styles.css'
// import '@s/styles.css'
import WebpackLogo from './img/rastr.png'


const post = new Post('Webpack Post Title', WebpackLogo)

console.log('Post to String:', post.toString())