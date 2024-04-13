import * as Cesium from 'cesium'
import {ResiumScene} from './ResiumScene/ResiumScene'


export const Scene = ({
  className,
  terrainProvider,
  tilesetUrl,
}: {
  className: string
  terrainProvider: Cesium.CesiumTerrainProvider
  tilesetUrl: Cesium.IonResource
}) => {
  return (
    <div className={className}>
      <ResiumScene
        terrainProvider={terrainProvider}
        tilesetUrl={tilesetUrl}
      />
    </div>
  )
}
