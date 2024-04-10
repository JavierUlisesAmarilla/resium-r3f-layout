import * as Cesium from 'cesium'
import {useEffect, useState} from 'react'
import {Scene} from './Scene/Scene'


export const App = () => {
  const [terrainProvider, setTerrainProvider] = useState<Cesium.CesiumTerrainProvider>()

  useEffect(() => {
    (async () => {
      const worldTerrain = await Cesium.createWorldTerrainAsync({
        requestVertexNormals: true,
        requestWaterMask: true,
      })
      setTerrainProvider(worldTerrain)
    })()
  }, [])

  return terrainProvider && (
    <Scene
      className='relative flex flex-col w-full h-full'
      terrainProvider={terrainProvider}
      // assetId={2302071}
      // assetId={1521848}
      // assetId={2310587}
      assetId={2482359}
    />
  )
}
