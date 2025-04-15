import Image from "next/image";

const PremiumBadge = () => {
  return (
    <div className="flex gap-1 bg-orange-50 rounded-full px-3 py-1 text-xs items-center font-bold">
      <Image src="/icons/premium-badge.svg" alt="" width={20} height={20} />
      Premium
    </div>
  );
};

export default PremiumBadge;
