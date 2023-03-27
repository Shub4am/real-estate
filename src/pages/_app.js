import React from 'react';
import '@/styles/globals.css';
import Home from './home';
import About from './about';
import Deals from './deals';
import Services from './services';
import Review from './review';
import Insta from './insta';
import Form from './form';

const App = () => {
  return (
    <div>
      <Home />
      <About />
      <Services />
      <Deals />
      <Review />
      <Insta />
      <Form />
    </div>
  );
};

export default App;
