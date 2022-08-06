import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Editor, {useMonaco} from '@monaco-editor/react';

function App() {

  // const editorRef = useRef(null);
  // const handleEditorDidMount = (editor, monaco) => {
  //   editorRef.current = editor;
  // }
  const monaco = useMonaco();

  const [comment, setComment] = useState('');

  const handleClick = async () => {

    try {
      const res = await fetch('http://localhost:12345/code', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({language: 'cpp', text: 'hello'}),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      console.log("Wassup");
      console.log(monaco);
      console.log(JSON.stringify(result));

      

      setComment(result);
    } catch (err) {
      console.log('error');
    }
  };

  return (
    <div className="App">
        <Editor

          height="85vh"
          language="cpp"
          />
        <button onClick={handleClick}>Send</button>
    </div>
  );
}

export default App;
