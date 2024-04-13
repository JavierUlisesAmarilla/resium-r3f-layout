/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Cesium from 'cesium'
import {useEffect, useState} from 'react'
import * as Resium from 'resium'


export const ResiumBillboard = ({
  position,
  text = '',
  fontSize = 24,
  paddingX = 8,
  paddingY = 4,
}: {
  position: Cesium.Cartesian3
  text?: string
  fontSize?: number
  paddingX?: number,
  paddingY?: number,
}) => {
  const [billboardCanvas, setBillboardCanvas] = useState<any>()

  useEffect(() => {
    // Create div to get height and width then remove it
    const font = `bold ${fontSize}px Helvetica`
    const canvas = document.createElement('canvas')
    const textDiv = document.createElement('div')
    textDiv.style.position = 'absolute'
    textDiv.style.font = font
    textDiv.innerHTML = text
    document.body.appendChild(textDiv)
    const {height, width} = textDiv.getBoundingClientRect()
    canvas.width = width + (paddingX * 2)
    canvas.height = height + (paddingY * 2)
    document.body.removeChild(textDiv)

    // Create font in canvas element
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.font = font
      ctx.fillStyle = 'yellow'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'blue'
      ctx.lineWidth = 2
      ctx.strokeText(text, paddingX, height)
      ctx.fillText(text, paddingX, height)
    }

    setBillboardCanvas(canvas)
  }, [fontSize, paddingX, paddingY, text])

  return billboardCanvas && (
    <Resium.BillboardCollection modelMatrix={Cesium.Transforms.eastNorthUpToFixedFrame(position)}>
      <Resium.Billboard
        position={Cesium.Cartesian3.ZERO}
        image={billboardCanvas}
        disableDepthTestDistance={Number.POSITIVE_INFINITY}
      />
    </Resium.BillboardCollection>
  )
}
