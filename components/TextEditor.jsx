import { useState, useRef, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';

const TextEditor = () => {
  const [text, setText] = useState('');
  const transformedTextRef = useRef(null);

  useEffect(() => {
    new ClipboardJS('.copy-button').on('success', (e) => {
      toast('Text copied!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      //console.log('Text copied to clipboard:', e.text);
    });
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTransform = (transformFn) => {
    if (transformFn === capitalize && text === text.toUpperCase()) {
      setText(text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()));
    } else {
      setText(transformFn(text));
    }
  };


  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'te-transforme-el-texto.txt');
    toast('Text downloaded!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="container mx-auto p-4">
      <textarea
        className="w-full h-40 p-4 border rounded"
        value={text}
        onChange={handleTextChange}
        placeholder="Type or paste your text here..."
      />

      <div className="btn-container">
        <button
          className="btn btn-sm btn-active btn-ghost mt-4 mr-2"
          onClick={() => handleTransform((str) => str.toLowerCase())}
        >
          Convertir a minúsculas
        </button>

        <button
          className="btn btn-sm btn-active btn-ghost mt-4 mr-2"
          onClick={() => handleTransform((str) => str.toUpperCase())}
        >
          Convertir a mayúsculas
        </button>

        <button
          className="btn btn-sm btn-active btn-ghost mt-4 mr-2"
          onClick={() => handleTransform((str) => str.toLowerCase().replace(/(^|\.\s|\!\s|\?\s)([a-z])/g, (m) => m.toUpperCase()))}
        >
          Sentence case
        </button>

        <button
          className="btn btn-sm btn-active btn-ghost mt-4 mr-2"
          onClick={() => handleTransform(capitalize)}
        >
          Capitalize
        </button>
      </div>

      <h2 className="mt-8">Texto transformado:</h2>
      <div
        id="transformed-text"
        ref={transformedTextRef}
        className="text-transformed p-4 border rounded overflow-auto"
        style={{ wordBreak: 'break-all' }}
      >
        {text}
      </div>

      <button
        className="copy-button btn btn-sm mt-4 mr-2"
        data-clipboard-target="#transformed-text">
        Copiar al Portapapeles
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M104.6 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80c0 17.7 14.3 32 32 32h72.4C202 108.4 227.6 96 256 96h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48zM144 56a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM448 464H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16l140.1 0L464 243.9V448c0 8.8-7.2 16-16 16zM256 512H448c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64z" /></svg>
      </button>

      <button className="btn btn-sm mt-4 mr-2" onClick={handleDownload}>
        Descargar Texto
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" /></svg>
      </button>

      <ToastContainer />
    </div>
  );
};

export default TextEditor;