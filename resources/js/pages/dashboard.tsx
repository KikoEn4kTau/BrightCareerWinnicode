import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="bg-white flex min-h-svh flex-col items-start justify-start gap-6 p-6 md:p-10">
            <Head title="Dashboard" />
            <header className="bg-white shadow-md w-full h-[70px] fixed top-[0px] left-[0px] right-[0px] z-50 md:p-5">

            </header>
        </div>
    )
}

// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//     },
// ];

// export default function Dashboard() {
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Dashboard" />
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
//                 <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                 </div>
//                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
//                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }
