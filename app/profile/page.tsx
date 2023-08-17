
import Feed from "@/components/homepage/Feed";
import Image from "next/image";
import Link from "next/link";
import { Card,CardContent,Avatar, Stack,Typography } from "@mui/material";

const data = {
  FIRST_NAME : "Barack",
  LAST_NAME: "Obama",
  USERNAME: "barackobama",
};
const Home = () => {
  "use client"
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: "10px",
          width: "90%",
        }}
      >
        <Avatar
          sx={{ display: "block", width: "196px", height: "196px" }}
          src={"https://ca-times.brightspotcdn.com/dims4/default/3b6e3d0/2147483647/strip/true/crop/2000x2706+0+0/resize/1200x1624!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F2c%2Fdedf568e4af087cab5f0a5c76f32%2Fla-ca-bk-a-promised-land-barack-obama-183.JPG"}
        ></Avatar>
        <Stack spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
            }}
          >
            {" "}
            {data?.FIRST_NAME} {data?.LAST_NAME}{" "}
            <Typography variant="body2">
              {" "}
              [
              <Link href={`/profile/${data?.USERNAME}`}>
                {data?.USERNAME}
              </Link>
              ]{" "}
            </Typography>
          </Typography>
          <Typography variant="body2"> Master Of all Trades, Jack of None </Typography>
          <Typography variant="body2">
            Joined , Last Active 
          </Typography>
          <Typography variant="body2">
            {/* <Email></Email> */}
            asdfsa@gmail.com
          </Typography>
        </Stack>
      </CardContent>
      <Typography variant="body1" sx={{ fontWeight: "130" }}>
        {" "}
        Dummy
      </Typography>
    </Card>
  );
};

export default Home;
