import * as Cesium from 'cesium'
import * as Resium from 'resium'
import {useZustand} from '../../store/useZustand'


export const ResiumLabels = () => {
  const {tileset} = useZustand()

  return tileset && (
    <>
      <Resium.LabelCollection
        modelMatrix={Cesium.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center)}
      >
        <Resium.Label
          position={new Cesium.Cartesian3(0, 100, 20)}
          // id={}
          show
          text='Label'
          // font=''
          // style={}
          // scale={}
          showBackground
          backgroundColor={Cesium.Color.YELLOW}
          backgroundPadding={Cesium.Cartesian2.ZERO}
          // pixelOffset={}
          // eyeOffset={}
          horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
          verticalOrigin={Cesium.VerticalOrigin.CENTER}
          // heightReference={}
          fillColor={Cesium.Color.BLACK}
        // outlineColor={}
        // outlineWidth={}
        // translucencyByDistance={}
        // pixelOffsetScaleByDistance={}
        // scaleByDistance={}
        // distanceDisplayCondition={}
        // disableDepthTestDistance={}
        />
      </Resium.LabelCollection>
      <Resium.Entity position={tileset.boundingSphere.center}>
        <Resium.LabelGraphics
          show
          text='LabelGraphics'
          // font=''
          // style={}
          // scale={}
          showBackground
          backgroundColor={Cesium.Color.YELLOW}
          backgroundPadding={Cesium.Cartesian2.ZERO}
          // pixelOffset={}
          // eyeOffset={}
          horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
          verticalOrigin={Cesium.VerticalOrigin.CENTER}
          // heightReference={}
          fillColor={Cesium.Color.BLACK}
        // outlineColor={}
        // outlineWidth={}
        // translucencyByDistance={}
        // pixelOffsetScaleByDistance={}
        // scaleByDistance={}
        // distanceDisplayCondition={}
        // disableDepthTestDistance={}
        />
      </Resium.Entity>
    </>
  )
}
