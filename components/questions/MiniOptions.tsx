import { useState } from 'react';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export default function MiniOptions({ editActions }: any) {
  const [options, setOptions] = useState(false);

  return (
    <div className='flex flex-row-reverse px-5'>
      <div className='flex-row rounded-full bg-light-purple px-5 font-bold text-slate-500'>
        <ModeOutlinedIcon
          className='m-2 hover:text-black'
          onClick={(e) => editActions.editQuestion()}
        />
        <DeleteOutlinedIcon
          className='m-2 hover:text-black'
          onClick={(e) => editActions.deleteQuestion()}
        />
        <ArrowDownwardOutlinedIcon
          className='m-2 hover:text-black'
          onClick={(e) => editActions.moveQuestionDown()}
        />
        <ArrowUpwardOutlinedIcon
          className='m-2 hover:text-black'
          onClick={(e) => editActions.moveQuestionUp()}
        />
      </div>
    </div>
  );
}
