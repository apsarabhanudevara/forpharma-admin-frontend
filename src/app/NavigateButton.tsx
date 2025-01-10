'use client';
import * as React from 'react';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export default function NavigateButton() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Box sx={{ mt: 5 }}>
      <Link href="/doctors">
        <LoadingButton variant="contained" color="primary" loading={loading} onClick={() => setLoading(true)}>
          Go to Dashboard
        </LoadingButton>
      </Link>
    </Box>
  );
}
