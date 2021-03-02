import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container, List } from "semantic-ui-react"
import { IActivity } from "../../Models/activity"
import NavBar from "./NavBar"

function App() {
  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  )
}

export default App
