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
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 1,
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
                ⚠️ Alertas del Sistema
            </Typography>

            <Alert 
                variant="filled" 
                severity="info" 
                sx={{
                    backgroundColor: '#ffaa330d',
                    border: '1px solid #febf67ff',
                    color: '#000000',
                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                    fontSize: '1rem',
                    padding: 1,
                    borderRadius: 1
                }}>
                {config.description}
            </Alert>
        </Box>
    )
}