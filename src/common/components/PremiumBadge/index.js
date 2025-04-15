import Image from "next/image";

const PremiumBadge = () => {
  return (
    <div className="flex gap-1 bg-orange-50 dark:bg-orange-500 rounded-full px-3 py-1 text-xs items-center font-bold">
      <Image src="/icons/premium-badge.svg" alt="" width={20} height={20} />
      <p className="text-neutral-950"> Premium</p>
    </div>
  );
};

export default PremiumBadge;
