import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import { useStore } from "../../stores/rootStore"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./components/ActivityList"

const ActivityDashboard = () => {
  const { activityStore } = useStore()
  const { selectedActivity, editMode } = activityStore

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
