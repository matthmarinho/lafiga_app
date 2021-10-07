import React, { useEffect, useState } from 'react'
import { Stage, Layer, Star, Text, Image } from 'react-konva'
import useImage from 'use-image'
import mundi from '../../_assets/img/mundi.jpg'
import MarkerService from '../../services/marker'

function generateShapes() {
    return [...Array(10)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
        isDragging: false,
    }))
}

const INITIAL_STATE = generateShapes()

export default function Map() {
    const [stars, setStars] = useState(INITIAL_STATE)
    const [image] = useImage(mundi)
    const [imageX, setImageX] = useState(0)
    const [imageY, setImageY] = useState(0)
    const [stageScale, setStageScale] = useState(1)
    const [stageX, setStageX] = useState(0)
    const [stageY, setStageY] = useState(0)


    const handleDragStart = (e) => {
        const id = e.target.id()
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                }
            })
        )
    }
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                }
            })
        )
    }

    const getMarkers = async () => {
        MarkerService.getAll(3)
            .then(response => {
                if (response.data.length > 0) {
                    setStars(response.data)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleWheel = (e) => {
        e.evt.preventDefault()

        let scaleBy = 1.1
        let stage = e.target.getStage()
        let oldScale = stage.scaleX()
        let mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        }

        let newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy

        setStageScale(newScale)
        setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale)
        setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale)
    }

    const clickHandler = (e) => {
        const stage = e.target.getStage()
        const pointerPosition = stage.getPointerPosition()
        console.log(e.target)
        const offset = { x: e.target.attrs.x, y: e.target.attrs.y }

        console.log(pointerPosition)

        setImageX(pointerPosition.x)
        setImageY(pointerPosition.y)

        const imageClickX = pointerPosition.x - offset.x
        const imageClickY = pointerPosition.y - offset.y
    }

    const handleImageDragStart = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'grabbing'

        // let x = stage.width() / 2
        // let y = stage.height() / 2
        // let radius = 100
        // const pos = e.absolutePosition()
        // let scale =
        //     radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2))

        // if (scale < 1) {
        //     e.x(Math.round((pos.x - x) * scale + x))
        //     e.y(Math.round((pos.y - y) * scale + y))
        // }
    }

    const limitDrag = (pos) => {
        let newY = pos.y
        let newX = pos.x

        let a = {x:pos.x - window.innerHeight, y: pos.y - window.innerHeight}
        let b = {x:pos.x - window.innerHeight, y: pos.y + window.innerHeight}
        let c = {x:pos.x + window.innerHeight, y: pos.y + window.innerHeight}
        let d = {x:pos.x + window.innerHeight, y: pos.y - window.innerHeight}

        console.log(a, b)
        console.log(pos)
        console.log(d, c)
        console.log('---------------')
        // console.log(stageScale)
        // console.log(pos.y)
        // console.log((image.height) * stageScale)
        // console.log(window.innerHeight > image.height && window.innerWidth > image.width)
        // console.log('---------------')
        if (stageScale < 1) {
            if (pos.y > window.innerHeight - (image.height * stageScale )) {
                newY = window.innerHeight - (image.height * stageScale )
            }
            if (pos.y < 0) {
                newY = 0
            }
            if (pos.x > window.innerWidth - (image.width * stageScale)) {
                newX = window.innerWidth - (image.width * stageScale)
            }
            if (pos.x < 0) {
                newX = 0
            }
            return {
                x: newX,
                y: newY
            }
        } else {
            if (pos.y < window.innerHeight - (image.height * stageScale )) {
                newY = window.innerHeight - (image.height * stageScale )
            }
            if (pos.y > 0) {
                newY = 0
            }
            if (pos.x < window.innerWidth - (image.width * stageScale)) {
                newX = window.innerWidth - (image.width * stageScale)
            }
            if (pos.x > 0) {
                newX = 0
            }
            return {
                x: newX,
                y: newY
            }
        }
    }

    const handleImageDragEnd = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'grab'
        setImageX(e.target.x(), e.target.y())
        setImageY(e.target.x(), e.target.y())
    }

    const componentToHex = (c) => {
        let hex = c.toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }

    const handleMapOut = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'default'
    }

    const handleMapIn = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'grab'
    }

    const rgbToHex = ({ r, g, b }) => {
        if (r && g && b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
        } else {
            return 'white'
        }
    }

    const handleMarkerIn = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'pointer'
    }

    const handleMarkerOut = (e) => {
        let stage = e.target.getStage()
        stage.container().style.cursor = 'grab'
    }

    useEffect(() => {
        getMarkers()
    }, [])

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onWheel={handleWheel}
            scaleX={stageScale}
            scaleY={stageScale}
            x={stageX}
            y={stageY}
            style={{ backgroundColor: 'black' }}
        >
            {image &&
                <>
                    <Layer
                        x={(window.innerWidth - image.width) / 2}
                        y={(window.innerHeight - image.height) / 2}
                        draggable
                        onDragStart={handleImageDragStart}
                        onDragEnd={handleImageDragEnd}
                        onMouseLeave={handleMapOut}
                        onMouseEnter={handleMapIn}
                        dragBoundFunc={limitDrag}
                    >
                        <Image
                            image={image}
                            onClick={clickHandler}
                        />
                        <Star
                            key={1}
                            id={1}
                            x={0}
                            y={0}
                            numPoints={5}
                            innerRadius={10}
                            outerRadius={10}
                            fill="yellow"
                        />
                        {stars && stars.map((star, index) =>
                            <Star
                                key={index}
                                id={index}
                                x={star.longitude}
                                y={-star.latitude + image.height}
                                onMouseEnter={handleMarkerIn}
                                onMouseLeave={handleMarkerOut}
                                draggable
                                numPoints={5}
                                innerRadius={7 / stageScale}
                                outerRadius={7 / stageScale}
                                fill={rgbToHex(star.color ? star.color : 'white')}
                            // onClick={handleMarkerClick}
                            />
                        )}
                    </Layer>
                </>
            }
        </Stage>
    )
}

