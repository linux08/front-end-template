import Container from "@mui/material/Container";
import { useState } from "react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Image from "next/image";
import MenuItem from '@mui/material/MenuItem';
import { staticData } from "../utils/data";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Head from "next/head";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { orange } from "@mui/material/colors";

const Home: NextPage = () => {


  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState('public')
  const [info, setInfo] = useState(staticData);


  const postInfo = (data) => {
    let dataInfo = [data].concat(info);
    setInfo(dataInfo);
  }

  return (
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
      <Card style={{ display: "flex", flexDirection: "column", width: 500 }}>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="You status message ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: 480,
            outline: "none",
            border: "none",
            padding: 20,
            color: "#718096",
            marginTop: 10,
          }}
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
            // displayEmpty
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
            onClick={() => postInfo(
              {
                img: "https://picsum.photos/200",
                name: "Linux Prumt 🌍",
                visibility,
                body: text,
              }
            )}
            sx={{ backgroundColor: "#dd6b20", color: "white", height: 50 }}
          >
            Post
          </Button>
        </Box>
      </Card>
      <br />
      <Container>
        {info.map((item, id) => {
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
                  {item.name}{" "}
                </Typography>
                <Typography>{item.body}</Typography>
              </Box>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};

export default Home;