import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

type ChartUIProps = {
   data: any;
};

function getFormattedToday() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return today.toLocaleDateString('es-ES', options);
}


export default function ChartUI({ data }: ChartUIProps) {

   if (!data || !data.hourly) {
      return <p>No hay datos disponibles.</p>;
   }

   const arrLabels = data.hourly.time;
   const arrValues1 = data.hourly.temperature_2m;
   const arrValues2 = data.hourly.apparent_temperature;

   const today = new Date();
   const yyyy = today.getFullYear();
   const mm = String(today.getMonth() + 1).padStart(2, '0');
   const dd = String(today.getDate()).padStart(2, '0');
   const todayStr = `${yyyy}-${mm}-${dd}`;

   // Filtrar los datos solo para hoy
   const filteredLabels: string[] = [];
   const filteredTemp1: number[] = [];
   const filteredTemp2: number[] = [];

   for (let i = 0; i < arrLabels.length; i++) {
   if (arrLabels[i].startsWith(todayStr)) {
      filteredLabels.push(arrLabels[i].split('T')[1]); // solo la hora para el eje x
      filteredTemp1.push(arrValues1[i]);
      filteredTemp2.push(arrValues2[i]);
   }
   }


   return (
      <>
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
            Condiciones térmicas del día de hoy ({getFormattedToday()})
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: filteredTemp1, label: 'Temperatura (2m)'},
               { data: filteredTemp2, label: 'Temperatura aparente'},
            ]}
            xAxis={[{ 
               scaleType: 'point', 
               data: filteredLabels,
            }]}
            sx={{
               // Estilos para las líneas de los ejes y ticks
               '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                  stroke: '#ffffff !important',
               },
               
               // Estilos para los labels de los ejes (valores)
               '& .MuiChartsAxis-tickLabel': {
                  fill: '#ffffff !important',
               },

               '& .MuiChartsLegend-root': {
                  color: '#ffffff !important',
               },
               '& .MuiChartsLegend-label': {
                  color: '#ffffff !important',
               },
            }}
         />
      </>
   );
}

