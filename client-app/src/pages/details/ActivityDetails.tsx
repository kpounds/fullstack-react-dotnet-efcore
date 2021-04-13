import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router"
import { Card, Grid } from "semantic-ui-react"
import LoadingComponent from "../../layout/components/LoadingComponent"
import { useStore } from "../../stores/rootStore"
import ActivityDetailedChat from "./ActivityDetailedChat"
import ActivityDetailedHeader from "./ActivityDetailedHeader"
import ActivityDetailedInfo from "./ActivityDetailedInfo"
import ActivityDetailedSidebar from "./ActivityDetailedSidebar"

const ActivityDetails = () => {
  const { activityStore } = useStore()
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      loadActivity(id)
    }
  }, [id, loadActivity])

  if (loadingInitial) {
    return <LoadingComponent />
  }

  if (!activity)
    return (
      <Card>
        <Card.Content>No Activity Found!</Card.Content>
      </Card>
    )

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader />
        <ActivityDetailedInfo />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails)
