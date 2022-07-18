import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Service from '../../services/upload'
import { capitalize } from '@mui/material';

export default function Files() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const getAll = () => {
    setLoading(true)
    Service.getAll()
        .then(response => {
            setFiles(response.data)
            setLoading(false)
        })
        .catch(e => {
            console.log(e)
        })
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <React.Fragment >
    <Grid
      sx={{ marginTop: 10, 
            marginLeft: 40, 
            width: '75%' }}
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {files.map((file) => (
        <Card sx={{ maxWidth: 250, 
                    minWidth: 250, 
                    maxHeight: 300,
                    minHeight: 300,
                    marginRight: 2, 
                    marginBottom: 2, 
                    boxSizing: 'border-box' }}>
          <CardContent sx={{ paddingBottom: '70%' }}>
            <Typography gutterBottom variant="h5" component="div">
              { capitalize(file.title) }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { file.description }
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => window.open(file.link)} size="small">Download</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
    </React.Fragment >
  )
}