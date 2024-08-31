import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    title:string,
    description:string,
    img:string,
    className:string,
    handleClick:() => void,
}

const HomeCard = ({title,description,img,className,handleClick}:HomeCardProps) => {
return (
    <div 
        className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',className)}
        onClick={handleClick}
    >
        <div className='flex-center glassmorphism size-12 rounded-[10px]'>
            <Image src={img} alt='meeting' width={32} height={32}/>
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-sm font-normal'>{description}</p>
        </div>
    </div>
)
}

export default HomeCard