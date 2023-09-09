import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React,{SyntheticEvent, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps{
    value: any;
    setValue: (val: any) => void;
}
var quillRef: any;
export const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" },
  ],
  ["link", "image", "video", "code-block", "code"],
  [{ indent: "+1" }, { indent: "-1" }],
  ["clean"],
];

export const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  "image",
  "video",
];

export default function Editor({value,setValue}:EditorProps) {
  return (
    <ReactQuill
      ref={(e) => (quillRef = e)}
      modules={{
        toolbar: {
          container: toolbar,
        },
      }}
      formats={formats}
      theme="snow"
      value={value}
      onChange={setValue}
    ></ReactQuill>
  );
}
// export function CreatePost(){
//     const [cookies, setCookies] = useCookies(["token"]);
//     const [editorFields, setEditorFields] = useState({
//       posttype: "question",
//       title: "",
//       content: "",
//       organization_id: 0
//     });

//     const setEditorValue = (s: string) => {
//       setEditorFields({ ...editorFields, content: s });
//     };
//     const postNewPost = () => {
//       const posturl = `${process.env.REACT_APP_SERVER_URL}/${editorFields.posttype}/add` ;
//       postData(posturl, editorFields,cookies.token)
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//       setEditorFields({
//         posttype: "",
//         title: "",
//         content: "",
//         organization_id: 0,
//       });
//     };

//     return (
//       <Card className="editor" sx={{padding:'20px'}} >
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Post Type</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={editorFields.posttype}
//             label="Post Type"
//             onChange={(event) =>
//               setEditorFields({...editorFields, posttype: event.target.value})
//             }
//           >
//             <MenuItem value={'question'}>Question</MenuItem>
//             <MenuItem value={'article'}>Article</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           id="filled-multiline-flexible"
//           sx={{ width: "100%" }}
//           label="Title"
//           multiline
//           maxRows={4}
//           value={editorFields.title}
//           placeholder={`Title of your ${editorFields.posttype}`}
//           onChange={(event) =>
//             setEditorFields({ ...editorFields, title: event.target.value })
//           }
//           variant="filled"
//         />
//         <ReactQuill
//           ref={(e) => (quillRef = e)}
//           modules={{
//             toolbar: {
//               container: toolbar,
//             },
//           }}
//           formats={formats}
//           theme="snow"
//           value={editorFields.content}
//           onChange={setEditorValue}
//         ></ReactQuill>
//         <Button onClick={() => postNewPost()}>Post</Button>
//         <Button onClick={() => console.log(editorFields.content)}>Log</Button>
//       </Card>
//     );
// }

// export function CreateArticle() {
//   const [editorFields, setEditorFields] = useState({
//     posttype: "Article",
//     title: "",
//     content: ``,
//     organization_id: 0,
//   });
//   const setEditorValue = (s: string) => {
//     setEditorFields({ ...editorFields, content: s });
//   };
//   const postArticle = () => {};
//   return (<Card component="form" autoComplete="off" sx={{maxWidth:'700px',padding:'20px'}}>
//         <Stack spacing={2}>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{
//               flexGrow: 1,
//               display: {
//                 xs: "none",
//                 sm: "block",
//               },
//               alignSelf: "center",
//             }}
//           >
//             Title
//           </Typography>
//           <TextField
//             style={{ backgroundColor: "AppWorkspace" }}
//             fullWidth
//             variant="outlined"
//             value={editorFields.title}
//             placeholder={`Title of your ${editorFields.posttype}`}
//             onChange={(event) =>
//               setEditorFields({ ...editorFields, title: event.target.value })
//             }
//           ></TextField>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{
//               flexGrow: 1,
//               display: {
//                 xs: "none",
//                 sm: "block",
//               },
//               alignSelf: "center",
//             }}
//           >
//             Content
//           </Typography>
//           <ReactQuill
//             modules={{
//               toolbar: {
//                 container: toolbar,
//               },
//             }}
//             formats={formats}
//             theme="snow"
//             value={editorFields.content}
//             onChange={setEditorValue}
//           />
//           <Button
//             style={{
//               backgroundColor: "#00bcd4",
//               color: "white",
//               marginTop: "10px",
//               width: "20%",
//               alignSelf: "center",
//             }}
//             variant="contained"
//             color="primary"
//             onClick={() => postArticle()}
//           >
//             {" "}
//             Post
//           </Button>
//         </Stack>
//       </Card>);
// }
// interface MyState {
//   text: string;
//   title: string;
//   content: string;
// }

// class ArticleEditor extends React.Component<{}, MyState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       text: "",
//       title: "",
//       content: "",
//     }; // You can also pass a Quill Delta here
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(value: any) {
//     this.setState({ text: value });
//   }

//   render() {
//     return (
//       <>
//         <Navbar />
//         <Editor value={this.state.text} setValue={this.handleChange} />
//       </>
//     );
//   }
// }