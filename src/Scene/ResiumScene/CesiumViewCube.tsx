/* eslint-disable @typescript-eslint/no-explicit-any */
import '@geoblocks/cesium-view-cube'
import {useEffect} from 'react'
import {useZustand} from '../../store/useZustand'


export const CesiumViewCube = () => {
  const {resiumViewer} = useZustand()

  useEffect(() => {
    const cesiumViewCube: any = document.querySelector('cesium-view-cube')

    if (cesiumViewCube && resiumViewer) {
      cesiumViewCube.scene = resiumViewer.scene
    }
  }, [resiumViewer])

  return (
    <cesium-view-cube/>
  )
}
