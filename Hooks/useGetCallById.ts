import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

export const useGetCalledById = (id:String | String[]) => {
    const [ call , setCall ] = useState<Call>()
    const [ isCallLoading , setIsCallLoading ] = useState(true);

    const client = useStreamVideoClient();

    useEffect(() => {
        if(!client) return;
        
        const loadCall = async () => {
            try {
                const { calls } = await client.queryCalls({filter_conditions: {id}})
                if(calls.length > 0) setCall(calls[0]);
                setIsCallLoading(false);
            }catch (error) {
                console.log(error);
                setIsCallLoading(false);
                }
        };
        loadCall();
    },[client, id]);

    return { 
        call,
        isCallLoading,
    };
}