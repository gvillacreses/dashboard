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
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid id="Encabezado" size={{ xs: 12, md: 12 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        <HeaderUI/>
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} sx={{ display: {xs: 'none', md: 'block'} }} container justifyContent="right" alignItems="center">
        Elemento: Alertas
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Selector
        <SelectorUI onCityChange={setSelectedCity} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        
        Elemento: Indicadores
         <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Temperatura (2m)" description="XX°C" />
        </Grid>
         <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Temperatura aparente" description="YY°C" />
        </Grid>
         <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Velocidad del viento" description="ZZkm/h" />
        </Grid>
         <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Humedad relativa" description="NN%" />
        </Grid>
      </Grid>

      {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                        <IndicatorUI
                          title="Temperatura (2m)"
                          description={
                            currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.temperature_2m[currentIndex]} ${dataFetcherOutput.data.hourly_units.temperature_2m}` :'N/A'}
                        />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                          title="Temperatura aparente"
                          description={
                            currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.apparent_temperature[currentIndex]} ${dataFetcherOutput.data.hourly_units.apparent_temperature}` :'N/A'}
                        />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                          title="Velocidad del viento"
                          description={
                            currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.wind_speed_10m[currentIndex]} ${dataFetcherOutput.data.hourly_units.wind_speed_10m}` :'N/A'}
                        />                     
                      </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title="Humedad relativa"
                              description={
                            currentIndex !== -1 ? `${dataFetcherOutput.data.hourly.relative_humidity_2m[currentIndex]} ${dataFetcherOutput.data.hourly_units.relative_humidity_2m}` :'N/A'}
                        />
                     </Grid>

                 </>
                 )}

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        <ChartUI loading={dataFetcherOutput.loading} error={dataFetcherOutput.error} data={dataFetcherOutput.data} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        <TableUI loading={dataFetcherOutput.loading} error={dataFetcherOutput.error} data={dataFetcherOutput.data} />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Información adicional
      </Grid>

    </Grid>
      

  )
}

export default App
