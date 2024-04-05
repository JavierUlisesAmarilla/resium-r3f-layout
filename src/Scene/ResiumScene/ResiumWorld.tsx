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
  const {setResiumViewer, setCenterCart3} = useZustand()
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
      setResiumViewer(viewer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tilesetUrl && (
    <Cesium3DTileset
      url={tilesetUrl}
      projectTo2D
      debugShowBoundingVolume
      onReady={async (newTileset) => {
        // const newCenterCart3 = newTileset.boundingSphere.center
        const newCenterCart3 = await clampTilesetToTerrain(terrainProvider, newTileset)
        viewer?.zoomTo(newTileset, new HeadingPitchRange(0, -0.5, newTileset.boundingSphere.radius * 3))
        setCenterCart3(newCenterCart3) // (Optional)
      }}
      onClick={(movement, target) => {
        console.log('ResiumWorld#Cesium3DTileset#onClick: movement:', movement)
        console.log('ResiumWorld#Cesium3DTileset#onClick: target:', target)
      }}
    />
  )
}
