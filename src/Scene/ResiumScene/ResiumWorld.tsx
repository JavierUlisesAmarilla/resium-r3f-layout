import * as Cesium from 'cesium'
import {useEffect} from 'react'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'
import {clampTilesetToTerrain} from '../../utils/common'
import {ResiumBillboard} from './ResiumBillboard'


export const ResiumWorld = ({
  terrainProvider,
  tilesetUrl,
}: {
  terrainProvider: Cesium.CesiumTerrainProvider
  tilesetUrl: Cesium.IonResource
}) => {
  const {viewer} = Resium.useCesium()
  const {setResiumViewer, tileset, setTileset, setCenterCartesian3} = useZustand()

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
        enableLook={false}
        inertiaZoom={0}
        maximumZoomDistance={5000}
      />
      <Resium.Cesium3DTileset
        url={tilesetUrl}
        projectTo2D
        // debugShowBoundingVolume
        onReady={async (newTileset) => {
          await clampTilesetToTerrain(terrainProvider, newTileset)
          // viewer?.zoomTo(newTileset)
          setTileset(newTileset)
          setCenterCartesian3(newTileset.boundingSphere.center)
        }}
        onClick={(movement, target) => {
          console.log('ResiumWorld#Cesium3DTileset#onClick: movement:', movement)
          console.log('ResiumWorld#Cesium3DTileset#onClick: target:', target)
        }}
      />
      {/* <ResiumAnnotations/> */}
      {tileset &&
        <ResiumBillboard
          position={tileset.boundingSphere.center}
          text='Billboard'
        />
      }
    </>
  )
}
