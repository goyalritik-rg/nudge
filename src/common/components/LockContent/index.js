const LockContent = ({ children }) => {
  return (
    <div className="cursor-not-allowed w-full">
      <div className="pointer-events-none">{children}</div>
    </div>
  );
};

export default LockContent;
