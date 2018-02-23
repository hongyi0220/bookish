import React from 'react';

const About = props => {
    return (
        <div className='about-container'>
            <div className='about-text-wrapper'>About This App</div>
            <div className='tech-text-wrapper'>Front-end tech stack</div>
            <div className='front-end-logos-container logos-container'>
                <div className='react-logo-wrapper logo-wrapper'>
                    <img src='/images/logos/react-logo.png'/>
                    <div className='logo-text-wrapper'>React</div>
                </div>
                <div className='semantic-ui-logo-wrapper logo-wrapper'>
                    <img src='/images/logos/semantic-ui-logo.png'/>
                    <div className='logo-text-wrapper'>Semantic-UI-React</div>
                </div>
            </div>
            <div className='tech-text-wrapper'>Back-end tech stack</div>
            <div className='back-end-logos-container logos-container'>
                <div className='nodejs-logo-wrapper logo-wrapper'>
                    <img src='/images/logos/nodejs-logo2.png'/>
                    <div className='logo-text-wrapper'>Node.js</div>
                </div>
                <div className='logo-wrapper'>
                    <img src='/images/logos/expressjs-logo.png'/>
                    <div className='logo-text-wrapper'>Express.js</div>
                </div>
                <div className='mongodb-logo-wrapper logo-wrapper'>
                    <img src='/images/logos/mongodb-logo.png'/>
                    <div className='logo-text-wrapper'>MongoDB</div>
                </div>
            </div>
            <div className='tech-text-wrapper'>API</div>
            <div className='api-logos-container logos-container'>
                <div className='logo-wrapper'>
                    <img src='/images/logos/google-logo.png'/>
                    <div className='logo-text-wrapper'>Google Books API</div>
                </div>
            </div>
            <div className='tech-text-wrapper'>Key module</div>
            <div className='modules-logos-container logos-container'>
                <div className='socketio-logo-wrapper logo-wrapper'>
                    <img src='/images/logos/passportjs-logo.png'/>
                    <div className='logo-text-wrapper'>Passport.js</div>
                </div>
            </div>
            <span>*Website design adapted from <a target='_blank' href='http://www.pages.xyz/type/pricing'>pages.xyz</a></span>
        </div>
    );
}

export default About;
