import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { memo } from "react";

const StreamerInfoCard = memo(({
  channelName,
  channelImageUrl,
  channelUrl,
  channelFollwerCount,
  channelVerificationMark,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(channelUrl, undefined, { shallow: true });
  };

  return (
    <Card className="py-4 hover:shadow-lg transition-shadow duration-200">
      <CardBody className="overflow-visible py-2 space-y-2 flex items-center justify-center w-full">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
          <Image
            alt={`${channelName} 프로필 이미지`}
            src={channelImageUrl}
            style={{ objectFit: "cover" }}
            fill
            sizes="150px"
            priority={false}
            loading="lazy"
          />
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex justify-center">
          <h4 className="font-bold text-xl truncate max-w-[200px]">
            {channelName}
            {channelVerificationMark && (
              <span className="ml-1 text-blue-500">✓</span>
            )}
          </h4>
        </CardHeader>
        {channelFollwerCount && (
          <p className="text-sm text-gray-500">
            팔로워 {channelFollwerCount.toLocaleString()}명
          </p>
        )}
        <Button
          fullWidth
          color="primary"
          variant="ghost"
          onPress={handleClick}
        >
          이동
        </Button>
      </CardBody>
    </Card>
  );
});

StreamerInfoCard.displayName = 'StreamerInfoCard';

export { StreamerInfoCard };
