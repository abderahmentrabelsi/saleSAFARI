'use client';

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem
} from '@nextui-org/react';
import { ChevronDown } from '@nextui-org/shared-icons';
import { Link } from '@nextui-org/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

export const UserDropdown = () => {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          endContent={<ChevronDown fill="currentColor" size={16} />}
          radius="sm"
          variant="light"
        >
          {session.user.username}
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem>
          <Link
            color="foreground"
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            href="/account"
          >
            Account Settings
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            color="foreground"
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            onClick={async () => {
              await signOut({ callbackUrl: '/auth' });
            }}
          >
            Logout
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
