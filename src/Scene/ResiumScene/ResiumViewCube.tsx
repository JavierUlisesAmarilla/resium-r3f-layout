/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {HeadingPitchRange} from 'cesium'
import {useEffect, useRef} from 'react'
import {useZustand} from '../../store/useZustand'
import './ResiumViewCube.css'


export const ResiumViewCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null)
  const {resiumViewer, tileset} = useZustand()

  const flyResiumCameraTo = (heading = 0, pitch = 0) => {
    if (!resiumViewer || !tileset) {
      return
    }

    const range = tileset.boundingSphere.radius * 2
    resiumViewer.flyTo(tileset, {offset: new HeadingPitchRange(heading, pitch, range)})
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
            <div onClick={() => flyResiumCameraTo(0, -Math.PI / 2)}>T</div>
          </div>
          <div
            id='side_w'
            className='side'
          >
            <div onClick={() => flyResiumCameraTo(Math.PI / 2)}>W</div>
          </div>
          <div
            id='side_s'
            className='side'
          >
            <div onClick={() => flyResiumCameraTo()}>S</div>
          </div>
          <div
            id='side_e'
            className='side'
          >
            <div onClick={() => flyResiumCameraTo(-Math.PI / 2)}>E</div>
          </div>
          <div
            id='side_n'
            className='side'
          >
            <div onClick={() => flyResiumCameraTo(Math.PI)}>N</div>
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
            onClick={() => flyResiumCameraTo(Math.PI / 2, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_ts'
            className='edge'
            onClick={() => flyResiumCameraTo(0, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_te'
            className='edge'
            onClick={() => flyResiumCameraTo(-Math.PI / 2, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_tn'
            className='edge'
            onClick={() => flyResiumCameraTo(Math.PI, -Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_ws'
            className='edge'
            onClick={() => flyResiumCameraTo(Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_se'
            className='edge'
            onClick={() => flyResiumCameraTo(-Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_en'
            className='edge'
            onClick={() => flyResiumCameraTo(-3 * Math.PI / 4)}
          >
            <div/>
            <div/>
          </div>
          <div
            id='edge_nw'
            className='edge'
            onClick={() => flyResiumCameraTo(3 * Math.PI / 4)}
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
            onClick={() => flyResiumCameraTo(Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_tse'
            className='vertex'
            onClick={() => flyResiumCameraTo(-Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_ten'
            className='vertex'
            onClick={() => flyResiumCameraTo(-3 * Math.PI / 4, -Math.PI / 4)}
          >
            <div/>
            <div/>
            <div/>
          </div>
          <div
            id='vertex_tnw'
            className='vertex'
            onClick={() => flyResiumCameraTo(3 * Math.PI / 4, -Math.PI / 4)}
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
