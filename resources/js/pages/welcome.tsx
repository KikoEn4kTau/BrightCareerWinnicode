import { useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const companies = [
        {
            name: 'Shopee',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'shopee.svg',
        },
        {
            name: 'Grab',
            rating: 4.1,
            reviews: 72,
            jobs: 103,
            logo: 'grab.svg',
        },
        {
            name: 'Traveloka',
            rating: 3.7,
            reviews: 63,
            jobs: 27,
            logo: 'traveloka.svg',
        },
        {
            name: 'Apple',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'apple.svg',
        },
        {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
        {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
        {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
         {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
         {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
         {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
          {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
          {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
          {
            name: 'Bank Indonesia',
            rating: 4.7,
            reviews: 53,
            jobs: 53,
            logo: 'bi.svg',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Responsive cards per slide
const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) return 1;     // mobile
        if (window.innerWidth < 1024) return 2;    // tablet
        if (window.innerWidth < 1280) return 3;    // small desktop
        if (window.innerWidth < 1536) return 4;    // large desktop
        return 5;                                  // extra large screen
    }
    return 3; // default
};
    
    const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());
    const totalSlides = Math.ceil(companies.length / cardsPerSlide);

    // Update cards per slide on window resize
    useState(() => {
        const handleResize = () => {
            setCardsPerSlide(getCardsPerSlide());
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    });

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="bg-white flex w-full min-h-screen flex-col items-start justify-start">
            <Head title="Dashboard" />
            
            {/* Header - Responsive */}
            <header className="bg-white shadow-md w-full h-16 md:h-[70px] fixed top-0 left-0 right-0 z-50">
                <nav className="flex h-full w-full items-center justify-between px-4 md:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img src="bright.svg" alt="Logo Perusahaan" className="h-8 md:h-10" />
                    </div>
                    
                    {/* Navigation Links - Hidden on mobile */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link className="text-base text-db font-semibold hover:text-lb/90" href="/profil">
                            Profil Saya
                        </Link>
                        <Link className="text-base text-db font-semibold hover:text-lb/90" href="/profil">
                            Untuk Perusahaan
                        </Link>
                        <Link className="text-base text-db font-semibold hover:text-lb/90" href="/profil">
                            Cari Pekerjaan
                        </Link>
                        <Link className="text-base text-db font-semibold hover:text-lb/90" href="/profil">
                            Komunitas
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {auth.user ? (
                            <Link
                                href='/settings/profile'
                                className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                            >
                                Profil
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="w-full pt-16 md:pt-[70px]">
                {/* Hero Section */}
                <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="bg-blue2.svg" 
                            alt="Background" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Person Image */}
                    <div className="absolute right-0 top-0 w-1/2 md:w-2/5 lg:w-1/3 h-full z-10">
                        <img
                            src="orang.svg"
                            alt="Person"
                            className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                        />
                    </div>
                    
                    {/* Search Bar */}
                    <div className="absolute bottom-8 md:bottom-16 left-4 md:left-8 lg:left-12 right-4 md:right-auto z-20">
                        <div className="bg-white rounded-md shadow-xl p-4 max-w-2xl">
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                {/* Position Search */}
                                <div className="flex items-center gap-2 flex-1 w-full md:w-auto">
                                    <img src="Search.svg" alt="Search" className="w-5 h-5 flex-shrink-0" />
                                    <input
                                        type="text"
                                        className="flex-1 p-2 bg-white text-muted rounded-md border-2 min-w-0"
                                        placeholder="Cari posisi"
                                    />
                                </div>
                                
                                {/* Location Search */}
                                <div className="flex items-center gap-2 flex-1 w-full md:w-auto">
                                    <img src="Location.svg" alt="Location" className="w-5 h-5 flex-shrink-0" />
                                    <input
                                        type="text"
                                        className="flex-1 p-2 bg-white text-muted rounded-md border-2 min-w-0"
                                        placeholder="Lokasi"
                                    />
                                </div>
                                
                                {/* Search Button */}
                                <button className="bg-db hover:bg-lb text-white px-6 py-2 rounded w-full md:w-auto transition-colors duration-200">
                                    Cari
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    {/* Title */}
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            <span className="text-db">Temukan Lowongan Dari</span>{' '}
                            <span className="text-lb">Ratusan</span>{' '}
                            <span className="text-db">Perusahaan yang Terdaftar</span>
                        </h2>
                    </div>
                    
                    {/* Company Logos */}
                    <div className="mb-12 md:mb-16 px-4">
                        <div className="max-w-6xl mx-auto">
                            <img 
                                src="Perusahaan.svg" 
                                alt="Partner Perusahaan" 
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </section>

                {/* Why Choose Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    {/* Title */}
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            <span className="text-db">Mengapa Memilih</span>{' '}
                            <span className="text-lb">Bright</span>{' '}
                            <span className="text-db">Career ?</span>
                        </h2>
                    </div>
                    
                    {/* Advantages */}
                    <div className="px-4">
                        <div className="max-w-6xl mx-auto">
                            <img 
                                src="Plus.svg" 
                                alt="Kelebihan" 
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </section>

                {/* Explore Companies Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    {/* Title */}
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-db">
                            Jelajahi Perusahaan
                        </h2>
                    </div>

                    {/* Company Carousel */}
                    <div className="px-4">
                        <div className="max-w-6xl mx-auto">
                            {/* Cards Container */}
                           <div className="flex justify-center mb-6 overflow-hidden">
                                <div className="flex gap-4 flex-nowrap px-4 md:px-6">
                                    {companies
                                        .slice(currentSlide * cardsPerSlide, (currentSlide + 1) * cardsPerSlide)
                                        .map((company, index) => (
                                           <div
                                                 key={index}
                                                 className="w-[200px] border border-db rounded-xl p-4 md:p-6 text-center shadow hover:shadow-lg transition-all duration-300 bg-white"
                                                >

                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="mx-auto max-w-[100px] max-h-[41px] h-auto mb-3"
                                                />
                                                <div className="font-semibold text-db mb-2">{company.name}</div>
                                                <div className="text-sm text-gray-600 flex justify-center items-center gap-1 mb-3">
                                                    <img
                                                        src="star.svg"
                                                        alt="star"
                                                        className="w-[14px] h-[14px]"
                                                    />
                                                    {company.rating} • {company.reviews} Ulasan
                                                </div>
                                                <button className="bg-blue-100 text-db font-bold text-sm px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200">
                                                    {company.jobs} Pekerjaan
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            {totalSlides > 1 && (
                                <div className="flex items-center justify-center gap-4 md:gap-6">
                                    <button
                                        onClick={handlePrev}
                                        className="text-xl text-db md:text-2xl font-bold px-3 py-2 md:px-4 hover:text-lb transition-colors duration-200"
                                        aria-label="Previous slide"
                                    >
                                        &#8249;
                                    </button>
                                    
                                    {/* Dots Indicator */}
                                    <div className="flex gap-2">
                                        {Array.from({ length: totalSlides }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                    i === currentSlide ? 'bg-db' : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={handleNext}
                                        className="text-xl text-db md:text-2xl font-bold px-3 py-2 md:px-4 hover:text-lb transition-colors duration-200"
                                        aria-label="Next slide"
                                    >
                                        &#8250;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                {/* Testimonial Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    {/* Title */}
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            <span className="text-db">Apa Kata Mereka Setelah Menggunakan</span>{' '}
                            <span className="text-lb">Bright</span>
                            <span className="text-db">Career?</span>
                        </h2>
                    </div>

                    {/* Testimonials */}
                    <div className="px-4">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* First Testimonial */}
                            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
                                <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                                    "Saya sangat merekomendasikan Bright Career. Banyak pilihan lowongan pekerjaan dari perusahaan ternama."
                                </p>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-db text-lg">Dewi Kartika</h4>
                                    <p className="text-gray-600 text-sm">Junior Mechanical Engineer, PT Astra International Tbk</p>
                                </div>
                            </div>

                            {/* Second Testimonial */}
                            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
                                <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                                    "Berkat Bright Career, saya berhasil mendapatkan pekerjaan impian saya hanya dalam beberapa hari! Platform ini sangat mudah digunakan dan penuh dengan peluang menarik."
                                </p>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-db text-lg">Rahmat Hidayat</h4>
                                    <p className="text-gray-600 text-sm">Junior Software Engineer, PT Astra International Tbk</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    {/* Title */}
                    <div className="text-center mb-12 md:mb-16 px-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            <span className="text-db">Cara Kerja</span>{' '}
                            <span className="text-lb">Bright</span>
                            <span className="text-db">Career</span>
                        </h2>
                    </div>

                    {/* Steps Flow */}
                    <div className="px-4">
                        <div className="max-w-6xl mx-auto">
                            {/* Desktop Flow */}
                            <div className="hidden lg:block">
                                <div className="flex items-center justify-between relative">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center text-center w-48">
                                        <div className="w-16 h-16 bg-white border-2 border-lb rounded-full flex items-center justify-center mb-4 shadow-md">
                                            <svg className="w-8 h-8 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-db text-lg mb-2">Buat Akun</h3>
                                    </div>

                                    {/* Arrow 1 */}
                                    <div className="flex-1 flex justify-center items-center relative">
                                        <div className="w-full h-px bg-gray-300 relative">
                                            <div className="absolute right-0 top-0 w-2 h-2 bg-gray-300 transform rotate-45 -translate-y-1/2"></div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center text-center w-48">
                                        <div className="w-16 h-16 bg-white border-2 border-lb rounded-full flex items-center justify-center mb-4 shadow-md">
                                            <svg className="w-8 h-8 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-db text-lg mb-2">Upload CV / Resume</h3>
                                    </div>

                                    {/* Arrow 2 */}
                                    <div className="flex-1 flex justify-center items-center relative">
                                        <div className="w-full h-px bg-gray-300 relative">
                                            <div className="absolute right-0 top-0 w-2 h-2 bg-gray-300 transform rotate-45 -translate-y-1/2"></div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center text-center w-48">
                                        <div className="w-16 h-16 bg-white border-2 border-lb rounded-full flex items-center justify-center mb-4 shadow-md">
                                            <svg className="w-8 h-8 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-db text-lg mb-2">Cari Lowongan</h3>
                                        <p className="text-sm text-gray-600">Pekerjaan yang Sesuai</p>
                                    </div>

                                    {/* Arrow 3 */}
                                    <div className="flex-1 flex justify-center items-center relative">
                                        <div className="w-full h-px bg-gray-300 relative">
                                            <div className="absolute right-0 top-0 w-2 h-2 bg-gray-300 transform rotate-45 -translate-y-1/2"></div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex flex-col items-center text-center w-48">
                                        <div className="w-16 h-16 bg-white border-2 border-lb rounded-full flex items-center justify-center mb-4 shadow-md">
                                            <svg className="w-8 h-8 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-db text-lg mb-2">Lamar Pekerjaan</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile/Tablet Flow */}
                            <div className="lg:hidden">
                                <div className="space-y-8">
                                    {/* Step 1 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border-2 border-lb rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                            <svg className="w-6 h-6 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-db text-lg mt-500">Buat Akun</h3>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border-2 border-lb rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                            <svg className="w-6 h-6 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-db text-lg">Upload CV / Resume</h3>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border-2 border-lb rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                            <svg className="w-6 h-6 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-db text-lg">Cari Lowongan</h3>
                                            <p className="text-sm text-gray-600">Pekerjaan yang Sesuai</p>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border-2 border-lb rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                            <svg className="w-6 h-6 text-lb" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-db text-lg">Lamar Pekerjaan</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Call to Action Section */}
                <section className="py-12 md:py-16 lg:py-20">
                    <div className="px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                {/* Job Seeker Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                        <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                                    </div>
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 relative z-10">
                                        <img 
                                            src="koper.svg" 
                                            alt="Job Seeker Icon"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-xl md:text-2xl font-bold mb-4">
                                            Anda sedang mencari pekerjaan?
                                        </h3>
                                        <p className="text-blue-100 mb-6 text-sm md:text-base leading-relaxed">
                                            Masuk sekarang untuk mendapatkan akses penuh ke BrightCareer. Cari lowongan pekerjaan Anda dan temukan pekerjaan impian anda bersama kami !
                                        </p>
                                        <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors duration-200 text-sm md:text-base">
                                            Cari Pekerjaan →
                                        </button>
                                    </div>
                                </div>

                                {/* Employer Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                        <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                                    </div>
                                    
                                    {/* Icon - Ganti dengan gambar Anda */}
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 relative z-10">
                                        {/* GANTI src dengan path gambar Anda sendiri */}
                                        <img 
                                            src="corpo.svg" 
                                            alt="Employer Icon"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-xl md:text-2xl font-bold mb-4">
                                            Anda sedang mencari talenta baru untuk perusahaan anda?
                                        </h3>
                                        <p className="text-blue-100 mb-6 text-sm md:text-base leading-relaxed">
                                            Masuk sekarang untuk mendapatkan akses penuh ke BrightCareer. Cari lowongan pekerjaan Anda dan temukan pekerjaan impian anda bersama kami !
                                        </p>
                                        <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors duration-200 text-sm md:text-base">
                                            Gabung Sekarang →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-db text-white py-12 md:py-16 w-full">
                <div className="w-full max-w-full px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Logo Section */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="w-25 h-25 bg-white rounded-full flex items-center justify-center">
                                    <img 
                                        src="bright.svg" 
                                        alt="Logo" 
                                        className="w-20 h-20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">RESOURCES</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        BrightCareer BLOG
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">SOCIAL MEDIA</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        FACEBOOK
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        INSTAGRAM
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        TWITTER
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        LINKED IN
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">LEGAL</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        PRIVACY & POLICY
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        TERMS & CONDITION
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-600 pt-8">
                        <p className="text-gray-400 text-sm">
                            © 2024 BrightCareer All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
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
