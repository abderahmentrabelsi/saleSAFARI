import React from 'react';
import { title } from '@components/primitives';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col gap-2">
      <h1
        className={`${title({
          size: 'sm'
        })} mb-2`}
      >
        Ticket Details
      </h1>
      <section className="">
        <div className="inline-block w-full">{children}</div>
      </section>
    </div>
  );
}
