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
         <Card sx={{borderRadius:2, boxShadow: 1, padding: 1}}>
             <CardContent sx={{ height: '100%' }}>
                <Box 
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    pb={2} // padding bottom
                >
                    <Typography component="div">
                        {props.icon}
                    </Typography>

                    <Typography variant="h5" component="div">
                        {props.description}
                    </Typography>
                </Box>

                
                <Typography variant="body2" component="p" color="text.secondary">
                    {props.title}
                </Typography>
             </CardContent>
         </Card>
     )
 }