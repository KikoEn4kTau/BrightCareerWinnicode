import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Job related interfaces
export interface Job {
    id: number;
    position: string;
    salary: string;
    type: 'WFH' | 'Onsite' | 'Hybrid';
    status: string;
    company: string;
    city: string;
    created_at: string;
}

export interface JobFormData extends Record<string, string> {
    judul: string;
    deskripsi: string;
    kualifikasi: string;
    perusahaan: string;
    kota: string;
    tipe: string;
    tenure: string;
    gajiMinimum: string;
    gajiMaksimum: string;
    urlLogo: string;
    status: string;
}

// Page props with flash messages
export interface PageProps {
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}