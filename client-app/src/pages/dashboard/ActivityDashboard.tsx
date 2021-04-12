import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Grid } from "semantic-ui-react"
import LoadingComponent from "../../layout/components/LoadingComponent"
import { useStore } from "../../stores/rootStore"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./components/ActivityList"

const ActivityDashboard = () => {
  const { activityStore } = useStore()
  const { selectedActivity, editMode } = activityStore

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading App" />
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
