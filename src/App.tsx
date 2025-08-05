import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher'
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Thermometer, ThermometerHot, Wind, Drop } from "phosphor-react";
import { CircularProgress } from '@mui/material';
import { Compass, Mountain } from 'lucide-react';

function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const dataFetcherOutput = DataFetcher(selectedCity);


  let currentIndex = -1;

  if (dataFetcherOutput.data?.hourly?.time?.length) {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const nowIsoHour = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:00`;
    currentIndex = dataFetcherOutput.data.hourly.time.findIndex((isoTime: string) => isoTime === nowIsoHour);
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', flexWrap: 'wrap' }}>
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI/>
      </Grid>
      
      
      {dataFetcherOutput.loading && (
        <Grid spacing={3} width="100%" size={{ xs: 12, md: 12 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
          >
            <CircularProgress />
            <p>Loading...</p>
        </Grid>
      )}
      {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
      {dataFetcherOutput.data && (
        <>

          
          {/* Alertas y Selector*/}
          <Grid container spacing={3} width="100%">
            <Grid size={{ xs: 12, md: 6 }}>
              <SelectorUI onCityChange={setSelectedCity} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AlertUI data={dataFetcherOutput.data}/>
            </Grid>
          </Grid>
          
          {/* Indicadores con datos obtenidos */}
          <Grid 
            container
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}>
             
            
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                color: '#ffffff',
                width: '100%',
                marginBottom: 1 
              }}>
              Indicadores del clima en {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
            </Typography>

            <Grid container spacing={3} width="100%">
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Temperatura (2m)"
                  icon={<Thermometer size={32} />}
                  description={
                    currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.temperature_2m[currentIndex]} ${dataFetcherOutput.data.hourly_units.temperature_2m}` :'N/A'}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Temperatura aparente"
                  icon={<ThermometerHot size={32} />}
                  description={
                    currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.apparent_temperature[currentIndex]} ${dataFetcherOutput.data.hourly_units.apparent_temperature}` :'N/A'}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Velocidad del viento"
                  icon={<Wind size={32} />}
                  description={
                    currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.wind_speed_10m[currentIndex]} ${dataFetcherOutput.data.hourly_units.wind_speed_10m}` :'N/A'}
                />                     
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Humedad relativa"
                  icon={<Drop size={32} />}
                  description={
                    currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.relative_humidity_2m[currentIndex]} ${dataFetcherOutput.data.hourly_units.relative_humidity_2m}` :'N/A'}
                />
              </Grid>

            </Grid>
          </Grid>

          {/* Gráfico */}
          <Grid 
            size={{ xs: 12, md: 12 }} 
            sx={{ 
              borderRadius: 2,
              padding: 3,
              backgroundColor: '#303030',
            }}>
            <ChartUI data={dataFetcherOutput.data} />
          </Grid>

          {/* Tabla e Info adicional*/}
          <Grid container spacing={3} width="100%" alignItems={'center'}>
            <Grid size={{ xs: 12, md: 9 }}>
              <TableUI  data={dataFetcherOutput.data} />
            </Grid>

            <Grid container direction="column" spacing={2} size={{ xs: 12, md: 3 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <IndicatorUI
                  title="latitud"
                  icon={<Compass size={32} />}
                  description={`${dataFetcherOutput.data?.latitude}`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <IndicatorUI
                  title="longitud"
                  icon={<Mountain size={32} />}
                  description={`${dataFetcherOutput.data?.longitude}`}
                />
              </Grid>
            </Grid>
          </Grid>

        </>
      )}
      
    </Grid>
  )
}

export default App