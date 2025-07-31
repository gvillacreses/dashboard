import Typography from '@mui/material/Typography';

export default function HeaderUI() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{
            fontWeight: 'bold',
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        }}
      >
        Dashboard Meteorológico
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{
            fontWeight: 'bold',
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
            mt: 1, // margin top
        }}
      >
        Monitoreo en tiempo real de condiciones climáticas
      </Typography>
    </>
  );
}
