"use client"
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCalledById } from '@/Hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({params : {id}}: {params: {id: string}}) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { 
    call, 
    isCallLoading, 
  } = useGetCalledById(id);

  if(!isLoaded || isCallLoading) return <Loader/>;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );
  
  return (
    <main className='h-screen w-full'>
      {/* <h1 className='text-white'>Meeting page: {id}</h1> */}
      <StreamCall call = {call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom/>
            )}
          </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting