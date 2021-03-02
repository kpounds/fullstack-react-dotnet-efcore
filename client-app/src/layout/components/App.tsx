import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import NavBar from "./NavBar"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"

function App() {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: IActivity) {
    activity.id
      ? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
      : setActivities([...activities, activity])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data)
    })
  }, [])

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  )
}

export default App
