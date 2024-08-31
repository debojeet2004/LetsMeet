import { SignIn } from '@clerk/nextjs'
import React from 'react'

const signInPage = () => {
  return (
    <main className='flex-center h-screen'>
      <SignIn/>
    </main>
  )
}

export default signInPage