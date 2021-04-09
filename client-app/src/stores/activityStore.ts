import { makeAutoObservable } from "mobx"
import ActivitiesApi from "../api/ActivitiesApi"
import { IActivity } from "../models/activity"

export default class ActivityStore {
  activities: IActivity[] = []
  selectedActivity: IActivity | null = null
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
}
