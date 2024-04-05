import {ZustandSlice} from './useZustand'


export type CommonSlice = {
  areAllEventsOnLockdown: boolean
  setAreAllEventsOnLockdown: (areAllEventsOnLockdown: boolean) => void
}


export const createCommonSlice: ZustandSlice<CommonSlice> = (set) => {
  return {
    areAllEventsOnLockdown: false,
    setAreAllEventsOnLockdown: (areAllEventsOnLockdown) => set(() => ({areAllEventsOnLockdown})),
  }
}
