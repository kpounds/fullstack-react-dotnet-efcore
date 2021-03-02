import React from "react"
import { Grid } from "semantic-ui-react"
import { IActivity } from "../../models/activity"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./components/ActivityList"

interface IActivityDashboardProps {
  activities: IActivity[]
  selectedActivity?: IActivity
  editMode: boolean
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  openForm: (id: string) => void
  closeForm: () => void
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  editMode,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
}: IActivityDashboardProps) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
