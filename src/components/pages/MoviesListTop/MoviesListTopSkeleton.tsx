import { Skeleton, Stack } from '@mui/material';

export default function MoviesListTopSkeleton() {
  // const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="200px"
      />
      <Stack
        mt={2}
        mb={2}
        sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1 }}
      ></Stack>
      <Stack>
        <Stack direction="row" justifyContent="center" flexWrap="wrap">
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <Stack key={index}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height="322px"
                  width="215px"
                />
                <Skeleton animation="wave" variant="text" width="120px" />
                <Skeleton animation="wave" variant="text" width="120px" />
              </Stack>
            ))}
        </Stack>
      </Stack>
    </>
  );
}
