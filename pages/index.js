import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';



const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (evt) => {
    setUserInput(evt.target.value);
  }
  return (
    <div className="root">
      <Head>
        <title>Productive Activity Generator | by dylan</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Productive activity generator for <span id='typewriter-text'>restless people</span></h1>
          </div>
          <div className="header-subtitle">
            <h2>Do you feel like you could be doing something more productive rn? Type in your current occupation, one of your hobbies, and one goal you have to generate some personalized productive things you could be doing. Tip: Make sure to be as specific as possible!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder='technical co-founder of an AI company, reading books about startups, raise $1m for my company from a16z'
          className='prompt-box' 
          value={userInput}
          onChange={onUserChangedText}
          />
          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
                <br />
                <p className='extension-text'>If you like this app, you can try downloading this chrome extension I made: <a href="ttps://github.com/dylanintech/productive-activity-generator-chrome-extension">productive activity generator</a> , it lets you highlight text anywhere and use it to generate a list like the one you see above! Note: Only works on Calmly for now...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/dxlantxch"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" /> */}
            <p>built with ❤️ by Dylan </p> 
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
