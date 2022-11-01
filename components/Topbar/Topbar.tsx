import { useRouter } from "next/router";

const formatPathname = (pathname: string) => {
  const newPathname = pathname.slice(1);
  newPathname.replace("-", " ");
  return newPathname[0].toUpperCase() + newPathname.slice(1);
};

export const Topbar = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`p-8 py-4 w-full bg-white text-2xl font-medium text-slate-600 shadow-md ${className}`}
    >
      {formatPathname(pathname)}
    </div>
  );
};
