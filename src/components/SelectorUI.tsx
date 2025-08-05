import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type SelectorUIProps = {
  onCityChange: (city: string) => void;
};

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
  const [cityInput, setCityInput] = useState<string>('');
 

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value);
    onCityChange(event.target.value); // Notifica al padre
  }


  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#5c5c5c',
        borderRadius: 2,
        boxShadow: 1 
      }}>

      <Typography 
        variant="h6"
        component="h2"
        sx={{
            fontWeight: 'bold',
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
            color: '#ffffff',
            marginBottom: 1 
        }}>
        📍 Ubicación Geográfica
      </Typography>

      <FormControl fullWidth>
        <InputLabel 
          id="city-select-label" 
          sx={{
            color: '#ffffff',
          }}
        >
            Ciudad
        </InputLabel>
        <Select
          labelId="city-select-label"
          id="city-simple-select"
          label="Ciudad"
          value={cityInput}
          onChange={handleChange}
          sx={{
            color: '#ffffff', // texto blanco
            backgroundColor: '#303030', // fondo antes de desplegar
            
            '& .MuiSvgIcon-root': {
              color: '#ffffff', // icono dropdown blanco
            },
            '& .MuiSelect-select': {
              paddingRight: '32px' // para que el ícono no tape el texto
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#303030', //fondo de color gris oscuro
                color: '#ffffff', // texto menú blanco
              }
            }
          }}
        >
          <MenuItem disabled value="">
            <em>Seleccione una ciudad</em>
          </MenuItem>
          <MenuItem value="guayaquil">Guayaquil</MenuItem>
          <MenuItem value="quito">Quito</MenuItem>
          <MenuItem value="manta">Manta</MenuItem>
          <MenuItem value="cuenca">Cuenca</MenuItem>
        </Select>
      </FormControl>
    
    </Box>
  )
}