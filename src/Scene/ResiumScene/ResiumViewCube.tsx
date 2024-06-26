/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as Cesium from 'cesium'
import {useEffect, useRef} from 'react'
import {useZustand} from '../../store/useZustand'
import {SCENE_MODE} from '../../utils/constants'
import './ResiumViewCube.css'


export const ResiumViewCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null)
  const {resiumViewer, tileset, setIsResiumCameraBeingUsed} = useZustand()

  const flyResiumCameraToEntity = (heading = 0, pitch = 0) => {
    if (!resiumViewer || !tileset) {
      return
    }
    const range = tileset.boundingSphere.radius * 2
    setIsResiumCameraBeingUsed(true)

    switch (SCENE_MODE) {
      case Cesium.SceneMode.SCENE3D:
        resiumViewer.flyTo(tileset, {
          offset: new Cesium.HeadingPitchRange(heading, pitch, range),
          maximumHeight: 0,
        }).then(() => {
          setIsResiumCameraBeingUsed(false)
        })
        break
      case Cesium.SceneMode.COLUMBUS_VIEW:
        resiumViewer.zoomTo(tileset, {heading, pitch, range}).then(() => {
          setIsResiumCameraBeingUsed(false)
        })
        break
      default:
        setIsResiumCameraBeingUsed(false)
        break
    }
  }

  useEffect(() => {
    resiumViewer?.scene.postRender.addEventListener(() => {
      if (cubeRef.current) {
        const camera = resiumViewer.scene.camera
        cubeRef.current.style.transform = `rotateX(${camera.pitch}rad) rotateY(${camera.heading}rad)`
      }
    })
  }, [resiumViewer])

  return (
    <div id='wrapper'>
      <div
        ref={cubeRef}
        id='cube'
      >
        {/* Sides */}
        <>
          <div
            id='side_t'
            className='side'
          >
            <div onClick={() => flyResiumCameraToEntity(0, -Math.PI / 2)}>T</div>
          </div>
          <div
            id='side_w'
            className='side'
          >
            <div onClick={() => flyResiumCameraToEntity(Math.PI / 2, -Math.PI * 0.05)}>W</div>
          </div>
          <div
            id='side_s'
            className='side'
          >
            <div onClick={() => flyResiumCameraToEntity(0, -Math.PI * 0.05)}>S</div>
          </div>
          <div
            id='side_e'
            className='side'
          >
            <div onClick={() => flyResiumCameraToEntity(-Math.PI / 2, -Math.PI * 0.05)}>E</div>
          </div>
          <div
            id='side_n'
            className='side'
          >
            <div onClick={() => flyResiumCameraToEntity(Math.PI, -Math.PI * 0.05)}>N</div>
          </div>
          <div
            id='side_b'
            className='side'
          />
        </>
        {/* Edges */}
        <>
          <div
            id='edge_tw'
            className='edge'
            onClick={() => flyResiumCameraToEntity(Math.PI / 2, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_ts'
            className='edge'
            onClick={() => flyResiumCameraToEntity(0, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_te'
            className='edge'
            onClick={() => flyResiumCameraToEntity(-Math.PI / 2, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_tn'
            className='edge'
            onClick={() => flyResiumCameraToEntity(Math.PI, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_ws'
            className='edge'
            onClick={() => flyResiumCameraToEntity(Math.PI / 4, -Math.PI * 0.05)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_se'
            className='edge'
            onClick={() => flyResiumCameraToEntity(-Math.PI / 4, -Math.PI * 0.05)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_en'
            className='edge'
            onClick={() => flyResiumCameraToEntity(-3 * Math.PI / 4, -Math.PI * 0.05)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_nw'
            className='edge'
            onClick={() => flyResiumCameraToEntity(3 * Math.PI / 4, -Math.PI * 0.05)}
          >
            <div/>
            <div/>
          </div>
        </>
        {/* Vertices */}
        <>
          <div
            id='vertex_tws'
            className='vertex'
            onClick={() => flyResiumCameraToEntity(Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_tse'
            className='vertex'
            onClick={() => flyResiumCameraToEntity(-Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_ten'
            className='vertex'
            onClick={() => flyResiumCameraToEntity(-3 * Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_tnw'
            className='vertex'
            onClick={() => flyResiumCameraToEntity(3 * Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
        </>
      </div>
    </div >
  )
}
