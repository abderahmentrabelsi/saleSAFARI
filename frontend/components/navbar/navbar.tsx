'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@nextui-org/navbar';

import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';

import { Logo } from '@/components/icons';
import { Avatar, Divider } from '@nextui-org/react';
import React from 'react';
import { StaticNavbar } from '@/components/navbar/staticNavbarFragment';
import { useSession } from 'next-auth/react';
import { UserDropdown } from '@components/navbar/fragments/UserDropdown';

export const Navbar = () => {
  const { data: session, status } = useSession();

  // todo: use https://www.npmjs.com/package/react-responsive to make this responsive
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SaleSafari</p>
          </NextLink>
        </NavbarBrand>
        <StaticNavbar />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {status === 'authenticated' && session && <UserDropdown />}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
