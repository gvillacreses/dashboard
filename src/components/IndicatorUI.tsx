import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IndicatorUIProps {
title?: string;
description?: string;
icon?: React.ReactNode; 
}

export default function IndicatorUI(props: IndicatorUIProps) {
    return (
        <Card sx={{borderRadius:2, boxShadow: 1, padding: 1, backgroundColor: '#303030'}}>
            <CardContent sx={{ height: '100%' }}>
            <Box 
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                pb={2} // padding bottom
                sx={{ color: 'white' }} // aplica color blanco a todos los hijos    
            >
                <Typography component="div">
                    {props.icon}
                </Typography>

                <Typography variant="h5" component="div" color="white" >
                    {props.description}
                </Typography>
            </Box>

            
            <Typography variant="body2" component="p" color="white">
                {props.title}
            </Typography>
            </CardContent>
        </Card>
    )
}