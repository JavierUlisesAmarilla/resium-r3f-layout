import * as Cesium from 'cesium'
import gsap from 'gsap'
import {useCallback, useEffect} from 'react'
import {Box3, MathUtils, Mesh, OrthographicCamera, PerspectiveCamera, Vector3} from 'three'
import {useZustand} from '../store/useZustand'
import {cesiumMatrix4ToThreePosition, getAngle, normalizeAngle, threePositionToCesiumMatrix4} from '../utils/common'
import {ANGLE_TOLERANCE_FACTOR, ANIM_DURATION, AXES_LENGTH, CAMERA_DISTANCE, CAMERA_NEAR, ROT_ANIM_FACTOR, SHOW_AXES_HELPER, USE_R3F_CAMERA} from '../utils/constants'


let resiumAxesHelpers: {[key: string]: Cesium.DebugModelMatrixPrimitive} = {}
const box3 = new Box3()
const vector3 = new Vector3()


export const useCameraUtils = () => {
  const {resiumViewer, r3fControlsRef, r3fCamera, centerCart3, areAllEventsOnLockDown, setAreAllEventsOnLockDown} = useZustand()
  const resiumScene = resiumViewer?.scene
  const resiumCamera = resiumViewer?.camera
  const r3fControls = r3fControlsRef?.current

  // Synchronize field of view of r3f camera to cesium camera.
  const syncFieldOfView = useCallback(() => {
    if (r3fCamera && resiumCamera) {
      if (r3fCamera instanceof PerspectiveCamera) {
        if (!(resiumCamera.frustum instanceof Cesium.PerspectiveFrustum)) {
          resiumCamera.switchToPerspectiveFrustum()
        }

        const r3fCameraAspect = r3fCamera.aspect
        const r3fCameraFov = r3fCamera.fov
        const resiumCameraFrustum = resiumCamera.frustum as Cesium.PerspectiveFrustum

        // R3f camera's field of view is actual angle, not radians. So need to convert it to radians to synchronize with Resium camera.
        if (r3fCameraAspect < 1) { // When portrait mode
          resiumCameraFrustum.fov = Math.PI * (r3fCameraFov / 180)
        } else { // When landscape mode
          const resiumFovY = Math.PI * (r3fCameraFov / 180)
          const resiumFovX = Math.atan(Math.tan(0.5 * resiumFovY) * r3fCameraAspect) * 2
          resiumCameraFrustum.fov = resiumFovX
        }
      } else if (r3fCamera instanceof OrthographicCamera) {
        if (!(resiumCamera.frustum instanceof Cesium.OrthographicFrustum)) {
          resiumCamera.switchToOrthographicFrustum()
        }

        // This is experimental yet.
        const resiumOrhtoFrustum = resiumCamera.frustum as Cesium.OrthographicFrustum
        resiumOrhtoFrustum.aspectRatio = r3fCamera.right / r3fCamera.top
        resiumOrhtoFrustum.width = (-r3fCamera.left + r3fCamera.right) / r3fCamera.zoom
      }
    }
  }, [r3fCamera, resiumCamera])

  // Show axes helper for convenient development. (optional)
  const devUpdateResiumAxesHelper = useCallback((key: string, modelMatrix: Cesium.Matrix4) => {
    if (resiumScene) {
      if (SHOW_AXES_HELPER) {
        if (resiumAxesHelpers[key]) {
          resiumAxesHelpers[key].modelMatrix = modelMatrix
        } else {
          resiumAxesHelpers[key] = new Cesium.DebugModelMatrixPrimitive({modelMatrix, length: AXES_LENGTH})
          resiumScene.primitives.add(resiumAxesHelpers[key])
        }
      } else if (resiumAxesHelpers) {
        Object.values(resiumAxesHelpers).forEach((resiumAxesHelper) => {
          resiumScene.primitives.remove(resiumAxesHelper)
        })
        resiumAxesHelpers = {}
      }
    }
  }, [resiumScene])

  // Synchronize r3f camera to cesium camera.
  const syncR3fToCesium = useCallback(() => {
    if (resiumCamera && r3fControls && centerCart3) {
      syncFieldOfView()
      const resiumCameraTargetMatrix4 = threePositionToCesiumMatrix4(r3fControls.target, centerCart3)
      const heading = normalizeAngle(-1 * r3fControls.getAzimuthalAngle())
      const pitch = r3fControls.getPolarAngle() - MathUtils.degToRad(90)
      const range = r3fControls.getDistance()
      resiumCamera.lookAtTransform(resiumCameraTargetMatrix4, new Cesium.HeadingPitchRange(heading, pitch, range))
      devUpdateResiumAxesHelper('centerCart3', Cesium.Transforms.eastNorthUpToFixedFrame(centerCart3))
    }
  }, [centerCart3, r3fControls, resiumCamera, syncFieldOfView, devUpdateResiumAxesHelper])

  // Synchronize cesium camera to r3f camera.
  const syncCesiumToR3f = (targetCart3: Cesium.Cartesian3) => {
    if (resiumCamera && centerCart3 && r3fControls && r3fCamera) {
      syncFieldOfView()
      const resiumCameraPosition = cesiumMatrix4ToThreePosition(Cesium.Transforms.eastNorthUpToFixedFrame(resiumCamera.positionWC), centerCart3)
      r3fCamera.position.copy(resiumCameraPosition)
      const targetPosition = cesiumMatrix4ToThreePosition(Cesium.Transforms.eastNorthUpToFixedFrame(targetCart3), centerCart3)
      r3fControls.target.copy(targetPosition)
    }
  }

  // Make r3f camera look at the given target smoothly with animation.
  const animateR3fLookAt = async (target: Vector3) => {
    if (r3fControls && !areAllEventsOnLockDown && r3fCamera) {
      setAreAllEventsOnLockDown(true)
      const angleTo = getAngle(r3fControls.target, r3fCamera.position, target)
      await gsap.timeline().to(r3fControls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: angleTo > Math.PI * ANGLE_TOLERANCE_FACTOR ? ANIM_DURATION * ROT_ANIM_FACTOR : 0,
      })
      setAreAllEventsOnLockDown(false)
    }
  }

  // Move and rotate r3f camera to zoom the given object max smoothly with animation.
  const animateR3fZoomInOn = async (obj: Mesh) => {
    box3.setFromObject(obj)
    const maxSize = (box3.max.x - box3.min.x + box3.max.y - box3.min.y + box3.max.z - box3.min.z) / 2
    obj.getWorldPosition(vector3)
    await animateR3fZoomToTarget(vector3, maxSize)
  }

  // Move r3f camera to the given position smoothly with animation.
  const animateR3fZoomToTarget = async (target: Vector3, zoomDistance = 0) => {
    await animateR3fLookAt(target)

    if (!areAllEventsOnLockDown && r3fCamera) {
      setAreAllEventsOnLockDown(true)
      const direction = target.sub(r3fCamera.position)
      const directionLength = direction.length()
      const scale = (directionLength - zoomDistance) / directionLength
      direction.multiplyScalar(scale)
      const moveTarget = r3fCamera.position.clone().add(direction)
      await gsap.timeline().to(r3fCamera.position, {
        x: moveTarget.x,
        y: moveTarget.y,
        z: moveTarget.z,
        duration: ANIM_DURATION,
      })
      setAreAllEventsOnLockDown(false)
    }
  }

  // Move r3f camera to the initial position smoothly with animation.
  const animateR3fMoveToDefaultPosition = async () => {
    await animateR3fLookAt(new Vector3(0, 0, 0))

    if (!areAllEventsOnLockDown && r3fCamera) {
      setAreAllEventsOnLockDown(true)
      await gsap.timeline().to(r3fCamera.position, {
        x: CAMERA_DISTANCE,
        y: CAMERA_DISTANCE,
        z: CAMERA_DISTANCE,
        duration: ANIM_DURATION,
      })
      setAreAllEventsOnLockDown(false)
    }
  }

  // Make cesium camera fly to the given entity and synchronize to r3f camera.
  const flyResiumCameraTo = async (entityId: string) => {
    if (!resiumViewer) {
      return
    }

    const entity = resiumViewer.entities.getById(entityId)
    console.log('useCameraUtils#flyResiumCameraTo: entity:', entity)

    if (!entity) {
      return
    }

    /* Start to set target and HeadingPitchRange */
    let targetCart3 = new Cesium.Cartesian3()
    const headingPitchRange = new Cesium.HeadingPitchRange()

    if (entity.polyline) {
      const cart3Arr = entity.polyline.positions?.getValue(resiumViewer.clock.currentTime)
      // Target
      const cart3Sum = Cesium.Cartesian3.add(cart3Arr[0], cart3Arr[1], new Cesium.Cartesian3())
      Cesium.Cartesian3.divideByScalar(cart3Sum, 2, targetCart3)
    } else {
      const newTargetCart3 = entity.position?.getValue(resiumViewer.clock.currentTime)

      if (newTargetCart3) {
        targetCart3 = newTargetCart3
      }
    }
    /* End to set target and HeadingPitchRange */

    const flyToRes = await resiumViewer.flyTo(entity, {offset: headingPitchRange})

    if (flyToRes) {
      syncCesiumToR3f(targetCart3)
      resiumViewer.scene.screenSpaceCameraController.enableInputs = !USE_R3F_CAMERA
    }
  }

  // Zoom in or out r3f camera and synchronize to cesium camera.
  const zoomR3f = (factor: number) => {
    if (r3fControls && r3fCamera) {
      const direction = r3fControls.target.clone().sub(r3fCamera.position).multiplyScalar(factor)
      r3fCamera.position.add(direction)
      syncR3fToCesium()
    }
  }

  useEffect(() => {
    if (centerCart3) {
      if (resiumCamera?.frustum) {
        resiumCamera.frustum.near = CAMERA_NEAR
      }

      syncR3fToCesium()
    }
  }, [centerCart3, resiumCamera?.frustum, syncR3fToCesium])

  return {
    animateR3fLookAt,
    animateR3fZoomInOn,
    animateR3fZoomToTarget,
    animateR3fMoveToDefaultPosition,
    syncR3fToCesium,
    syncCesiumToR3f,
    flyResiumCameraTo,
    zoomR3f,
  }
}
