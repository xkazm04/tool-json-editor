import React from 'react';
import { Notification } from './components/baseComponents/Notification';
import { Layout } from './components/sections/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { BuddyContext, useBuddyContext } from './providers/Buddy';

function App() {
  const buddy = useBuddyContext();

  return (
    <BuddyContext.Provider value={buddy}>
      {/* <div className=" bg-gradient-primary dark:bg-dark-mode-gradient pb-20 px-5 py-5 min-h-screen"> */}
      <Layout>
        <HomePage />
      </Layout>
      {/* </div> */}
      <Notification />
    </BuddyContext.Provider>
  );
}

export default App;
