// import * as $ from "jquery"

import Post from "./Post"
import "./styles/styles.css"
import WebpackLogo from "./img/rastr.png"

// import React from "react"
// import { render } from "react-dom"

import "./less/styles.less"
import "./sass/style.scss"
import "./babel"

const post = new Post("Webpack Post Title", WebpackLogo);

console.log("Post to String:", post.toString());

// const App = () => (
//   <div className="container">
//     <h1>Webpack Course</h1>
//     <hr />
//     <div className="logo"></div>
//     <hr />

//     <div className="box">
//       <h2>less</h2>
//     </div>
//     <div className="card">
//       <h2>scss</h2>
//     </div>
//   </div>
// );

// render(<App />, document.getElementById("app"));
