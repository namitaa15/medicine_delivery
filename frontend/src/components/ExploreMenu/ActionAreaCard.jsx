import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button, CardActions } from '@mui/material';


export default function ActionAreaCard({ image, title, onClick }) {
    return (
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100%"
                    image={image}
                    alt={`${title} image`}
                />
                <CardContent>
                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginY: '0px', paddingY: '0px' }} component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button sx={{ width: '100%' }} size="small" color="primary" variant='contained' onClick={onClick}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
