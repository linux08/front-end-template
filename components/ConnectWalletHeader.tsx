import React from 'react';
import { AppBar, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import type { NextPage } from "next";


const ConnectWalletHeader: NextPage = () => (
  <div>
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
  </div>
);

export default ConnectWalletHeader;
