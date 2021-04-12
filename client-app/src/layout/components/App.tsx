import { Container } from "semantic-ui-react"
import NavBar from "./NavBar"
import { observer } from "mobx-react-lite"
import { Route } from "react-router"
import HomePage from "../../pages/home/HomePage"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"
import ActivityForm from "../../pages/form/ActivityForm"
import ActivityDetails from "../../pages/details/ActivityDetails"

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
      </Container>
    </>
  )
}

export default observer(App)
