import Image from "next/image";

const Banner = ({ width = 100 }) => {
  return (
    <img
      src="/images/logo.png"
      alt="Nudge"
      width={100}
      className="object-cover"
    />
  );
};

export default Banner;
