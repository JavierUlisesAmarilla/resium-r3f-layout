import * as Cesium from 'cesium'
import {ZustandSlice} from './useZustand'


export type ResiumSlice = {
  resiumViewer: Cesium.Viewer | undefined
  setResiumViewer: (resiumViewer: Cesium.Viewer) => void

  tileset: Cesium.Cesium3DTileset | undefined
  setTileset: (tileset: Cesium.Cesium3DTileset) => void

  centerCartesian3: Cesium.Cartesian3
  setCenterCartesian3: (centerCartesian3: Cesium.Cartesian3) => void

  isResiumCameraBeingUsed: boolean
  setIsResiumCameraBeingUsed: (isResiumCameraBeingUsed: boolean) => void
}


export const createResiumSlice: ZustandSlice<ResiumSlice> = (set) => {
  return {
    resiumViewer: undefined,
    setResiumViewer: (resiumViewer) => set(() => ({resiumViewer})),

    tileset: undefined,
    setTileset: (tileset) => set(() => ({tileset})),

    centerCartesian3: Cesium.Cartesian3.ZERO,
    setCenterCartesian3: (centerCartesian3) => set(() => ({centerCartesian3})),

    isResiumCameraBeingUsed: false,
    setIsResiumCameraBeingUsed: (isResiumCameraBeingUsed) => set(() => ({isResiumCameraBeingUsed})),
  }
}
