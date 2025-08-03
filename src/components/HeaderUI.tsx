import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Cloud } from 'lucide-react';

export default function HeaderUI() {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#22bae8',
        borderRadius: 2,
        boxShadow: 1,
        padding: 5,
      }}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2, //Espacio entre icono y texto 
        }}>

        <Cloud size={48} color="#ffffffff"/>
        
        <Typography
          variant="h4"
          component="h1"
          sx={{
              fontWeight: 'bold',
              fontFamily: 'cursive, system-ui, Avenir, Helvetica, Arial, sans-serif',
              color: '#ffffff',
          }}
        >
          Dashboard Meteorológico
        </Typography>
      </Box>
    
      <Box sx={{ marginTop: 1 }}>
        <Typography
          variant="body1"
          component="p"
          sx={{
              fontWeight: 'bold',
              fontFamily: 'cursive, system-ui, Avenir, Helvetica, Arial, sans-serif',
              color: '#ffffff',
          }}
        >
          Monitoreo en tiempo real de condiciones climáticas
        </Typography>
      </Box>  
      
    </Box>
  );
}
