import { IActivity } from "../models/activity"
import { HttpAgent } from "../utils/httpAgent"

class ActivitiesApi {
  private static readonly baseURL: string = "/activities"

  public getActivitiesList = async () => {
    const response = await HttpAgent.get<IActivity[]>(`${ActivitiesApi.baseURL}`)
    return response
  }
}

export default new ActivitiesApi()
