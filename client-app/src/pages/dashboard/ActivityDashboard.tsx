import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Grid } from "semantic-ui-react"
import LoadingComponent from "../../layout/components/LoadingComponent"
import { useStore } from "../../stores/rootStore"
import ActivityFilters from "./components/ActivityFilters"
import ActivityList from "./components/ActivityList"

const ActivityDashboard = () => {
  const { activityStore } = useStore()
  const { loadActivities, activityRegistry } = activityStore

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities()
    }
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading App" />
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
