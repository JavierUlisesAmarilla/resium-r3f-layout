import {Cartesian3, Cartographic, Color, NearFarScalar} from 'cesium'
import {Fragment, useEffect, useState} from 'react'
import {Entity, PointGraphics, PolylineGraphics} from 'resium'
import {useZustand} from '../../store/useZustand'


export type AnnotationType = {
  startPoint: Cartesian3
  endPoint: Cartesian3
}


const pointScalar = new NearFarScalar(20, 0.7, 1000, 0)
const angleOffset = 0.00001
const heightOffset = 50


export const ResiumAnnotations = () => {
  const [annotationArr, setAnnotationArr] = useState<AnnotationType[]>([])
  const {tileset} = useZustand()

  useEffect(() => {
    if (tileset) {
      const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center)
      const newAnnotationArr: AnnotationType[] = []

      for (let i = 0; i < 10; i++) {
        newAnnotationArr.push({
          startPoint: Cartesian3.fromRadians(
              cartographic.longitude + (Math.random() * angleOffset),
              cartographic.latitude + (Math.random() * angleOffset),
              cartographic.height + (Math.random() * heightOffset),
          ),
          endPoint: Cartesian3.fromRadians(
              cartographic.longitude + (Math.random() * angleOffset),
              cartographic.latitude + (Math.random() * angleOffset),
              cartographic.height + (Math.random() * heightOffset),
          ),
        })
      }

      setAnnotationArr(newAnnotationArr)
    }
  }, [tileset])

  return annotationArr.map((annotation, index) =>
    <Fragment key={index}>
      <Entity position={annotation.startPoint}>
        <PointGraphics
          scaleByDistance={pointScalar}
          color={Color.RED}
          pixelSize={20}
          disableDepthTestDistance={Number.POSITIVE_INFINITY}
        />
      </Entity>
      <Entity>
        <PolylineGraphics
          positions={[annotation.startPoint, annotation.endPoint]}
          material={Color.GREENYELLOW}
          depthFailMaterial={Color.GREENYELLOW}
          width={2}
        />
      </Entity>
      <Entity position={annotation.endPoint}>
        <PointGraphics
          scaleByDistance={pointScalar}
          color={Color.RED}
          pixelSize={20}
          disableDepthTestDistance={Number.POSITIVE_INFINITY}
        />
      </Entity>
    </Fragment>,
  )
}
