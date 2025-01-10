import ForPharmaLogo from '../assets/forpharma.svg';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
import NavigateButton from './NavigateButton';

export default function Home() {
  const Logo: any = ForPharmaLogo;
  return (
    <Grid
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ height: '100vh', flexDirection: 'column' }}
    >
      <Image src={Logo} alt="ForPharmaLogo" />
      <NavigateButton />
    </Grid>
  );
}
