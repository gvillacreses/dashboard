import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

type SelectorUIProps = {
  onCityChange: (city: string) => void;
};

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
  const [cityInput, setCityInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const city = event.target.value;
    setCityInput(city);
    setIsLoading(true);

    setTimeout(() => {
      setCityInput(city);
      onCityChange(city);
      setIsLoading(false);
      }, 1000);
    };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: 1 
      }}>

      <Typography 
        variant="h6"
        component="h2"
        sx={{
            fontWeight: 'bold',
            fontFamily: 'cursive, system-ui, Avenir, Helvetica, Arial, sans-serif',
            color: '#000000',
            marginBottom: 1 
        }}>
        📍 Ubicación Geográfica
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <FormControl fullWidth>
          <InputLabel id="city-select-label">Ciudad</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={cityInput}
            onChange={handleChange}
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
      )}
    </Box>
  )
}