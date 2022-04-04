import React, { useEffect, useRef, useState } from 'react';
import { BuddyEditor } from '../components/sections/BuddyEditor';
import { D3Tree } from '../components/sections/D3Tree';
import { Tabs } from '../components/baseComponents/Tabs';
import { useBuddy } from '../providers/Buddy';
import { convertToD3CompatibleTree } from '../utils/convertToD3CompatibleTree';
import { Schema } from '../components/sections/Schema';
import { useOutsideClick } from '../hooks/useOutsideClick';

export const HomePage = () => {
  const buddy = useBuddy();
  const [showSchema, setShowSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'Editor' | 'Tree respresentation'>(
    'Editor'
  );
  const schemaRef = useRef<HTMLDivElement | null>(null);

  const [d3Tree, setD3Tree] = useState<any>({});

  useOutsideClick(schemaRef, () => showSchema && setShowSchema(false));

  const closeSchema = () => {
    setShowSchema(false);
  };

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
      <div className="flex justify-between py-2">
        <Tabs
          className="h-12"
          activeTab={activeTab}
          tabs={['Editor', 'Tree respresentation']}
          onTabClick={handleTabChange}
        />
        <button
          onClick={() => setShowSchema(true)}
          className="bg-[#562AD0] uppercase py-2 px-4 outline-none border-none text-white"
        >
          Show Code
        </button>
      </div>
      {activeTab === 'Editor' ? <BuddyEditor /> : <D3Tree d3Tree={d3Tree} />}
      {showSchema && (
        <div
          ref={schemaRef}
          className="absolute top-0 w-1/2 left-0 translate-x-[100%] z-50"
        >
          <Schema closeSchema={closeSchema} />
        </div>
      )}
    </div>
  );
};
