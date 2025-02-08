import { Stack, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        display: 'flex',
        flexDirection: { sm: 'row' },
        justifyContent: { sm: 'space-between' },
        alignItems: { sm: 'center' },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} &laquo;Teen Gud Movies&raquo; +18{' '}
        <br />
        Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.
        <br />
        Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.
      </Typography>
      <Typography variant="h4" color="primary.main">
        Teen Gud Movies
      </Typography>
    </Stack>
  );
}
