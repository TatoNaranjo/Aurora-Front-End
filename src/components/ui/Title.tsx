interface TitleProps {
  children: React.ReactNode;
  type: "principal" | "secondary";
}

export const Title: React.FC<TitleProps> = ({ children, type = "principal" }) => {
  const typeClasses = {
    "principal": "justify-start text-foreground text-3xl font-bold",
    "secondary": "justify-center text-yellow-900 text-3xl font-bold"
  }
  const titleClass = `${typeClasses[type]}`
  return (
    <h2 className={titleClass}>{children}</h2>
  );
}
