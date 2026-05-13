type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="empty-state" role="status">
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__desc">{description}</p>
    </div>
  );
}
