import * as Cesium from 'cesium'
import {MathUtils, Vector3} from 'three'


// Get the Euclidean modulo of angle % 2 * PI.
export const normalizeAngle = (angle: number) => {
  const TAU = Math.PI * 2
  return MathUtils.euclideanModulo(angle, TAU)
}


// Get angle between line ba and bc.
export const getAngle = (a: Vector3, b: Vector3, c: Vector3) => {
  const d1 = a.clone().sub(b)
  const d2 = c.clone().sub(b)
  const angle = (d1.length() && d2.length()) ? d1.angleTo(d2) : 0
  return angle
}


// Move tileset vertically by earth's surface.
export const moveTilesetVertically = (tileset: Cesium.Cesium3DTileset, height: number) => {
  const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
  const surfaceCart3 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
  const offsetCart3 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height)
  const translation = Cesium.Cartesian3.subtract(offsetCart3, surfaceCart3, new Cesium.Cartesian3())
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  return surfaceCart3
}


export const getTilesetMinBottomHeight = (rootTile: Cesium.Cesium3DTile) => {
  let minHeight = Cesium.Cartographic.fromCartesian(rootTile.boundingSphere.center).height

  for (let i = 0; i < rootTile.children.length; i++) {
    minHeight = Math.min(minHeight, getTilesetMinBottomHeight(rootTile.children[i]))
  }

  return minHeight
}


// Attach tileset to earth's ground. (This is unnecessary for now)
export const clampTilesetToTerrain = async (terrainProvider: Cesium.CesiumTerrainProvider, tileset: Cesium.Cesium3DTileset) => {
  const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
  cartographic.height = 0
  await Cesium.sampleTerrainMostDetailed(terrainProvider, [cartographic])
  const minHeight = getTilesetMinBottomHeight(tileset.root)
  return moveTilesetVertically(tileset, cartographic.height - minHeight)
}


// Convert three.js based position to cesium based matrix.
export const threePositionToCesiumMatrix4 = (threePosition: Vector3, centerCart3: Cesium.Cartesian3) => {
  const centerCart3Matrix4 = Cesium.Transforms.eastNorthUpToFixedFrame(centerCart3)
  const threePositionCart3 = new Cesium.Cartesian3(threePosition.x, -threePosition.z, threePosition.y)
  const threePositionMatrix4 = Cesium.Matrix4.fromTranslation(threePositionCart3)
  const cesiumMatrix4 = Cesium.Matrix4.multiply(centerCart3Matrix4, threePositionMatrix4, new Cesium.Matrix4())
  return cesiumMatrix4
}


// Convert cesium based matrix to three.js based position.
export const cesiumMatrix4ToThreePosition = (cesiumMatrix4: Cesium.Matrix4, centerCart3: Cesium.Cartesian3) => {
  const centerCart3Matrix4 = Cesium.Transforms.eastNorthUpToFixedFrame(centerCart3)
  const threePositionMatrix4 = Cesium.Matrix4.multiply(Cesium.Matrix4.inverse(centerCart3Matrix4, new Cesium.Matrix4()), cesiumMatrix4, new Cesium.Matrix4())
  const threePositionCart3 = Cesium.Matrix4.getTranslation(threePositionMatrix4, new Cesium.Cartesian3())
  const threePosition = new Vector3(threePositionCart3.x, threePositionCart3.z, -threePositionCart3.y)
  return threePosition
}
