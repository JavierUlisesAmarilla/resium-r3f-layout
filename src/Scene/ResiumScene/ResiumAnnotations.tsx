import * as Cesium from 'cesium'
import {Fragment, useEffect, useState} from 'react'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'


export type AnnotationType = {
  startPoint: Cesium.Cartesian3
  endPoint: Cesium.Cartesian3
}


const pointScalar = new Cesium.NearFarScalar(20, 0.7, 1000, 0)
const angleOffset = 0.00001
const heightOffset = 0


export const ResiumAnnotations = () => {
  const [annotationArr, setAnnotationArr] = useState<AnnotationType[]>([])
  const {tileset} = useZustand()

  useEffect(() => {
    if (tileset) {
      const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
      const newAnnotationArr: AnnotationType[] = []

      for (let i = 0; i < 10; i++) {
        newAnnotationArr.push({
          startPoint: Cesium.Cartesian3.fromRadians(
              cartographic.longitude + (angleOffset / 2) - (Math.random() * angleOffset),
              cartographic.latitude + (angleOffset / 2) - (Math.random() * angleOffset),
              cartographic.height + (Math.random() * heightOffset),
          ),
          endPoint: Cesium.Cartesian3.fromRadians(
              cartographic.longitude + (angleOffset / 2) - (Math.random() * angleOffset),
              cartographic.latitude + (angleOffset / 2) - (Math.random() * angleOffset),
              cartographic.height + (Math.random() * heightOffset),
          ),
        })
      }

      setAnnotationArr(newAnnotationArr)
    }
  }, [tileset])

  return annotationArr.map((annotation, index) =>
    <Fragment key={index}>
      <Resium.Entity position={annotation.startPoint}>
        <Resium.PointGraphics
          scaleByDistance={pointScalar}
          color={Cesium.Color.RED}
          pixelSize={20}
        // disableDepthTestDistance={Number.POSITIVE_INFINITY}
        />
      </Resium.Entity>
      <Resium.Entity>
        <Resium.PolylineGraphics
          positions={[annotation.startPoint, annotation.endPoint]}
          material={Cesium.Color.GREENYELLOW}
          depthFailMaterial={Cesium.Color.GREENYELLOW}
          width={2}
        />
      </Resium.Entity>
      <Resium.Entity position={annotation.endPoint}>
        <Resium.PointGraphics
          scaleByDistance={pointScalar}
          color={Cesium.Color.RED}
          pixelSize={20}
        // disableDepthTestDistance={Number.POSITIVE_INFINITY}
        />
      </Resium.Entity>
    </Fragment>,
  )
}
