import React from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { IActivity } from "../../models/activity"

interface IActivityFormProps {
  activity?: IActivity
  closeForm: () => void
}

const ActivityForm = ({ activity, closeForm }: IActivityFormProps) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  )
}

export default ActivityForm
