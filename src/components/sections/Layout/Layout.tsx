import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="w-screen grid grid-cols-[15%_85%]">
      <Sidebar />
      <main className="px-4  w-full">{children}</main>
    </div>
  );
};
