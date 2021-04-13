import { observer } from "mobx-react-lite"
import { Fragment } from "react"
import { Header, Item, Segment } from "semantic-ui-react"
import { useStore } from "../../../stores/rootStore"
import ActivityListItem from "./ActivityListItem"

const ActivityList = () => {
  const { activityStore } = useStore()
  const { groupedActivitiesByDate } = activityStore

  return (
    <>
      {groupedActivitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  )
}

export default observer(ActivityList)
