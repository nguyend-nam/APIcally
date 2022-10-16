export const FileHeader = ({
  currentFileName,
  className,
}: {
  currentFileName: string;
  className?: string;
}) => {
  return (
    <div className={`px-4 pt-4 bg-white shadow-lg flex ${className}`}>
      <div className="px-3 py-1.5 max-w-max rounded-t-xl bg-slate-100 text-primary">
        <code className="text-sm">{currentFileName}</code>
      </div>
    </div>
  );
};
