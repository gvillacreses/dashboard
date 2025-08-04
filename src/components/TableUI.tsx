import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

function aggregateByDay(
  labels: string[],
  values1: number[],
  values2: number[]
) {
  const dayMap: Record<string, { temps1: number[]; temps2: number[] }> = {};

  for (let i = 0; i < labels.length; i++) {
    const day = labels[i].split('T')[0];
    if (!dayMap[day]) {
      dayMap[day] = { temps1: [], temps2: [] };
    }
    dayMap[day].temps1.push(values1[i]);
    dayMap[day].temps2.push(values2[i]);
  }

  const rows = Object.entries(dayMap).map(([day, temps], index) => {
    const minTemp1 = Math.min(...temps.temps1);
    const maxTemp1 = Math.max(...temps.temps1);
    const avgTemp1 = temps.temps1.reduce((a, b) => a + b, 0) / temps.temps1.length;

    const minTemp2 = Math.min(...temps.temps2);
    const maxTemp2 = Math.max(...temps.temps2);
    const avgTemp2 = temps.temps2.reduce((a, b) => a + b, 0) / temps.temps2.length;

    return {
      id: index,  // el DataGrid necesita un id único
      label: day,
      minTemp1,
      maxTemp1,
      avgTemp1,
      minTemp2,
      maxTemp2,
      avgTemp2,
    };
  });

  return rows;
}



type TableUIProps = {
   loading: boolean;
   error: string | null;
   data: any;
};


const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Día',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (params) => {
      const [year, month, day] = (params as string).split('-').map(Number);
      const date = new Date(year, month - 1, day); // <- Esto crea fecha en hora local
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      function sameDate(d1: Date, d2: Date) {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
      }

      if (sameDate(date, today)) return 'Hoy';
      if (sameDate(date, tomorrow)) return 'Mañana';

      return date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
    }
  },
  { field: 'minTemp1', headerName: 'Temp Min', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'maxTemp1', headerName: 'Temp Max', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'avgTemp1', headerName: 'Temp Prom', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'minTemp2', headerName: 'Temp Apar Min', width: 140, align: 'center', headerAlign: 'center' },
  { field: 'maxTemp2', headerName: 'Temp Apar Max', width: 140, align: 'center', headerAlign: 'center' },
  { field: 'avgTemp2', headerName: 'Temp Apar Prom', width: 140, align: 'center', headerAlign: 'center' },
];


export default function TableUI({ loading, error, data }: TableUIProps) {
   if (loading) {
      return <p>Cargando datos...</p>;
   }
   if (error) {
      return <p>Error: {error}</p>;
   }
   if (!data || !data.hourly) {
      return <p>No hay datos disponibles.</p>;
   }

   // Datos de la API
   const arrLabels = data.hourly.time || [];
   const arrValues1 = data.hourly.temperature_2m || [];
   const arrValues2 = data.hourly.apparent_temperature || [];

   const rows = aggregateByDay(arrLabels, arrValues1, arrValues2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <Typography 
            variant="h6"
            component="h2"
            sx={{
               fontWeight: 'bold',
               fontFamily: 'cursive, system-ui, Avenir, Helvetica, Arial, sans-serif',
               color: '#ffffff',
               marginBottom: 1 
            }}
            >
               Registro de Condiciones Climáticas
         </Typography>

         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
               backgroundColor: '#303030',  //background de la tabla
               color: 'white', //texto
               
               '& .MuiDataGrid-columnHeaders': {
                  color: 'black',             
               },

               '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#18659cff', // para cuando el puntero este encima de cada fila
               },

            }}
         />
      </Box>
   );
}
