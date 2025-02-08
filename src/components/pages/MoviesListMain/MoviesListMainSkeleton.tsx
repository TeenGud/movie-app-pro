import { Skeleton, Stack, useMediaQuery } from '@mui/material';

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="200px"
        sx={{ marginBottom: '10px' }}
      />
      <Stack
        mt={2}
        mb={2}
        sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1 }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
      </Stack>
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
