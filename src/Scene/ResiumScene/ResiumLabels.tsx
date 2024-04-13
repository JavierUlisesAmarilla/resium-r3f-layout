import * as Cesium from 'cesium'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'


export const ResiumLabels = () => {
  const {tileset} = useZustand()

  return tileset && (
    <Resium.Entity position={tileset.boundingSphere.center}>
      <Resium.LabelGraphics
        text='LabelGraphics'
        showBackground
        backgroundColor={Cesium.Color.YELLOW}
        horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
        verticalOrigin={Cesium.VerticalOrigin.CENTER}
        fillColor={Cesium.Color.BLUE}
        disableDepthTestDistance={Number.POSITIVE_INFINITY}
      />
    </Resium.Entity>
  )
}
