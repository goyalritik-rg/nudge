const {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} = require("@/components/ui/dialog");
const { cn } = require("@/lib/utils");

function Trigger({ children }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}

function Header({
  title = "",
  description = "",
  className = "",
  titleClassname = "",
  descriptionClassname = "",
}) {
  return (
    <DialogHeader className={className}>
      <DialogTitle className={titleClassname}>{title}</DialogTitle>

      <DialogDescription className={descriptionClassname}>
        {description}
      </DialogDescription>
    </DialogHeader>
  );
}

function Content({ children, className }) {
  return (
    <DialogContent className={cn("sm:max-w-[425px]", className)}>
      {children}
    </DialogContent>
  );
}

function Body({ children, className }) {
  return <div className={className}>{children}</div>;
}

function Footer({ children, className }) {
  return <DialogFooter className={className}>{children}</DialogFooter>;
}

function Modal({ children, className, show = false, setShow = () => {} }) {
  return (
    <Dialog className={className} open={show} onOpenChange={setShow}>
      {children}
    </Dialog>
  );
}

Modal.Content = Content;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Trigger = Trigger;

export default Modal;
