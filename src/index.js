import * as $ from 'jquery'

import Post from './Post'
import './styles/styles.css'
import WebpackLogo from './img/rastr.png'
import './less/styles.less'
import './sass/style.scss'
import './babel'

const post = new Post('Webpack Post Title', WebpackLogo)

console.log('Post to String:', post.toString())