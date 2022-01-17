import React from "react";
import { HomePage } from "./pages/HomePage";
import { BuddyContext, useBuddyContext } from "./providers/Buddy";

function App() {
  const buddy = useBuddyContext();

  return (
    <BuddyContext.Provider value={buddy}>
      <div className=' bg-slate-300 py-10 px-5 min-h-screen'>
        <HomePage />
      </div>
    </BuddyContext.Provider>
  );
}

export default App;
