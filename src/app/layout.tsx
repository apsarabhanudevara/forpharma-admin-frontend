import { AppProvider } from "@toolpad/core/nextjs";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicalServiceIcon from "@mui/icons-material/MedicalServices";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DifferenceIcon from "@mui/icons-material/Difference";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Navigation } from "@toolpad/core";
import Image from "next/image";
import ForPharmaIcon from "../assets/favicon.svg";
import theme from "../theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "doctors",
    title: "Doctors",
    icon: <MedicalServiceIcon />,
  },
  {
    segment: "chemists",
    title: "Chemists",
    icon: <LocalPharmacyIcon />,
  },
  {
    segment: "drugs",
    title: "Drugs",
    icon: <VaccinesIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <AddShoppingCartIcon />,
  },
  {
    segment: "rcpa",
    title: "RCPA",
    icon: <DifferenceIcon />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider
            branding={{
              title: "ForPharma",
              logo: (
                <Image
                  src={ForPharmaIcon}
                  alt="ForPharma"
                  width={40}
                  height={40}
                />
              ),
            }}
            theme={theme}
            navigation={NAVIGATION}
          >
            {children}
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
