import * as Cesium from 'cesium'
import {ResiumScene} from './ResiumScene/ResiumScene'


export const Scene = ({
  className,
  terrainProvider,
  assetId,
}: {
  className: string
  terrainProvider: Cesium.CesiumTerrainProvider
  assetId: number
}) => {
  return (
    <div className={className}>
      <ResiumScene
        terrainProvider={terrainProvider}
        assetId={assetId}
      />
    </div>
  )
}
