// 'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'antd/dist/antd.css';
import Sidebar from '@/app/components/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TalkWithMe',
  description: '',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
    </head>
    <body className='flex bg-[#343540]'>
    <Sidebar />

    {children}
    </body>
    </html>
  );
}
