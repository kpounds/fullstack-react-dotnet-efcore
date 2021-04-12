import { Container } from "semantic-ui-react"
import NavBar from "./NavBar"
import { observer } from "mobx-react-lite"
import { Route } from "react-router"
import HomePage from "../../pages/home/HomePage"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"
import ActivityForm from "../../pages/form/ActivityForm"

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </>
  )
}

export default observer(App)
