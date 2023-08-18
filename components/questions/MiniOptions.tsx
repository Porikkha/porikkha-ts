import { useState } from "react"
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';


export default function MiniOptions( {editActions}:any ) {
    const [options, setOptions] = useState(false);

    return (
        <div className="flex flex-row-reverse px-5">
            <div className="flex-row text-slate-500 font-bold bg-light-purple rounded-full px-5">
                <ModeOutlinedIcon className="m-2 hover:text-black" onClick={(e) =>  editActions.editQuestion()} />
                <DeleteOutlinedIcon  className="m-2 hover:text-black" onClick={(e) => editActions.deleteQuestion()}/>
                <ArrowDownwardOutlinedIcon  className="m-2 hover:text-black" onClick={(e) => editActions.moveQuestionDown()}/>
                <ArrowUpwardOutlinedIcon  className="m-2 hover:text-black" onClick={(e) => editActions.moveQuestionUp()}/>
            </div>
        </div>
    )
}