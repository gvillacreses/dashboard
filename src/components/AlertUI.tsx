import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AlertConfig {
    description: string;
}

export default function AlertUI( config:AlertConfig ) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 2,
                backgroundColor: '#5c5c5c',
                borderRadius: 2,
                boxShadow: 1,
            }}>
            <Typography 
                variant="h6"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'cursive, system-ui, Avenir, Helvetica, Arial, sans-serif',
                    color: '#bf6210ff',
                    marginBottom: 1 
                }}>
                ⚠️ Alertas del Sistema
            </Typography>

            <Alert 
                variant="filled" 
                severity="info" 
                sx={{
                    backgroundColor: '#18659cff',
                    // backgroundColor: '#1565c0',
                    color: '#000000',
                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                    fontSize: '1rem',
                    padding: 1,
                    borderRadius: 2
                }}>
                {config.description}
            </Alert>
        </Box>
    )
}