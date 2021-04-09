import { observer } from "mobx-react-lite"
import React, { SyntheticEvent, useState } from "react"
import { Button, Item, Label, Segment } from "semantic-ui-react"
import { IActivity } from "../../../models/activity"
import { useStore } from "../../../stores/rootStore"

interface IActivityListProps {
  activities: IActivity[]
  submitting: boolean
  deleteActivity: (id: string) => void
}

const ActivityList = ({ activities, submitting, deleteActivity }: IActivityListProps) => {
  const { activityStore } = useStore()
  const [target, setTarget] = useState("")

  function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content="View" color="blue" />
                <Button
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  onClick={(e) => handleDeleteActivity(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default observer(ActivityList)
