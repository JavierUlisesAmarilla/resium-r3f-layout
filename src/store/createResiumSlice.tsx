import {Cartesian3, Cesium3DTileset, Viewer} from 'cesium'
import {ZustandSlice} from './useZustand'


export type ResiumSlice = {
  resiumViewer: Viewer | undefined
  setResiumViewer: (resiumViewer: Viewer | undefined) => void

  tileset: Cesium3DTileset | undefined
  setTileset: (tileset: Cesium3DTileset | undefined) => void

  centerCart3: Cartesian3 | undefined
  setCenterCart3: (centerCart3: Cartesian3 | undefined) => void
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
