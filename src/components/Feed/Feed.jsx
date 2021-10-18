import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { List, ListItem, ListItemText, Paper, Stack } from '@mui/material'
import { styled } from '@mui/system'
import MarkerService from '../../services/marker'
import { isBrowser } from 'react-device-detect'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CustomStack = styled(Stack)(({ theme }) => ({
    paddingRight: isBrowser ? 1 : 0,
    overflow: 'auto',
    height: isBrowser ? '70vh' : '60vh',
}));

export default function Feed() {
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(false)

    const getFeed = async () => {
        setLoading(true)
        MarkerService.getFeed()
            .then(response => {
                if (response.data.length > 0) {
                    setFeed(response.data)
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
                setLoading(false)
            });
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Feed
            </Typography>
            <CustomStack spacing={2}>
                {feed.map((item, index) => (
                    <Item key={index} elevation={1}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <>
                                            <Typography variant="h6">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {item.category.name}
                                            </Typography>
                                        </>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-line' }}>
                                            {item.description}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Item>
                ))}
            </CustomStack>
        </React.Fragment>
    )
}