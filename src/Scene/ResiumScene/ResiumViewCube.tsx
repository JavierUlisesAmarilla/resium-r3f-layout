/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useEffect, useRef} from 'react'
import {useZustand} from '../../store/useZustand'
import './ResiumViewCube.css'


export const ResiumViewCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null)
  const {resiumViewer} = useZustand()

  useEffect(() => {
    resiumViewer?.scene.postRender.addEventListener(() => {
      if (cubeRef.current) {
        const camera = resiumViewer.scene.camera
        cubeRef.current.style.transform = `rotateX(${camera.pitch}rad) rotateY(${camera.heading}rad)`
      }
    })
  }, [resiumViewer])

  return (
    <div id="wrapper">
      <div
        ref={cubeRef}
        id="cube"
      >
        <div id="side_t">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: Top')
          }}
          >
            Top
          </div>
        </div>
        <div id="side_w">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: West')
          }}
          >
            West
          </div>
        </div>
        <div id="side_s">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: South')
          }}
          >
            South
          </div>
        </div>
        <div id="side_e">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: East')
          }}
          >
            East
          </div>
        </div>
        <div id="side_n">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: North')
          }}
          >
            North
          </div>
        </div>
        <div id="side_b">
          <div onClick={() => {
            console.log('ResiumViewCube#onClick: Bottom')
          }}
          >
            Bottom
          </div>
        </div>
      </div>
    </div>
  )
}
