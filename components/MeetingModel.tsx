import React , {ReactNode} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModelProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    buttonText?: string,
    buttonIcon?: string,
    handelClick: () => void,
    image?:string,
    children?: ReactNode,
}

const MeetingModel = ({isOpen, onClose, title, className, buttonText, buttonIcon, handelClick, image, children}: MeetingModelProps) => {
return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
            <div className='flex  items-center flex-col gap-6'>
                {
                    image && (
                        <Image 
                            src={image}
                            alt='image'
                            width={72}
                            height={72}
                            className='flex  items-center justify-center'
                        />
                    )
                }
                <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
                {children}
                <Button
                onClick={handelClick}
                className='bg-blue-1  w-full  focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {buttonIcon && (
                        <Image 
                            src={buttonIcon}
                            alt='button icon'
                            width={13}
                            height={13}
                            className='flex justify-center'
                        />
                    )} &nbsp;
                    {buttonText || 'Schedule Meeting'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>

)
}

export default MeetingModel