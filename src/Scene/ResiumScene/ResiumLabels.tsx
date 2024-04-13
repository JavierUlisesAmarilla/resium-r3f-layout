import * as Cesium from 'cesium'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'


export const ResiumLabels = () => {
  const {tileset} = useZustand()

  return tileset && (
    <Resium.Entity position={tileset.boundingSphere.center}>
      <Resium.LabelGraphics
        text='LabelGraphics'
        style={Cesium.LabelStyle.FILL}
        showBackground
        backgroundColor={Cesium.Color.YELLOW}
        horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
        verticalOrigin={Cesium.VerticalOrigin.CENTER}
        heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
        fillColor={Cesium.Color.BLUE}
        disableDepthTestDistance={Number.POSITIVE_INFINITY}
      />
    </Resium.Entity>
  )
}
