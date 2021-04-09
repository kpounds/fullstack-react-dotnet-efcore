import { observer } from "mobx-react-lite"
import React from "react"
import { Grid } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import { useStore } from "../../stores/rootStore"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./components/ActivityList"

interface IActivityDashboardProps {
  activities: IActivity[]
  submitting: boolean
  deleteActivity: (id: string) => void
}

const ActivityDashboard = ({ activities, submitting, deleteActivity }: IActivityDashboardProps) => {
  const { activityStore } = useStore()
  const { selectedActivity, editMode } = activityStore
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} deleteActivity={deleteActivity} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
