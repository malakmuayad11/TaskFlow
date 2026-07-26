type ConfirmationDialogProps = {
  message: string;
  description?: string;
  onYesClick: () => void;
  onNoClick: () => void;
};

export default function ConfirmationDialog({
  message,
  description,
  onYesClick,
  onNoClick,
}: ConfirmationDialogProps) {
  return (
    <section>
      <h2>{message}</h2>
      {description && <p>{description}</p>}
      <button onClick={onYesClick}>Yes</button>
      <button onClick={onNoClick}>No</button>
    </section>
  );
}
