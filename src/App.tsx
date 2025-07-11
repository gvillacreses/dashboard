import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI'; // Importar el componente IndicatorUI
import DataFetcher from './functions/DataFetcher'

function App() {

  const dataFetcherOutput = DataFetcher();

  return (
    
    

    <Grid container spacing={5} justifyContent="center" alignItems="center">

      

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Encabezado
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
        <SelectorUI />
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
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.hourly.temperature_2m + " " + dataFetcherOutput.data.hourly_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.hourly.apparent_temperature + " " + dataFetcherOutput.data.hourly_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.hourly.wind_speed_10m + " " + dataFetcherOutput.data.hourly_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.hourly.relative_humidity_2m + " " + dataFetcherOutput.data.hourly_units.relative_humidity_2m} />
                     </Grid>

                 </>
                 )}

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Tabla
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Información adicional
      </Grid>

    </Grid>
      

  )
}

export default App
