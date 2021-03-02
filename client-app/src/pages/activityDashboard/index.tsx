import React, { FunctionComponent } from "react"
import { Grid } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import ActivityList from "./components/ActivityList"

interface IActivityDashboardProps {
  activities: IActivity[]
}

const ActivityDashboard: FunctionComponent<IActivityDashboardProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
