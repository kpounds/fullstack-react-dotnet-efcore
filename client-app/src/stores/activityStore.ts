import { makeAutoObservable, runInAction } from "mobx"
import ActivitiesApi from "../api/ActivitiesApi"
import { IActivity } from "../models/activity"

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
    this.setLoadingInitial(true)
    try {
      const activities = await ActivitiesApi.getActivitiesList()
      activities.forEach((activity) => {
        this.setActivity(activity)
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoadingInitial(false)
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.selectedActivity = activity
      return activity
    } else {
      this.setLoadingInitial(true)
      try {
        activity = await ActivitiesApi.getActivityDetails(id)
        this.setActivity(activity)
        this.setSelectedActivity(activity)
        return activity
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoadingInitial(false)
      }
    }
  }

  private setActivity = (activity: IActivity) => {
    activity.date = activity.date.split("T")[0]
    this.activityRegistry.set(activity.id, activity)
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  setLoading = (state: boolean) => {
    this.loading = state
  }

  setSelectedActivity = (activity: IActivity) => {
    this.selectedActivity = activity
  }

  createActivity = async (activity: IActivity) => {
    this.setLoading(true)
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
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }
}
