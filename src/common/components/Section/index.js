const Section = ({ label, message, className = "" }) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
};

export default Section;
