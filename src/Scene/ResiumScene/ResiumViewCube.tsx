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
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: Top')
            }}
            >
              T
            </div>
          </div>
          <div
            id='side_w'
            className='side'
          >
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: West')
            }}
            >
              W
            </div>
          </div>
          <div
            id='side_s'
            className='side'
          >
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: South')
            }}
            >
              S
            </div>
          </div>
          <div
            id='side_e'
            className='side'
          >
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: East')
            }}
            >
              E
            </div>
          </div>
          <div
            id='side_n'
            className='side'
          >
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: North')
            }}
            >
              N
            </div>
          </div>
          <div
            id='side_b'
            className='side'
          >
            <div onClick={() => {
              console.log('ResiumViewCube#onClick: Bottom')
            }}
            >
              B
            </div>
          </div>
        </>
        {/* Edges */}
        <>
          <div
            id='edge_ts'
            className='edge'
            onClick={() => {
              console.log('ResiumViewCube#onClick: TopSouth')
            }}
          >
            <div/>
            <div/>
          </div>
        </>
      </div>
    </div>
  )
}
