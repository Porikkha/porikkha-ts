'use client';

import { Chip, Avatar, Box } from '@mui/joy';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
interface UserAvatarProps {
  userID: string;
  image: string;
  username: string;
}

export default function UserAvatar({ userID }: { userID: string }) {
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
    } as UserAvatarProps);
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '175px' }}>
      <Link href={`/user/${userID}`}>{data.username}</Link>
      <Avatar src={data.image} />
      {/* <Chip size="small" avatar={<Avatar src={data?.PROFILE_PICTURE} ></Avatar>}  label={data?.FIRST_NAME+' '+data?.LAST_NAME} clickable/> */}
    </Box>
  );
}

// <Chip />
// </Link>
