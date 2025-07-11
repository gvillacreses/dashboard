import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

type ChartUIProps = {
   loading: boolean;
   error: string | null;
   data: any;
};

export default function ChartUI({ loading, error, data }: ChartUIProps) {
   if (loading) {
      return <p>Cargando datos...</p>;
   }
   if (error) {
      return <p>Error: {error}</p>;
   }
   if (!data || !data.hourly) {
      return <p>No hay datos disponibles.</p>;
   }

   const arrLabels = data.hourly.time;
   const arrValues1 = data.hourly.temperature_2m;
   const arrValues2 = data.hourly.apparent_temperature;

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Temperatura aparente
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temperatura (2m)'},
               { data: arrValues2, label: 'Temperatura aparente'},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}