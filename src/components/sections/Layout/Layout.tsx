import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="w-screen flex">
      <Sidebar />
      <main className="px-4 flex-1 w-full">{children}</main>
    </div>
  );
};
