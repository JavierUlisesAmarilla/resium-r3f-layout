import {CesiumTerrainProvider, HeadingPitchRange, IonResource} from 'cesium'
import {useEffect, useState} from 'react'
import {Cesium3DTileset, useCesium} from 'resium'
import {useZustand} from '../../store/useZustand'
import {clampTilesetToTerrain} from '../../utils/common'


let prevAssetId: number


export const ResiumWorld = ({
  terrainProvider,
  assetId,
}: {
  terrainProvider: CesiumTerrainProvider
  assetId: number
}) => {
  const {viewer} = useCesium()
  const {setResiumViewer, setCenterCart3, setTileset} = useZustand()
  const [tilesetUrl, setTilesetUrl] = useState<Promise<IonResource>>()

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

  return tilesetUrl && (
    <Cesium3DTileset
      url={tilesetUrl}
      projectTo2D
      // debugShowBoundingVolume
      onReady={async (newTileset) => {
        const newCenterCart3 = await clampTilesetToTerrain(terrainProvider, newTileset)
        viewer?.zoomTo(newTileset, new HeadingPitchRange(0.5, -0.5, newTileset.boundingSphere.radius * 3))
        setTileset(newTileset)
        setCenterCart3(newCenterCart3) // (Optional)
      }}
      onClick={(movement, target) => {
        console.log('ResiumWorld#Cesium3DTileset#onClick: movement:', movement)
        console.log('ResiumWorld#Cesium3DTileset#onClick: target:', target)
      }}
    />
  )
}
