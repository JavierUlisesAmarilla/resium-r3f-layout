import * as Cesium from 'cesium'
import {useEffect, useState} from 'react'
import {Vector3} from 'three'
import {useZustand} from '../../store/useZustand'
import {cesiumCartesian3ToThreePosition} from '../../utils/common'
import {Model} from '../Utils/Model'
import {PotreeModel} from '../Utils/PotreeModel'
import {Sprite} from '../Utils/Sprite'


export const R3fAssets = () => {
  const {tileset} = useZustand()
  const [modelPosition, setModelPosition] = useState<Vector3>()
  const [potreeModelPosition, setPotreeModelPosition] = useState<Vector3>()

  useEffect(() => {
    if (tileset) {
      const centerCartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
      const modelLongitude = centerCartographic.longitude + 0.00001
      setModelPosition(cesiumCartesian3ToThreePosition(Cesium.Cartesian3.fromRadians(centerCartographic.latitude, modelLongitude, centerCartographic.height + 50)))
      const potreeModelLatitude = centerCartographic.latitude + 0.00001
      setPotreeModelPosition(cesiumCartesian3ToThreePosition(Cesium.Cartesian3.fromRadians(potreeModelLatitude, centerCartographic.longitude, centerCartographic.height + 50)))
    }
  }, [tileset])

  return (
    <>
      {modelPosition &&
        <Model
          modelPath='models/planet_o.glb'
          rigidPos={modelPosition.toArray()}
          rigidScale={0.05}
        >
          <Sprite
            position={[0, 120, 0]}
            zoomDistance={20}
          >
            <div className='p-3 text-3xl font-bold text-white bg-black cursor-pointer opacity-60 rounded-xl hover:text-yellow-500'>GLB Model</div>
          </Sprite>
        </Model>
      }
      {potreeModelPosition &&
        <PotreeModel
          fileName='cloud.js'
          baseUrl='http://5.9.65.151/mschuetz/potree/resources/pointclouds/weiss/subsea_equipment/'
          modelPos={[-30, -10, -5]}
          modelRot={[-Math.PI / 2, 0, 0]}
          modelScale={0.5}
        >
          <Sprite
            position={[5, -10, 40]}
            zoomDistance={20}
          >
            <div className='p-3 text-3xl font-bold text-white bg-black cursor-pointer opacity-60 rounded-xl hover:text-yellow-500'>Potree Model</div>
          </Sprite>
        </PotreeModel>
      }
    </>
  )
}
