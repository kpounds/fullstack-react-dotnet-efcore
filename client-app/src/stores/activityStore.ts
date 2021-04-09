import { makeAutoObservable, runInAction } from "mobx"
import ActivitiesApi from "../api/ActivitiesApi"
import { IActivity } from "../models/activity"
import { v4 as uuid } from "uuid"

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

  setLoading = (state: boolean) => {
    this.loading = state
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

  createActivity = async (activity: IActivity) => {
    this.setLoading(true)
    activity.id = uuid()
    try {
      await ActivitiesApi.createActivity(activity)
      runInAction(() => {
        this.activities.push(activity)
        this.selectedActivity = activity
        this.editMode = false
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }

  updateActivity = async (activity: IActivity) => {
    this.setLoading(true)
    try {
      await ActivitiesApi.updateActivity(activity)
      runInAction(() => {
        this.activities = [...this.activities.filter((a) => a.id !== activity.id), activity]
        this.selectedActivity = activity
        this.editMode = false
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }
}
