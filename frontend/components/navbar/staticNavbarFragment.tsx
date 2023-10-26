'use client';

import React from 'react';
import {
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu
} from '@nextui-org/react';
import { ChevronDown } from '@nextui-org/shared-icons';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Link } from '@nextui-org/link';

const areas = [
  {
    name: 'Seller Area',
    uri: '/offer',
    children: [
      { label: 'Home', path: '/' },
      { label: 'Join Us', path: '/' }
    ]
  },
  {
    name: 'Customer Area',
    uri: '/customer',
    children: [
      { label: 'Home', path: '/' },
      { label: 'Orders', path: '/orders', absolute: true },
      { label: 'Your Deliveries', path: '/showDeliveries', absolute: true },
      { label: 'Market', path: '/products', absolute: true },
      { label: 'Tickets', path: '/ticket', absolute: true }
    ]
  },
  {
    name: 'Offers',
    uri: '/offers',
    children: [{ label: 'List', path: '/' }]
  }
];

export const StaticNavbar = () => {
  return (
    <>
      {areas.map((area) => (
        <Dropdown placement="bottom-start" key={`${area.name}-dropdown-key`}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                {area.name}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {area.children.map((child) => (
              <DropdownItem key={child.label}>
                <Link
                  color="foreground"
                  href={`${child.absolute ? '' : area.uri}${child.path}`}
                >
                  {child.label}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ))}
    </>
  );
};
