import React, { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import NavBar from "./NavBar"
import ActivityDashboard from "../../pages/dashboard/ActivityDashboard"
import ActivitiesApi from "../../api/ActivitiesApi"
import LoadingComponent from "./LoadingComponent"
import { useStore } from "../../stores/rootStore"
import { observer } from "mobx-react-lite"

function App() {
  const { activityStore } = useStore()

  const [activities, setActivities] = useState<IActivity[]>([])
  const [submitting, setSubmitting] = useState(false)

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
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activityStore.activities} deleteActivity={handleDeleteActivity} submitting={submitting} />
      </Container>
    </>
  )
}

export default observer(App)
