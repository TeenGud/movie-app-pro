import { Box, Typography } from '@mui/material';

export default function ErrorMessage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <Typography variant="h4">Some error occurated!</Typography>
    </Box>
  );
}
