import React from "react";
import { Notification } from "./components/Notification";
import { HomePage } from "./pages/HomePage";
import { BuddyContext, useBuddyContext } from "./providers/Buddy";

function App() {
  const buddy = useBuddyContext();

  return (
    <BuddyContext.Provider value={buddy}>
      <div className=' bg-indigo-900 py-5 px-5 min-h-screen'>
        <HomePage />
      </div>
      <Notification />
    </BuddyContext.Provider>
  );
}

export default App;
