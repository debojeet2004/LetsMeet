import CallList from '@/components/CallList'
import React from 'react'

const RecordingPage = () => {
  return (
    <div>
        <section className='flex size-full flex-col gap-10 text-white'>
          <h1 className='text-3xl font-bold'>Recording page</h1>
          <CallList 
            type='recordings'
          />
        </section>
    </div>
  )
}

export default RecordingPage