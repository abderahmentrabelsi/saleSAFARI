import { title } from '@components/primitives';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <h1 className={`${title({ size: 'sm' })}`}>My Tickets</h1>
      <div className="flex flex-col gap-2">{children}</div>
    </>
  );
}
