import { useState } from 'react';

const Home = () => {
    return (
        <>
        <div className="root">

            <div className="header">
                <div className="header-title">
                    <h1>plans</h1>
                </div>
            </div>

            <div className='plans-container'>
                <div className='plan'>
                    <h1>Hobbyist</h1>
                    <p>FREE</p>
                    <p>5 requests/month</p>
                    <p>Notion template + chrome extension for a $1.99/month</p>
                </div>

                <div className='plan'>
                    <h1 className='typewriter'>Pro</h1>
                    <p className='typewriter'>$3.99/month</p>
                    <p className='typewriter'>Unlimited Requests</p>
                    <p className='typewriter'>Free Notion template + chrome extension</p>
                </div>
            </div>

        </div>
        </>
    )
}

export default Home;