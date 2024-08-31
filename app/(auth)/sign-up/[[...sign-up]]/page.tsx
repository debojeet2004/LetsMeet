import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const signUpPage = () => {
    return (
        <main className='flex-center h-screen'>
        <SignUp/>
        </main>
    )
}

export default signUpPage