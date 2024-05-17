export default function NoteContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 h-full border-4 border-red-500 p-12">
      {children}
    </div>
  );
}
