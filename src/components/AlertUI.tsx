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

  let alertMessages: string[] = [];
  let backgroundColor = '#9ccc65'; // verde por defecto (sin alertas)

  if (temperature >= 30) {
    alertMessages.push(`🌡️ Temperatura superior a los 30°C`);
    backgroundColor = '#ff9800';
  }

  if (temperature <= 10) {
    alertMessages.push(`❄️ Temperatura inferior a los 10°C`);
    if (backgroundColor === '#9ccc65') backgroundColor = '#2196f3';
  }

  if (precipitation > 70) {
    alertMessages.push(`🌧️ ${precipitation}% de probabilidad de lluvia`);
    if (backgroundColor === '#9ccc65') backgroundColor = '#cfd8dc';
  }

  const alertMessage = alertMessages.length > 0
    ? alertMessages.join(' con ')
    : 'No hay alertas en este momento.';

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
          color: '#ffffff',
          marginBottom: 1
        }}
      >
        ⚠️ Alertas Climáticas
      </Typography>

      <Alert
        variant="filled"
        severity={alertMessages.length > 0 ? 'info' : 'success'}
        sx={{
          backgroundColor,
          color: '#000000',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontSize: '1rem',
          padding: 1,
          borderRadius: 2
        }}
      >
        {alertMessage}
      </Alert>
    </Box>
  );
}


