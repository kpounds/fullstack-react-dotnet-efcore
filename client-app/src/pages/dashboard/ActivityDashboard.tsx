import React, { FunctionComponent } from "react"
import { Grid } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./components/ActivityList"

interface IActivityDashboardProps {
  activities: IActivity[]
  selectedActivity?: IActivity
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
}

const ActivityDashboard: FunctionComponent<IActivityDashboardProps> = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
