type ButtonProps = {
  content: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({ content, onClick, className }: ButtonProps) {
  return (
    <button
      className={`bg-primary hover:bg-primary-hover text-primary-light rounded-btn py-3 px-6 hover:cursor-pointer w-full text-xl hover:-translate-y-1 transition-transform duration-300 ${className ?? ""}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
