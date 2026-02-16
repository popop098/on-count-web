import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useState } from "react";

const StreamerInfoCard = memo(
  ({
    channelName,
    channelImageUrl,
    channelUrl,
    channelFollwerCount,
    channelVerificationMark,
  }) => {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = () => {
      if (isNavigating) return;
      setIsNavigating(true);
      router.push(channelUrl, undefined, { shallow: true });
    };

    // Ensure all required props are present and are strings
    if (!channelName || !channelImageUrl || !channelUrl) {
      return null;
    }

    // Ensure channelName is a string to prevent React error #130
    const safeChannelName =
      typeof channelName === "string" ? channelName : String(channelName || "");

    return (
      <Card className="w-full sm:w-auto py-3 sm:py-4 hover:shadow-lg transition-shadow duration-200">
        <CardBody className="overflow-visible py-2 space-y-2 flex items-center justify-center w-full">
          <div className="w-[108px] h-[108px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden relative">
            <Image
              alt={`${safeChannelName} 프로필 이미지`}
              src={channelImageUrl}
              style={{ objectFit: "cover" }}
              fill
              sizes="(max-width: 640px) 108px, 150px"
              priority={false}
              loading="lazy"
            />
          </div>
          <CardHeader className="pb-0 pt-2 px-4 flex justify-center">
            <h4 className="font-bold text-base sm:text-xl truncate max-w-[160px] sm:max-w-[200px]">
              {safeChannelName}
              {channelVerificationMark && (
                <span className="ml-1 text-blue-500">✓</span>
              )}
            </h4>
          </CardHeader>
          {channelFollwerCount && (
            <p className="text-xs sm:text-sm text-gray-500">
              팔로워 {channelFollwerCount.toLocaleString()}명
            </p>
          )}
          <Button
            fullWidth
            color="primary"
            variant="ghost"
            onPress={handleClick}
            isLoading={isNavigating}
            disabled={isNavigating}
          >
            이동
          </Button>
        </CardBody>
      </Card>
    );
  },
);

StreamerInfoCard.displayName = "StreamerInfoCard";

export default StreamerInfoCard;
export { StreamerInfoCard };
