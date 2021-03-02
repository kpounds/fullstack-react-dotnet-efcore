import React, { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import NavBar from "./NavBar"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"
import { v4 as uuid } from "uuid"
import ActivitiesApi from "../../api/ActivitiesApi"
import LoadingComponent from "./LoadingComponent"

function App() {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

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
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)])
  }

  useEffect(() => {
    ActivitiesApi.getActivitiesList().then((response) => {
      let activities: IActivity[] = []
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0]
        activities.push(activity)
      })
      setActivities(activities)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingComponent content="Loading App" />
  }

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
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
