import * as Cesium from 'cesium'
import {ZustandSlice} from './useZustand'


export type ResiumSlice = {
  resiumViewer: Cesium.Viewer | undefined
  setResiumViewer: (resiumViewer: Cesium.Viewer | undefined) => void

  tileset: Cesium.Cesium3DTileset | undefined
  setTileset: (tileset: Cesium.Cesium3DTileset | undefined) => void

  centerCart3: Cesium.Cartesian3 | undefined
  setCenterCart3: (centerCart3: Cesium.Cartesian3 | undefined) => void
}


export const createResiumSlice: ZustandSlice<ResiumSlice> = (set) => {
  return {
    resiumViewer: undefined,
    setResiumViewer: (resiumViewer) => set(() => ({resiumViewer})),

    tileset: undefined,
    setTileset: (tileset) => set(() => ({tileset})),

    centerCart3: undefined,
    setCenterCart3: (centerCart3) => set(() => ({centerCart3})),
  }
}
