const Section = ({ label, message, className = "" }) => {
  return (
    <div className={className}>
      <p className="font-medium text-lg">{label}</p>
      <p className="text-xs font-light text-muted-foreground">{message}</p>
    </div>
  );
};

export default Section;
