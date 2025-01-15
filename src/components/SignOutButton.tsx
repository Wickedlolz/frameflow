'use client';

import { DropdownMenuItem } from './ui/dropdown-menu';
import { signOut } from '@/actions/auth';

export default function SignOutButton() {
    return (
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    );
}
