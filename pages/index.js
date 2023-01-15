import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import buildspaceLogo from '../assets/buildspace-logo.png';
import Typewriter from 'typewriter-effect';


const TwitterButton = () => {
  const text = encodeURIComponent("Incredible. This web app literally solved my restlessness. It uses AI to generate a list of productive activities you could be doing based on your job, hobby, goal, age, and top skill. My prompt: <insert your prompt> The first activity: <insert the first generated activity> You can try it for yourself at productivity-machine.com right now!");
  const url = encodeURIComponent("https://productivity-machine.com");
  const hashtags = encodeURIComponent("productivity, AI, webapp");

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Tweet how productive you're gonna be
    </a>
  );
};



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
    console.log("OpenAI replied...", output.text);

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
      
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-65KCTDRVCF"
        strategy="afterInteractive"
      />
      {/* <!-- Global site tag (gtag.js) - Google Analytics -- */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-65KCTDRVCF');
        `}
      </Script>
    

      <div className="container">
        <div className="top">
        {/* <p className='login'>Log in.</p> */}
        {/* <a href="https://www.producthunt.com/posts/productivity-machine?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-productivity&#0045;machine" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=374143&theme=dark" alt="productivity&#0032;machine - The&#0032;place&#0032;you&#0032;go&#0032;to&#0032;when&#0032;you&#0039;re&#0032;feeling&#0032;restless&#0046; | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" /></a> */}
          <div className="header">
            <div className="header-title">
              <h1>productivity machine for 
                <Typewriter
            options={{
              strings: ['developers', 'startup founders', 'artists', 'students'],
              autoStart: true,
              loop: true,
              wrapperClassName: 'typewriter',
              cursorClassName: 'typewriter',
            }}
          /></h1>
            </div>
            <div className="header-subtitle">
              <h2>do you feel like you could be doing something more productive right now? never again. enter your job, hobby, goal, age, and skill to have artificial intelligence tell you the most optimal tasks you could be doing (make sure to be as specific as possible; output will be shown on the bottom 👇)!</h2>
            </div>
          </div>
          {/* <Link className='stripe-page' href='/plans'>Plans</Link> */}
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder='technical co-founder of an AI startup, building side projects, raise $1 million for my startup from the venture capital firm Andreessen Horowitz, 21, can manage people very well'
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
          {/* <a href="https://www.producthunt.com/posts/productivity-machine?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-productivity&#0045;machine" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=374143&theme=dark" alt="productivity&#0032;machine - The&#0032;place&#0032;you&#0032;go&#0032;to&#0032;when&#0032;you&#0039;re&#0032;feeling&#0032;restless&#0046; | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" /></a> */}
          {/* <p>If you like this app, shoot me an <a href="mailto:dylanmolinabusiness@gmail.com">email</a> and put "productivity machine" in the line to get early access to the Notion chrome extension!</p>  */}
          {/* <a target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text=Incredible%3E<Type your prompt> " class="twitter-share-button" data-show-count="false">Tweett</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></cript> */}
          {/* <TwitterButton className="badge" /> */}
          {/* <a href="https://www.producthunt.com/posts/productivity-machine?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-productivity&#0045;machine" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=374143&theme=light" alt="productivity&#0032;machine - The&#0032;place&#0032;you&#0032;go&#0032;to&#0032;when&#0032;you&#0039;re&#0032;feeling&#0032;restless&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a> */}
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>your activities 📈</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
                <br />
                {/* <p className='extension-text'>If you like this app, you can try downloading this chrome extension I made: <a href="https://github.com/dylanintech/productive-activity-generator-chrome-extension">productive activity generator</a> , it lets you highlight text anywhere and use it to generate a list like the one you see above! Note: Only works on Calmly for now...</p> */}
                <p className='extension-text'>If you like this app, shoot me an <a href="mailto:dylanmolinabusiness@gmail.com">email</a> and put "productivity machine" in the subject line to get early access to <span className='pstack'>pstack</span>, the ultimate app for your productivity stack! Also, consider upvoting on Product Hunt, it takes one second and would help me out!</p> 
                <div className='p-hunt'>
                <a href="https://www.producthunt.com/posts/productivity-machine?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-productivity&#0045;machine" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=374143&theme=dark" alt="productivity&#0032;machine - The&#0032;place&#0032;you&#0032;go&#0032;to&#0032;when&#0032;you&#0039;re&#0032;feeling&#0032;restless&#0046; | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" /></a>
                </div>
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
            <p>built with ❤️ by dylan </p> 
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
