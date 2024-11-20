/* eslint-disable */

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../shadcn-ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../shadcn-ui/button";
import UserIcon from "./UserIcon";
import { links } from "@/utils/links";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store";
import { logout, signInWithGoogle } from "@/firebase/auth";

const LinksDropdown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle(dispatch);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSignUp = () => {
    // To Do Later
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="h-6 w-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        {user ? (
          <>
            {links.map((link) => (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="w-full capitalize">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full capitalize justify-start pl-0 py-0 h-auto"
                onClick={() => logout(dispatch)}
              >
                Sign out
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full capitalize justify-start pl-0 py-0 h-auto"
                onClick={handleSignIn}
              >
                Login
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full capitalize justify-start pl-0 py-0 h-auto"
                onClick={handleSignUp}
              >
                Register
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
