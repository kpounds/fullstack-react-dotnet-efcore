import React, { FunctionComponent } from "react"
import { Button, Card, Image } from "semantic-ui-react"
import { IActivity } from "../../models/activity"

interface IActivityDetailsProps {
  activity: IActivity
  cancelSelectActivity: () => void
}

const ActivityDetails: FunctionComponent<IActivityDetailsProps> = ({ activity, cancelSelectActivity }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button basic color="blue" content="Edit" />
          <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails
