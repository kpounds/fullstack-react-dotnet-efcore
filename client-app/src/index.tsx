import React from "react"
import ReactDOM from "react-dom"
import "semantic-ui-css/semantic.min.css"
import "./layout/styles/styles.css"
import App from "./layout/components/App"
import reportWebVitals from "./reportWebVitals"
import { RootStore, RootStoreContext } from "./stores/rootStore"

ReactDOM.render(
  <RootStoreContext.Provider value={RootStore}>
    <App />
  </RootStoreContext.Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
