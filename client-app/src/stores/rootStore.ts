import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"

interface IRootStore {
  activityStore: ActivityStore
}

export const RootStore: IRootStore = {
  activityStore: new ActivityStore(),
}

export const RootStoreContext = createContext(RootStore)

export function useStore() {
  return useContext(RootStoreContext)
}
