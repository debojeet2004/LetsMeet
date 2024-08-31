'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"


const MeetingTypeList =  () => {
    const { toast } = useToast()
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isInstantMeeting' | 'isJoiningMeeting' | undefined>(undefined)
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    
    const [callDetails, setcallDetails] = useState<Call>()
    
    const { user } = useUser();
    const client = useStreamVideoClient();
    const createMeeting = async () => {
        if(!client) return console.error('Stream video client is not yet initialized');
        if(!user) return alert('Failed to create meeting due to user ');

        try {
            if(!values.dateTime) {
                toast({title: "Please select a date and time",})
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if(!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';
            // const endsAt = new Date(values.dateTime.getTime() + 60 * 60 * 1000).toISOString();

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setcallDetails(call);

            if(!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({title: "Meeting created",})
        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to create meeting",
                // description: "Friday, February 10, 2023 at 5:57 PM",
            })
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                className="bg-orange-1"
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-purple-1"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Meeting Recordings"
                className="bg-yellow-1"
                handleClick={() => router.push('/recordings')}
            />

            {!callDetails ? (
                <MeetingModel
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Create Meeting"
                handelClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e:any) => setValues({ ...values, description: e.target.value })}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModel>
            ) : (
                <MeetingModel
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Meeting Created"
                handelClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({ title: 'Link Copied' });
                }}
                image={'/icons/checked.svg'}
                buttonIcon="/icons/copy.svg"
                className="text-center"
                buttonText="Copy Meeting Link"
                />
            )}

            <MeetingModel 
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className= 'text-center'
                buttonText="Start Meeting"
                handelClick={createMeeting}
            />
            <MeetingModel 
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Type the link here '
                className= 'text-center'
                buttonText="Join Meeting"
                handelClick={() => router.push(values.link)}
            >
                <Input 
                    placeholder='Meeting Link'
                    className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) => setValues({...values, link: e.target.value})}
                />
            </MeetingModel>
        </section>
    )
}

export default MeetingTypeList