import {Cartesian3, Cartographic, CesiumTerrainProvider, Color, HeadingPitchRange, IonResource, NearFarScalar} from 'cesium'
import {useEffect, useState} from 'react'
import {Cesium3DTileset, Entity, PointGraphics, PolylineGraphics, useCesium} from 'resium'
import {useZustand} from '../../store/useZustand'
import {clampTilesetToTerrain} from '../../utils/common'


let prevAssetId: number
const pointScalar = new NearFarScalar(20, 0.7, 1000, 0)


export const ResiumWorld = ({
  terrainProvider,
  assetId,
}: {
  terrainProvider: CesiumTerrainProvider
  assetId: number
}) => {
  const {viewer} = useCesium()
  const {setResiumViewer, centerCart3, setCenterCart3, setTileset} = useZustand()
  const [tilesetUrl, setTilesetUrl] = useState<Promise<IonResource>>()
  const [topCart3, setTopCart3] = useState<Cartesian3>()

  useEffect(() => {
    if (prevAssetId !== assetId) {
      const newTilesetUrl = IonResource.fromAssetId(assetId)
      setTilesetUrl(newTilesetUrl)
      prevAssetId = assetId
    }
  }, [assetId])

  useEffect(() => {
    if (viewer) {
      // viewer.scene.screenSpaceCameraController.enableInputs = false
      // viewer.scene.globe.depthTestAgainstTerrain = true // This fixes the 3d tileset flickering issue, but hides the parts of the tileset that are below the ground surface.
      viewer.scene.screenSpaceCameraController.inertiaZoom = 0
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 1000
      setResiumViewer(viewer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {tilesetUrl &&
        <Cesium3DTileset
          url={tilesetUrl}
          projectTo2D
          // debugShowBoundingVolume
          onReady={async (newTileset) => {
            const newCenterCart3 = await clampTilesetToTerrain(terrainProvider, newTileset)
            viewer?.zoomTo(newTileset, new HeadingPitchRange(0.5, -0.5, newTileset.boundingSphere.radius * 3))
            setTileset(newTileset)
            setCenterCart3(newCenterCart3)
            const newCenterCartographic = Cartographic.fromCartesian(newCenterCart3)
            const newTopCart3 = Cartesian3.fromRadians(
                newCenterCartographic.longitude + 0.00001,
                newCenterCartographic.latitude + 0.00001,
                newCenterCartographic.height + 180,
            )
            setTopCart3(newTopCart3)
          }}
          onClick={(movement, target) => {
            console.log('ResiumWorld#Cesium3DTileset#onClick: movement:', movement)
            console.log('ResiumWorld#Cesium3DTileset#onClick: target:', target)
          }}
        />
      }
      {centerCart3 && topCart3 &&
        <>
          <Entity position={centerCart3}>
            <PointGraphics
              scaleByDistance={pointScalar}
              color={Color.RED}
              pixelSize={20}
              disableDepthTestDistance={Number.POSITIVE_INFINITY}
            />
          </Entity>
          <Entity>
            <PolylineGraphics
              positions={[centerCart3, topCart3]}
              material={Color.GREENYELLOW}
              depthFailMaterial={Color.GREENYELLOW}
              width={2}
            />
          </Entity>
          <Entity position={topCart3}>
            <PointGraphics
              scaleByDistance={pointScalar}
              color={Color.RED}
              pixelSize={20}
              disableDepthTestDistance={Number.POSITIVE_INFINITY}
            />
          </Entity>
        </>
      }
    </>
  )
}
