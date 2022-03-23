import React, { useEffect, useState } from 'react';
import { BuddyEditor } from '../components/sections/BuddyEditor';
import { D3Tree } from '../components/sections/D3Tree';
import { Tabs } from '../components/baseComponents/Tabs';
import { useBuddy } from '../providers/Buddy';
import { convertToD3CompatibleTree } from '../utils/convertToD3CompatibleTree';

export const HomePage = () => {
  const buddy = useBuddy();
  const [activeTab, setActiveTab] = useState<'Editor' | 'Tree respresentation'>(
    'Editor'
  );
  const [d3Tree, setD3Tree] = useState<any>({});

  useEffect(() => {
    if (buddy?.buddy) {
      const d3TreeCompatibleTree = convertToD3CompatibleTree(buddy.buddy);
      setD3Tree(d3TreeCompatibleTree);
    }
  }, [buddy?.buddy]);

  const handleTabChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedTab = (e.target as HTMLDivElement).id;
    setActiveTab(selectedTab as 'Editor' | 'Tree respresentation');
  };

  if (buddy?.loadingSchema) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen">
      <Tabs
        activeTab={activeTab}
        tabs={['Editor', 'Tree respresentation']}
        onTabClick={handleTabChange}
      />
      {activeTab === 'Editor' ? <BuddyEditor /> : <D3Tree d3Tree={d3Tree} />}
    </div>
  );
};
