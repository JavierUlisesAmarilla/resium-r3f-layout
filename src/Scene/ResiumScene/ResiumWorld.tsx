import * as Cesium from 'cesium'
import {useEffect, useState} from 'react'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'
import {clampTilesetToTerrain} from '../../utils/common'
import {ResiumAnnotations} from './ResiumAnnotations'
import {ResiumLabels} from './ResiumLabels'


let prevAssetId: number


export const ResiumWorld = ({
  terrainProvider,
  assetId,
}: {
  terrainProvider: Cesium.CesiumTerrainProvider
  assetId: number
}) => {
  const {viewer} = Resium.useCesium()
  const {setResiumViewer, setCenterCart3, setTileset} = useZustand()
  const [tilesetUrl, setTilesetUrl] = useState<Promise<Cesium.IonResource>>()

  useEffect(() => {
    if (prevAssetId !== assetId) {
      const newTilesetUrl = Cesium.IonResource.fromAssetId(assetId)
      setTilesetUrl(newTilesetUrl)
      prevAssetId = assetId
    }
  }, [assetId])

  useEffect(() => {
    if (viewer) {
      setResiumViewer(viewer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Resium.Globe
        depthTestAgainstTerrain
      />
      <Resium.ScreenSpaceCameraController
        enableInputs={true}
        inertiaZoom={0}
        maximumZoomDistance={1000}
      />
      {tilesetUrl &&
        <Resium.Cesium3DTileset
          url={tilesetUrl}
          projectTo2D
          // debugShowBoundingVolume
          onReady={async (newTileset) => {
            const newCenterCart3 = await clampTilesetToTerrain(terrainProvider, newTileset)
            viewer?.zoomTo(newTileset, new Cesium.HeadingPitchRange(0.5, -0.5, newTileset.boundingSphere.radius * 3))
            setTileset(newTileset)
            setCenterCart3(newCenterCart3)
          }}
          onClick={(movement, target) => {
            console.log('ResiumWorld#Cesium3DTileset#onClick: movement:', movement)
            console.log('ResiumWorld#Cesium3DTileset#onClick: target:', target)
          }}
        />
      }
      <ResiumAnnotations/>
      <ResiumLabels/>
    </>
  )
}
