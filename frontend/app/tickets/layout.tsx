import { title } from '@components/primitives';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className={`${title({ size: 'sm' })}`}>My Tickets</h1>
        {children}
      </div>
    </>
  );
}
