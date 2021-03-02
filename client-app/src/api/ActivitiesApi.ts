import { IActivity } from "../models/activity"
import { HttpAgent } from "../utils/httpAgent"

class ActivitiesApi {
  private static readonly baseURL: string = "/activities"

  public getActivitiesList = async () => {
    const response = await HttpAgent.get<IActivity[]>(`${ActivitiesApi.baseURL}`)
    return response
  }

  public getActivityDetails = async (id: string) => {
    const response = await HttpAgent.get<IActivity>(`${ActivitiesApi.baseURL}/${id}`)
    return response
  }

  public createActivity = async (activity: IActivity) => {
    const response = await HttpAgent.post<void>(`${ActivitiesApi.baseURL}`, activity)
    return response
  }

  public updateActivity = async (activity: IActivity) => {
    const response = await HttpAgent.put<void>(`${ActivitiesApi.baseURL}/${activity.id}`, activity)
    return response
  }

  public deleteActivity = async (id: string) => {
    const response = await HttpAgent.delete<void>(`${ActivitiesApi.baseURL}/${id}`)
    return response
  }
}

export default new ActivitiesApi()
