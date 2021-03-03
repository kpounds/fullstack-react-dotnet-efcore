import React, { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import NavBar from "./NavBar"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"
import { v4 as uuid } from "uuid"
import ActivitiesApi from "../../api/ActivitiesApi"
import LoadingComponent from "./LoadingComponent"
import { useStore } from "../../stores/rootStore"
import { observer } from "mobx-react-lite"

function App() {
  const { activityStore } = useStore()

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
    setSubmitting(true)
    if (activity.id) {
      ActivitiesApi.updateActivity(activity).then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      ActivitiesApi.createActivity(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    ActivitiesApi.deleteActivity(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)])
      setSubmitting(false)
    })
  }

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading App" />
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default observer(App)
