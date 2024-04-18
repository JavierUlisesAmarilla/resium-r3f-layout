import {OrthographicCamera, PerspectiveCamera} from '@react-three/drei'
import * as Cesium from 'cesium'
import {useEffect, useRef} from 'react'
import * as Three from 'three'
import {useZustand} from '../../store/useZustand'
import {DEFAULT_CAMERA_DISTANCE, SCENE_MODE} from '../../utils/constants'


export const R3fCamera = () => {
  const pcRef = useRef<Three.PerspectiveCamera>(null)
  const ocRef = useRef<Three.OrthographicCamera>(null)
  const {setR3fCamera} = useZustand()

  useEffect(() => {
    switch (SCENE_MODE) {
      case Cesium.SceneMode.SCENE3D:
        setR3fCamera(pcRef.current)
        break
      default:
        setR3fCamera(ocRef.current)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {SCENE_MODE === Cesium.SceneMode.SCENE3D &&
        <PerspectiveCamera
          ref={pcRef}
          makeDefault
          position={[DEFAULT_CAMERA_DISTANCE, DEFAULT_CAMERA_DISTANCE, DEFAULT_CAMERA_DISTANCE]}
        />
      }
      {SCENE_MODE === Cesium.SceneMode.COLUMBUS_VIEW &&
        <OrthographicCamera
          ref={ocRef}
          makeDefault
          position={[DEFAULT_CAMERA_DISTANCE, DEFAULT_CAMERA_DISTANCE, DEFAULT_CAMERA_DISTANCE]}
        />
      }
    </>
  )
}
