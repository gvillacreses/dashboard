import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function HeaderUI() {
  return (
    <>
        <img src="/dashboard/logo.png" style={{ width: 48, height: 48 }} />
        
        <Grid container direction={'column'} spacing={1} alignContent={'center'}> 
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Poppins, Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif',
              color: '#ffffff',
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            }}

          >
            Thermora
          </Typography>
          
          <Typography
            variant="body1"
            component="p"
            sx={{
                fontWeight: 'bold',
                fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                color: '#ffffff',
            }}
          >
            Dashboard Meteorológico
          </Typography>
        </Grid>
      
    </>
  );
}
