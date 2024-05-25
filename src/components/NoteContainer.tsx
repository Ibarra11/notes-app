export default function NoteContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 h-full bg-gray-100">{children}</div>
  );
}
