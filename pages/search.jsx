import axios from "axios";
import buzzk from 'buzzk'
import ContainerBox from "@/components/ContainerBox";
import {StreamerInfoCard} from "@/components/StreamerInfoCard";
import OnCountLogo from "@/public/icon.png"
import {useRouter} from "next/router";
import {Button} from "@heroui/react";
export default function Search({data}){
    const router = useRouter();
    return (
        <>
            <ContainerBox>
                <div className="w-full h-[10em]"/>
                <div className="w-[80%] space-y-4">
                    <h1 className="text-2xl leading-tight">
                        "
                        {
                            data.q
                        }
                        "에 대한 검색 결과입니다.
                    </h1>
                    <Button fullWidth variant='ghost' onPress={()=>router.back()}>
                        이전
                    </Button>
                    <div className="w-full h-1 bg-gray-600 rounded-xl"/>
                    {
                        JSON.parse(data.searchResult).length > 0 ? <div className="w-full flex flex-wrap items-center gap-2">
                            {
                                JSON.parse(data.searchResult).map((item, index) => (
                                    <StreamerInfoCard key={index}
                                                      channelName={item.name}
                                                      channelUrl={'/info/'+item.channelID}
                                                      channelFollwerCount={item.follower}
                                                      channelImageUrl={item.imageURL || OnCountLogo}/>
                                ))
                            }
                        </div> : <div className="w-full h-[30em] flex items-center justify-center">
                            <p className="text-xl leading-tight">
                                검색 결과가 없습니다.
                            </p>
                        </div>
                    }


                </div>
            </ContainerBox>
        </>
    )
}

export async function getServerSideProps({req,query}) {
    const {q} = query
    buzzk.login(process.env.CHZZK_NID_AUT,process.env.CHZZK_NID_SES)
    return {
        props: {
            data: {
                q,
                searchResult: JSON.stringify(Object?.values(await buzzk.channel.search(q) || []) || [])
            }
        }
    }
}