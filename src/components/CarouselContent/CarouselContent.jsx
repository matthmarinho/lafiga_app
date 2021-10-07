import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {
    Paper,
    Button,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { isBrowser } from 'react-device-detect'

const PaperCustom = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
}));

const Project = (props) => {
    return (
        <PaperCustom
            className="Project"
            sx={{
                backgroundColor: props.item.color,
                height: isBrowser ? '60vh' : '50hv',
            }}
            elevation={10}
        >
            <Typography variant="h4">
                {props.item.name}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                {props.item.description}
            </Typography>

            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
        </PaperCustom>
    )
}

const items = [
    {
        name: "Lore",
        description: "Coming soon!",
        color: "#64ACC8"
    },
    {
        name: "Rules",
        description: "Coming soon!",
        color: "#7D85B1"
    },
    {
        name: "Backgrounds",
        description: "Coming soon!",
        color: "#CE7E78"
    },
]

export default function CarouselContent() {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                News
            </Typography>
            <Carousel
                className="SecondExample"
                autoPlay={true}
                indicators={true}
                timeout={500}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={false}
            >
                {items.map((item, index) => (
                    <Project item={item} key={index} />
                ))}
            </Carousel>
        </React.Fragment >
    )
}