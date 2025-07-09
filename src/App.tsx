import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {

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
      <Grid size={{ xs: 12, md: 9 }} sx={{ display: {xs: 'none', md: 'block'} }}>
        Elemento: Indicadores
      </Grid>

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
