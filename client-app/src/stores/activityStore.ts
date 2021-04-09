import { makeAutoObservable } from "mobx"
import ActivitiesApi from "../api/ActivitiesApi"
import { IActivity } from "../models/activity"

export default class ActivityStore {
  activities: IActivity[] = []
  selectedActivity: IActivity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = false

  constructor() {
    makeAutoObservable(this)
  }

  loadActivities = async () => {
    this.setLoadingInitial(true)
    try {
      const activities = await ActivitiesApi.getActivitiesList()
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0]
        this.activities.push(activity)
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoadingInitial(false)
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id)
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity()
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false
  }
}
