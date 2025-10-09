import useSWR from "swr";
import {swrFetcher} from "@/tools/fetchTools";
import {memo} from "react";
import NumberFlow, {continuous} from "@number-flow/react";
import {Spinner} from "@heroui/react";

const FollowerCount = memo(({ count }) => (
    <NumberFlow value={count} plugins={[continuous]} willChange />
));

export default function overlay({channelId,color}){
    const {data,isLoading,error,isValidating} = useSWR(`/api/channel-info?mode=followers&channelid=${channelId}`,
        swrFetcher,
        {
            refreshInterval: 3000,
            refreshWhenHidden: true
        })
    return(
        <div className="px-3 py-4 w-fit h-fit">
            {
                (!data && (isValidating || isLoading)) && <Spinner/>
            }
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-start gap-1">
                    <p className="-mb-6 font-semibold" style={{color:color}}>현재 팔로워 수</p>
                    <div className="w-2 h-2 bg-primary rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>
                </div>

                <p className={`text-[7rem] font-extrabold`} style={{color:color}}>
                    <FollowerCount count={!data ? 0 : data.currFollowerCount} />
                </p>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params,query }) {
    const { channelId, color } = query;
    console.log(params,query)
    return{
        props:{
            channelId,
            color
        }
    }
}
