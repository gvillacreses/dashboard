// import Alert from '@mui/material/Alert';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// interface AlertConfig {
//     description: string;
// }

// export default function AlertUI( config:AlertConfig ) {
//     return (
//         <Box 
//             sx={{ 
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 padding: 2,
//                 backgroundColor: '#5c5c5c',
//                 borderRadius: 2,
//                 boxShadow: 1,
//             }}>
//             <Typography 
//                 variant="h6"
//                 component="h2"
//                 sx={{
//                     fontWeight: 'bold',
//                     fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
//                     color: '#bf6210ff',
//                     marginBottom: 1 
//                 }}>
//                 ⚠️ Alertas del Sistema
//             </Typography>

//             <Alert 
//                 variant="filled" 
//                 severity="info" 
//                 sx={{
//                     backgroundColor: '#18659cff',
//                     // backgroundColor: '#1565c0',
//                     color: '#000000',
//                     fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
//                     fontSize: '1rem',
//                     padding: 1,
//                     borderRadius: 2
//                 }}>
//                 {config.description}
//             </Alert>
//         </Box>
//     )
// }


import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AlertUIProps {
  data: any;
}

export default function AlertUI({ data }: AlertUIProps) {
  if (!data || !data.hourly || !data.hourly.time) return null;

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const nowIsoHour = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:00`;

  const index = data.hourly.time.findIndex((t: string) => t === nowIsoHour);
  if (index === -1) return null;

  const temperature = data.hourly.temperature_2m?.[index];
  const precipitation = data.hourly.precipitation_probability?.[index] ?? 0;

  let alertMessage = '';
  let backgroundColor = '';

  if (temperature >= 30) {
    alertMessage = `⚠️ Alerta de calor extremo: ${temperature} °C`;
    backgroundColor = '#ff9800';
  } else if (temperature <= 18) {
    alertMessage = `❄️ Alerta de frío extremo: ${temperature} °C`;
    backgroundColor = '#2196f3';
  } else if (precipitation > 70) {
    alertMessage = `🌧️ Alta probabilidad de lluvia: ${precipitation}%`;
    backgroundColor = '#4caf50';
  }

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#5c5c5c',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography 
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          color: '#bf6210ff',
          marginBottom: 1 
        }}
      >
        ⚠️ Alertas del Sistema
      </Typography>

      <Alert 
        variant="filled" 
        severity={alertMessage ? 'info' : 'success'} 
        sx={{
          backgroundColor: alertMessage ? backgroundColor : '#9ccc65',
          color: '#000000',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontSize: '1rem',
          padding: 1,
          borderRadius: 2
        }}
      >
        {alertMessage || 'No hay alertas en este momento.'}
      </Alert>
    </Box>
  );
}



