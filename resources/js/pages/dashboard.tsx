import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="bg-white flex w-full h-[3833px] flex-col items-start justify-start">
            <Head title="Dashboard" />
            <header className="bg-white shadow-md w-full h-[70px] fixed top-[0px] left-[0px] right-[0px] z-50 md:p-5">
                <nav className="flex h-[70px] w-full items-start fixed top-[0px] left-[0px] flex items-start justify-start gap-4 shadow-md">
                    <img src="bright.svg" alt="Logo Perusahaan"></img>
                    <Link className="text-base text-db font-semibold hover:text-lb/90 fixed top-[24px] left-[168px]" href="/profil">
                        Profil Saya
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90 fixed top-[24px] left-[273px]" href="/profil">
                        Untuk Perusahaan
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90 fixed top-[24px] left-[439px]" href="/profil">
                        Cari Pekerjaan
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90 fixed top-[24px] left-[575px]" href="/profil">
                        Komunitas
                    </Link>
                    <Link
                        href='/settings/profile'
                        className="rounded-xl border border-3 border-db px-5 py-1.5 fixed top-[17px] right-[50px] text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                    >
                         Profil
                    </Link>
                </nav>
            </header>
            <main>
                {/* gambar background */}
                <div className="flex w-full h-full overflow-hidden absolute top-[68px] left-[0px] flex-col">
                    <img src="bg-blue2.svg" alt="Logo Perusahaan"></img>
                </div>
                {/* gambar orang */}
                <div className="flex w-[500px] h-[641px]  absolute top-[68px] right-[0px] flex-col">
                    <img
                        src="orang.svg"
                        alt="Logo Perusahaan"
                        className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_50%)]"></img>
                </div>
                {/* searchbar */}
                <div className="flex items-center bg-white w-[686px] h-[69px] absolute top-[509px] left-[50px] shadow-xl rounded-md px-4 gap-4">
                    {/* Ikon Search */}
                    <div className="w-[19px] h-[19px]">
                        <img src="Search.svg" alt="Search" />
                    </div>

                    {/* Input 1 */}
                    <input
                        type="text"
                        className="w-[220px] h-[34px] p-2 bg-white text-muted rounded-md border-2"
                        placeholder="Cari posisi"
                    />

                    {/* Ikon Location */}
                    <div className="w-[19px] h-[19px]">
                        <img src="Location.svg" alt="Location" />
                    </div>

                    {/* Input 2 */}
                    <input
                        type="text"
                        className="w-[220px] h-[34px] p-2 bg-white text-muted rounded-md border-2"
                        placeholder="Lokasi"
                    />
                    {/* tombol */}
                    <div className="flex bg-db w-[140px] h-[40px] rounded hover:bg-lb">
                        <button className="text-white px-4 py-2 rounded absolute left-[577px] ">
                            Cari
                        </button>
                    </div>
                </div>  
                {/* temukan lowongan               */}
                <div className="flex text-2xl font-semibold absolute top-[821px] left-1/2 -translate-x-1/2 gap-x-[7px] ">
                    <div className="flex text-db">
                        Temukan Lowongan Dari
                    </div>
                    <div className="flex text-lb">
                        Ratusan
                    </div>
                    <div className="flex text-db">
                        Perusahaan yang Terdaftar
                    </div>
                </div>
                {/* gambar perusahaan terdaftar */}
                <div className="flex w-full h-full overflow-hidden absolute top-[914px]  flex-col">
                    <img src="Perusahaan.svg" alt="Partner Perusahaan"></img>
                </div>
                {/* mengapa memilih */}
                <div className="flex text-2xl font-semibold absolute top-[1075px] left-1/2 -translate-x-1/2 gap-x-[7px]">
                    <div className="flex text-db">
                        Mengapa Memilih
                    </div>
                    <div className="flex text-lb">
                        Bright
                    </div>
                    <div className="flex text-db">
                        Career ?
                    </div>
                </div>
                {/* gambar kelebihan */}
                <div className="flex w-[1306px] h-full overflow-hidden absolute top-[1200px] left-1/2 -translate-x-1/2 flex-col">
                    <img src="Plus.svg" alt="Kelebihan"></img>
                </div>
                {/* jelajahi perusahaan */}
                <div className="flex text-2xl text-db font-semibold absolute top-[1442px] left-1/2 -translate-x-1/2">
                    Jelajahi Perusahaan
                </div>
            </main>
        </div>
    );
}


//<button className="bg-lb text-white px-4 py-2 rounded hover:bg-lb/90">
//Kirim
//</button>

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
