import { Card, CardBody } from "@heroui/card";

export const WeeklyChallengerBanner = () => {
  return (
    <Card className="bg-primary/50 overflow-hidden text-white p-6 md:p-8 lg:p-10 rounded-lg">
      <div className="size-[200px] opacity-50 md:opacity-100 bg-background flex justify-center items-center rounded-full absolute -bottom-20 -left-10">
        <img alt="" src="/images/asset-3.png" />
      </div>
      <CardBody>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
              Awesome Weekly challenge
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              Challenges you don&apos;t want to miss out on
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <img alt="MTN logo" src="/images/mtn.png" />
            <p className="text-xs md:text-sm text-center max-w-[250px] px-2">
              This week challenge proudly sponsored by{" "}
              <span className="font-semibold">MTN</span>
            </p>
          </div>
        </div>
      </CardBody>

      <div className="size-[200px] opacity-50 md:opacity-100 bg-background flex justify-center items-center rounded-full absolute -top-20 -right-20">
        <img alt="" src="/images/asset-4.png" />
      </div>
    </Card>
  );
};
