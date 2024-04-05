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
        <div id="side_t">Top</div>
        <div id="side_w">West</div>
        <div id="side_s">South</div>
        <div id="side_e">East</div>
        <div id="side_n">North</div>
        <div id="side_b">Bottom</div>
      </div>
    </div>
  )
}
