import * as Cesium from 'cesium'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'


export const ResiumLabels = () => {
  const {tileset} = useZustand()

  return tileset && (
    <>
      <Resium.BillboardCollection modelMatrix={Cesium.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center)}>
        <Resium.Billboard
          position={Cesium.Cartesian3.ZERO}
          image='billboard.jpg'
          horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
          verticalOrigin={Cesium.VerticalOrigin.CENTER}
          color={Cesium.Color.YELLOW}
          sizeInMeters
          width={80}
          height={14}
        />
      </Resium.BillboardCollection>
      <Resium.Entity position={tileset.boundingSphere.center}>
        <Resium.LabelGraphics
          text='LabelGraphics'
          style={Cesium.LabelStyle.FILL}
          horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
          verticalOrigin={Cesium.VerticalOrigin.CENTER}
          fillColor={Cesium.Color.BLUE}
          disableDepthTestDistance={Number.POSITIVE_INFINITY}
        />
      </Resium.Entity>
    </>
  )
}
