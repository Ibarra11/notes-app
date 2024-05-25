export default function ToolbarButtonGroup({
  children,
  divider,
}: {
  children: React.ReactNode;
  divider: boolean;
}) {
  return (
    <div className="flex h-fit gap-2">
      {children}
      {divider && <Divider />}
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-full w-px  bg-red-700"></div>;
}
