import { observer } from "mobx-react-lite"
import { ChangeEvent, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, Segment } from "semantic-ui-react"
import LoadingComponent from "../../layout/components/LoadingComponent"
import { useStore } from "../../stores/rootStore"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"

const ActivityForm = () => {
  const { activityStore } = useStore()
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [activity, setActivity] = useState({ id: "", title: "", category: "", description: "", date: "", city: "", venue: "" })

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!))
    }
  }, [id, loadActivity])

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
