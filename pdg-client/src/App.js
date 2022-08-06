import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Editor, {useMonaco} from '@monaco-editor/react';

function App() {

  const editorRef = useRef(null);
  const handleEditorDidMount = (editor, monaco) => {
    console.log('EditorDidMount', editor);
    editorRef.current = editor;
  }
  const monaco = useMonaco();

  const [comment, setComment] = useState('Test');

  const handleClick = async () => {

    try {
      const res = await fetch('http://localhost:12345/code', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({language: 'cpp', text: editorRef.current.getValue()}),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      console.log("Wassup");
      console.log(editorRef.current.getValue());
      console.log(JSON.stringify(result));

      setComment(result.out);
    } catch (err) {
      console.log('error');
    }
  };

  return (
    <div className="App">
        <Editor
          defaultValue=""
          height="85vh"
          language="cpp"
          onMount={handleEditorDidMount}
          />
        <button onClick={handleClick}>Send</button>
        <p>{comment}</p>
    </div>
  );
}

export default App;
