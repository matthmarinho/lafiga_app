import React from 'react'
import Aberama from './../../_assets/img/aberama.png'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material';

const DivCustom = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 90,
    verticalAlign: 'middle',
    textAlign: 'center',
}));

const ImgCustom = styled('img')(({ theme }) => ({
}));

const NotFound = () => {
    return (
        <DivCustom id="wrapper">
            <ImgCustom src={Aberama} />
            <Typography variant="h4" component="div">This page could not be found</Typography>
        </DivCustom >
    )
}

export default NotFound