"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AvatarDropdown() {
  const { data: session } = useSession();
  const getInitials = (fullName) => {
    if (!fullName) return ""; // Return empty if no name is provided
    const nameParts = fullName.trim().split(" "); // Split the name by spaces
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join(""); // Extract initials and convert to uppercase
    return initials; // Return the initials
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="Shadcn's avatar" />
            <AvatarFallback className="cursor-pointer">
              {getInitials(session?.user?.name)}
            </AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/dashboard" prefetch={false}>
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile" prefetch={false}>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" prefetch={false}>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => await signOut({ callbackUrl: "/login" })}
            >
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
