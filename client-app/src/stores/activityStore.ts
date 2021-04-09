import { makeAutoObservable, runInAction } from "mobx"
import ActivitiesApi from "../api/ActivitiesApi"
import { IActivity } from "../models/activity"
import { v4 as uuid } from "uuid"

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>()
  selectedActivity: IActivity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = true

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  }

  loadActivities = async () => {
    try {
      const activities = await ActivitiesApi.getActivitiesList()
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0]
        this.activityRegistry.set(activity.id, activity)
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
    this.selectedActivity = this.activityRegistry.get(id)
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
        this.activityRegistry.set(activity.id, activity)
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
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }

  deleteActivity = async (id: string) => {
    this.setLoading(true)
    try {
      await ActivitiesApi.deleteActivity(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity()
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }
}
