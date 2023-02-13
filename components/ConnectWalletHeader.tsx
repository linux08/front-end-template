import React from 'react';
import { AppBar, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from '../styles/Home.module.css';
import type { NextPage } from "next";


const ConnectWalletHeader: NextPage = () => (
  <Box className={styles.header}>
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Fuji Finance test
        </Typography>
        <nav>
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </nav>
      </Toolbar>
    </AppBar >
  </Box>
);

export default ConnectWalletHeader;
