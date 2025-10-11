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
            fill
            sizes="150px"
            className="object-cover"
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
