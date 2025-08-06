import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type TableUIProps = {
  data: any;
};

function sameDate(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default function TableUI({ data }: TableUIProps) {
  if (!data || !data.hourly) {
    return <p>No hay datos disponibles.</p>;
  }

  const labels: string[] = data.hourly.time || [];
  const values1: number[] = data.hourly.temperature_2m || [];
  const values2: number[] = data.hourly.apparent_temperature || [];

  const dayMap: Record<string, { temps1: number[]; temps2: number[]; hourLabels: string[] }> = {};

  for (let i = 0; i < labels.length; i++) {
    const day = labels[i].split('T')[0];
    if (!dayMap[day]) {
      dayMap[day] = { temps1: [], temps2: [], hourLabels: [] };
    }
    dayMap[day].temps1.push(values1[i]);
    dayMap[day].temps2.push(values2[i]);
    dayMap[day].hourLabels.push(labels[i]);
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const currentHour = today.getHours();

  const tablaDatos = Object.entries(dayMap).map(([day, temps]) => {
    const [year, month, dayOfMonth] = day.split('-').map(Number);
    const dateObj = new Date(year, month - 1, dayOfMonth);

    let displayDay = '';
    if (sameDate(dateObj, today)) displayDay = 'Hoy';
    else if (sameDate(dateObj, tomorrow)) displayDay = 'Mañana';
    else
      displayDay = dateObj.toLocaleDateString('es-ES', {
        month: 'long',
        day: 'numeric',
      });

    const tempActual = temps.temps1[currentHour] ?? '-';

    return {
      day,
      displayDay,
      minTemp1: Math.min(...temps.temps1),
      maxTemp1: Math.max(...temps.temps1),
      minTemp2: Math.min(...temps.temps2),
      maxTemp2: Math.max(...temps.temps2),
      tempActual,
    };
  });

  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          color: '#ffffff',
          marginBottom: 1,
        }}
      >
        📅 Registro de temperaturas diarias
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          bgcolor: '#0f172a',
          borderRadius: 2,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '8px',
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#252525' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Día</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp Hora Actual</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp Min</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp Max</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp Apar Min</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp Apar Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tablaDatos.map((row) => (
              <TableRow
                key={row.day}
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: '#383838' },
                  '&:nth-of-type(even)': { bgcolor: '#383838' },
                  '&:hover': { bgcolor: '#4a4a4a' },
                }}
              >
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.displayDay}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.tempActual.toFixed(1)}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.minTemp1}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.maxTemp1}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.minTemp2}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{row.maxTemp2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
