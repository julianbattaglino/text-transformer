import Head from 'next/head';
import TextEditor from '../components/TextEditor';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Text Transformer</title>
      </Head>
      <div>
        <h1 className="stroke-title">Text Transformer</h1>
        <TextEditor />
      </div>
    </>
  );
};

export default HomePage;
