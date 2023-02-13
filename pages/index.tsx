import { useEffect } from "react";
import Container from "@mui/material/Container";
import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { Typography } from '@mui/material';
import type { NextPage } from "next";
import Image from "next/image";
import MenuItem from '@mui/material/MenuItem';
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import TextareaAutosize from "@mui/base/TextareaAutosize";
import ConnectWalletHeader from '../components/ConnectWalletHeader';
import Header from '../components/Header';
import abi from '../contracts/abi.json'
import wagmi from 'wagmi';

import {
  useContract,
  useNetwork,
  useSigner,
  useWaitForTransaction,
  useEnsAvatar,
  useEnsName,
  useAccount
} from 'wagmi';


import {
  fetchEnsName,
  fetchEnsAvatar,
  GetContractResult
} from '@wagmi/core'


interface IMeow {
  img: string;
  author: string;
  message: string;
}



import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  const { address, connector, isConnected } = useAccount()

  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })


  const signer = useSigner();

  const [text, setText] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('public');
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [meows, setMeows] = useState<IMeow[]>([]);


  const { chain } = useNetwork();
  const contract: GetContractResult = useContract({ address: '0xd054e5724d7d595b72abbb0c460e0221cd859c8f', abi, signerOrProvider: signer?.data });


  useEffect(() => {

    (async () => {
      try {
        let meows = await contract.getAllMeows();
        meows = await Promise.all(meows.map(async (meow) => {
          return {
            img: await getENSImage(meow[1]),
            author: await getENSName(meow[1]),
            message: meow[0]
          }
        }));
        setLoading(false);
        //Temporary show the first element until i implement pagination

        meows.length = 10;
        setMeows(meows.reverse());
      } catch (error) {
        setLoading(false);
        setMeows([]);
        console.log(error.message)
      };
    })();
  }, [contract]);


  async function getENSImage(address): Promise<string> {

    try {
      const ensImage = await fetchEnsAvatar({
        address,
      });
      return ensImage == null ? "https://picsum.photos/200" : ensImage;
    }
    catch (err) {
      return "https://picsum.photos/200";
    }

  }

  async function getENSName(address): Promise<string> {
    try {
      const ensName = await fetchEnsName({
        address,
      });
      return ensName == null ? address : ensName;
    }
    catch (err) {
      return address
    }
  }


  const postInfo = async () => {
    if (text.length < 1) {
      alert('Text cant empty')
    }
    try {
      setTransactionLoading(true);
      const transaction = await contract.sayMeow(text);
      setTransactionLoading(false);

      let data: IMeow = {
        author: address,
        img: ensAvatar !== null ? ensAvatar : 'https://picsum.photos/200',
        message: text,
      };

      let dataInfo = [data].concat(meows);
      setMeows(dataInfo);
    }
    catch (err) {
      setTransactionLoading(false);
      console.log(err.message)
    }
  }

  const displayData = (data) => {
    if (data.length === 0) {
      return (
        <Box className={styles.center} >
          <Typography
            variant="h4"
            paddingLeft={0.1}
            color="#dd6b20"
          >
            Data currently empty
          </Typography>
        </Box>)
    }
    return (
      <Container>
        {meows.map((item, id) => {
          return (
            <Card
              key={id}
              elevation={2}
              sx={{
                height: 100,
                marginBottom: 2,
                display: "flex",
                padding: 3,
                marginLeft: -3,
                width: 500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 1,
                  alignItems: "center",
                }}
              >
                <Image
                  src={`${item.img}`}
                  alt="images"
                  width="60"
                  height="60"
                  style={{
                    borderRadius: 100,
                    paddingLeft: 20,
                  }}
                />
              </Box>
              <Box style={{ paddingTop: 3, paddingLeft: 12 }}>
                <Typography style={{ color: "#718096" }}>
                  {" "}
                  {item.author}{" "}
                </Typography>
                <Typography>{item.message}</Typography>
              </Box>
            </Card>
          );
        })}
      </Container>
    )
  }

  const spinner = () => (
    <Stack sx={{
      color: 'grey.500',
       justifyContent:
        'center'
    }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  );

  const newMessage = () => (
    <Card style={{ display: "flex", flexDirection: "column", width: 500 }}>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="You status message ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={
          {
            width: 480,
            outline: "none",
            border: "none",
            padding: 20,
            color: "#718096",
            marginTop: 10,
          }
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 0.8,
          width: 500,
          paddingRight: 2,
          paddingBottom: 2,
          paddingTop: 5,
        }}
      >
        <Select
          name="Select"
          id="select"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          sx={{
            width: 120,
            backgroundColor: "whitesmoke",
            outline: "none",
            height: 50,
            color: "#4a5568",
            border: "none",
          }}
        >
          <MenuItem value="Public" defaultChecked onSelect={() => setVisibility('public')}>
            <Typography> 🌍 Public</Typography>
          </MenuItem>
          <MenuItem value="Private" onSelect={() => setVisibility('private')}>
            <Typography> 🔒 Private</Typography>
          </MenuItem>
        </Select>
        <Button
          onClick={() => postInfo()}
          sx={{ backgroundColor: "#dd6b20", color: "white", height: 50 }}
        >
          Post
        </Button>
      </Box>
    </Card>
  );


  if (!address) {
    return (
      <Box>
        <Header />
        <ConnectWalletHeader />

        <Box className={styles.center} >
          <Typography
            variant="h4"
            paddingLeft={0.1}
            color="#dd6b20"
            marginBottom={1}
          >
            Connect Metamask to use APP
          </Typography>
        </Box>
      </Box>
    )
  }



  return (

    <Box>
      <Header />
      <ConnectWalletHeader />

      <main className={styles.main}>
        {
          chain?.id === 5 ? (
            <Container
              maxWidth="sm"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="subtitle1" fontWeight={780}>
                  Status:
                </Typography>
                <Typography variant="subtitle1" paddingLeft={0.5}>
                  ready
                </Typography>
              </Box>

              <Typography
                variant="h4"
                paddingLeft={0.1}
                color="#dd6b20"
                marginBottom={1}
              >
                {" "}
                Messages
              </Typography>

              {
                transactionLoading ? spinner() :
                  newMessage()
              }

              <br />

              {
                loading ? <Box> loading......</Box> : displayData(meows)
              }

            </Container>)
            :
            (<Box>
              <Typography variant="subtitle1" fontWeight={780}>
                Please switch to georli network to use DAPP
              </Typography>
            </Box>)
        }
      </main>
    </Box>
  );
};

export default Home;