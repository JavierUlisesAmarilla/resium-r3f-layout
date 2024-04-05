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
          <div>
            Top
          </div>
        </div>
        <div id="side_w">
          <div>
            West
          </div>
        </div>
        <div id="side_s">
          <div>
            South
          </div>
        </div>
        <div id="side_e">
          <div>
            East
          </div>
        </div>
        <div id="side_n">
          <div>
            North
          </div>
        </div>
        <div id="side_b">
          <div>
            Bottom
          </div>
        </div>
      </div>
    </div>
  )
}
