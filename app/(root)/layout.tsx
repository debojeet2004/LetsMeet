import StreamVideoProvider from '@/providers/StreamClientProvider'
import { StreamVideo } from '@stream-io/video-react-sdk'
import { Metadata } from 'next';
import React, { Children } from 'react'

export const metadata: Metadata = {
  title: "letsMeet",
  description: "a video calling app for people",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main> 
  )
}

export default RootLayout