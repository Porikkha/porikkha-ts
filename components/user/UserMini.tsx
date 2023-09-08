'use client';

import { Chip, Avatar, Box } from '@mui/joy';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
interface UserAvatarProps {
  userID: string;
  image: string;
  username: string;
  role:string
}

export default function UserMini({ userID }: { userID: string }) {
  const { data: session } = useSession();
  const [data, setData] = useState<UserAvatarProps>({
    userID: session?.user.id,
    image: session?.user.image,
    username: session?.user.name,
  } as UserAvatarProps);

  useEffect(() => {
    // fetchData(`/api/user/${userID}`,(res)=>{
    // setData(res.data);
    // }){
    setData({
      userID: session?.user.id,
      image: session?.user.image,
      username: session?.user.name,
      role:"Student",
    } as UserAvatarProps);
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '250px' }}>
      <Avatar src={data.image} />
      <Box sx={{marginLeft:"10px"}}>
      <Link href={`/user/${userID}`}>
        <Typography>{data.username}
            </Typography>
      </Link>
      <Typography sx={{color:"var(--clr-purple-1)"}}>
        {data.role}
      </Typography>
      </Box>
      {/* <Chip size="small" avatar={<Avatar src={data?.PROFILE_PICTURE} ></Avatar>}  label={data?.FIRST_NAME+' '+data?.LAST_NAME} clickable/> */}
    </Box>
  );
}

// <Chip />
// </Link>
