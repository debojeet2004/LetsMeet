import CallList from '@/components/CallList'
import React from 'react'

const UpcomingPage = () => {
  return (
    <div>
        <section className='flex size-full flex-col gap-10 text-white '>
          <h1 className='text-3xl font-bold'>Upcoming Page</h1>
          <CallList 
            type='upcoming'
          />
        </section>
    </div>
  )
}

export default UpcomingPage