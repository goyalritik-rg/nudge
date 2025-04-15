import Image from "next/image";
const Banner = () => {
  return (
    <div>
      <Image src="/images/logo.png" alt="logo" width={120} height={40} />
    </div>
  );
};

export default Banner;
