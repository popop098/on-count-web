import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { router } from "next/client";
import Image from "next/image";
export const StreamerInfoCard = ({
  channelName,
  channelImageUrl,
  channelUrl,
}) => {
  return (
    <Card className="py-4">
      <CardBody className="overflow-visible py-2 space-y-2 flex items-center justify-center w-full">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
          <Image
            alt={`${channelName}Image`}
            src={channelImageUrl}
            style={{ objectFit: "cover" }}
            fill
            sizes="(max-width: 768px) 150px, 150px"
          />
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex justify-center">
          <h4 className="font-bold text-xl">{channelName}</h4>
        </CardHeader>
        <Button
          fullWidth
          color="primary"
          variant="ghost"
          onPress={() => router.push(channelUrl, undefined,{shallow:true})}
        >
          이동
        </Button>
      </CardBody>
    </Card>
  );
};
