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
  createOrEdit: (activity: IActivity) => void
  deleteActivity: (id: string) => void
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  editMode,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: IActivityDashboardProps) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} selectedActivity={selectedActivity} createOrEdit={createOrEdit} />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
