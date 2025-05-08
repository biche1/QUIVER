// import React from "react"
// import ReactDOM from "react-dom/client"
// import App from "./App.jsx"
// import "./index.css"

// // Create root and render app

// console.log("we did not entered here")
// const root = document.getElementById("root")
// if (root) {
//   ReactDOM.createRoot(root).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//   )
// } else {
//   console.error("Root element not found! Make sure there's a div with id='root' in your HTML.")
// }

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx" // Ensure this path is correct

console.log("we did not entered here")

const root = document.getElementById("root")
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error("Root element not found!")
}

