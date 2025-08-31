import React, { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import Header from '@/components/header';
import { MapPin, Edit3, Plus, Upload, Mail, Phone, Linkedin, Save, X, Trash2, Globe } from 'lucide-react';

// Interface untuk Contact Info
interface ContactInfo {
    email?: string;
    phone?: string;
    linkedin?: string;
    website?: string;
    github?: string;
}

// Interface untuk Skill
interface Skill {
    id: number;
    name: string;
    color: string;
}

// Interface untuk Experience
interface Experience {
    id: number;
    title: string;
    company: string;
    period: string;
    current?: boolean;
}

// Interface untuk Education
interface Education {
    id: number;
    degree: string;
    institution: string;
    period: string;
}

// Interface untuk Profile
interface Profile {
    name?: string;
    role?: string;
    location?: string;
    about?: string;
    profile_image?: string;
    contact_info?: ContactInfo;
    skills?: Skill[];
    experiences?: Experience[];
    education?: Education[];
    cv_file?: string;
    cv_file_url?: string;
}

// Interface untuk Auth User
interface User {
    id: number;
    name: string;
    email: string;
}

// Interface untuk Page Props - extends Inertia PageProps
interface ProfilePageProps extends PageProps {
    auth: {
        user: User;
    };
    profile: Profile;
    availableSkills: string[];
}

export default function Profile() {
    const { auth, profile, availableSkills } = usePage<ProfilePageProps>().props;
    
    // Form untuk basic info
    const { data: basicData, setData: setBasicData, patch: updateBasic, processing: basicProcessing } = useForm({
        name: profile?.name || '',
        role: profile?.role || '',
        location: profile?.location || '',
        about: profile?.about || ''
    });

    // Form untuk contact info
    const { data: contactData, setData: setContactData, patch: updateContact, processing: contactProcessing } = useForm({
        email: profile?.contact_info?.email || '',
        phone: profile?.contact_info?.phone || '',
        linkedin: profile?.contact_info?.linkedin || '',
        website: profile?.contact_info?.website || '',
        github: profile?.contact_info?.github || ''
    });

    // Form untuk upload gambar
    const { data: imageData, setData: setImageData, post: uploadImage, processing: imageProcessing } = useForm({
        profile_image: null as File | null
    });

    // Form untuk upload CV
    const { data: cvData, setData: setCvData, post: uploadCv, processing: cvProcessing } = useForm({
        cv_file: null as File | null
    });

    // Form untuk experience
    const { data: expData, setData: setExpData, post: addExperience, processing: expProcessing, reset: resetExp } = useForm({
        title: '',
        company: '',
        period: '',
        current: false
    });

    // Form untuk education
    const { data: eduData, setData: setEduData, post: addEducation, processing: eduProcessing, reset: resetEdu } = useForm({
        degree: '',
        institution: '',
        period: ''
    });

    // Form untuk skill
    const { data: skillData, setData: setSkillData, post: addSkill, processing: skillProcessing, reset: resetSkill } = useForm({
        skill_name: ''
    });

    // Local state
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingContact, setIsEditingContact] = useState(false);
    const [showAddExperience, setShowAddExperience] = useState(false);
    const [showAddEducation, setShowAddEducation] = useState(false);
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [profileImagePreview, setProfileImagePreview] = useState(profile?.profile_image || '');

    // Skill colors
    const skillColors = [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-purple-100 text-purple-800',
        'bg-orange-100 text-orange-800',
        'bg-cyan-100 text-cyan-800',
        'bg-pink-100 text-pink-800',
        'bg-yellow-100 text-yellow-800',
        'bg-red-100 text-red-800'
    ];

    // Handlers
    const handleSaveBasicInfo = () => {
        updateBasic('/profile/basic-info', {
            onSuccess: () => {
                setIsEditing(false);
                router.reload({ only: ['profile'] });
            }
        });
    };

    const handleSaveContactInfo = () => {
        updateContact('/profile/contact-info', {
            onSuccess: () => {
                setIsEditingContact(false);
            }
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageData('profile_image', file);
            setProfileImagePreview(URL.createObjectURL(file));
            
            uploadImage('/profile/upload-image', {
                onSuccess: () => {
                    // Image uploaded successfully
                }
            });
        }
    };

    const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCvData('cv_file', file);
            uploadCv('/profile/upload-cv');
        }
    };

    const handleAddSkill = (skillName: string) => {
        setSkillData('skill_name', skillName);
        addSkill('/skills', {
            onSuccess: () => {
                resetSkill();
                setShowSkillDropdown(false);
            }
        });
    };

    const handleRemoveSkill = (skillId: number) => {
        // Using Inertia router directly for DELETE request
        router.delete(`/skills/${skillId}`);
    };

    const handleAddExperience = () => {
        addExperience('/experiences', {
            onSuccess: () => {
                resetExp();
                setShowAddExperience(false);
            }
        });
    };

    const handleRemoveExperience = (expId: number) => {
        router.delete(`/experiences/${expId}`);
    };

    const handleAddEducation = () => {
        addEducation('/education', {
            onSuccess: () => {
                resetEdu();
                setShowAddEducation(false);
            }
        });
    };

    const handleRemoveEducation = (eduId: number) => {
        router.delete(`/education/${eduId}`);
    };

    return (
        <>
            <Head title="Profil Saya" />
            <Header />
            <div
                className="min-h-screen w-full px-4"
                style={{
                    background: 'radial-gradient(circle at center, #cce0f5 0%, #ffffff 100%)',
                }}
            >
                <div className="max-w-7xl mx-auto py-8" style={{ marginTop: '50px' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Header */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                            {profileImagePreview ? (
                                                <img
                                                    src={profileImagePreview}
                                                    alt="Profile"
                                                    className="w-full h-full rounded-2xl object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                                    <span className="text-gray-500 text-sm">Photo</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2">
                                            <input
                                                type="file"
                                                id="upload-image"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={imageProcessing}
                                            />
                                            <label
                                                htmlFor="upload-image"
                                                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 shadow-lg"
                                            >
                                                <Upload className="w-4 h-4 text-white" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-1">
                                        {/* Nama */}
                                        <div className="h-10 flex items-center">
                                            {isEditing ? (
                                                <input
                                                    className="text-2xl sm:text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                                    value={basicData.name}
                                                    onChange={(e) => setBasicData('name', e.target.value)}
                                                    placeholder="Masukkan nama Anda"
                                                />
                                            ) : (
                                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                                                    {basicData.name || 'Nama Anda'}
                                                </h1>
                                            )}
                                        </div>

                                        {/* Role */}
                                        <div className="h-7 flex items-center">
                                            {isEditing ? (
                                                <input
                                                    className="text-lg text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                                    value={basicData.role}
                                                    onChange={(e) => setBasicData('role', e.target.value)}
                                                    placeholder="Posisi/Profesi Anda"
                                                />
                                            ) : (
                                                <p className="text-gray-600 text-lg truncate">
                                                    {basicData.role || 'Posisi/Profesi Anda'}
                                                </p>
                                            )}
                                        </div>

                                        {/* Lokasi */}
                                        <div className="h-6 flex items-center text-gray-500">
                                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                            {isEditing ? (
                                                <input
                                                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-500 w-full"
                                                    value={basicData.location}
                                                    onChange={(e) => setBasicData('location', e.target.value)}
                                                    placeholder="Lokasi Anda"
                                                />
                                            ) : (
                                                <span className="truncate">{basicData.location || 'Lokasi Anda'}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 w-full sm:w-auto">
                                        <button
                                            onClick={isEditing ? handleSaveBasicInfo : () => setIsEditing(true)}
                                            disabled={basicProcessing}
                                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                                        >
                                            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                            <span>{isEditing ? 'Simpan' : 'Edit Profil'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Tentang Saya</h2>
                                </div>
                                <textarea
                                    value={basicData.about}
                                    onChange={(e) => setBasicData('about', e.target.value)}
                                    placeholder="Ceritakan tentang diri Anda..."
                                    className="w-full h-32 text-gray-700 leading-relaxed resize-none border-none focus:outline-none"
                                    readOnly={!isEditing}
                                />
                            </div>

                            {/* Experience Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Pengalaman Kerja</h2>
                                    <button 
                                        onClick={() => setShowAddExperience(true)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                {profile?.experiences && profile.experiences.length > 0 && (
                                    <div className="space-y-6 mb-6">
                                        {profile.experiences.map((exp: Experience) => (
                                            <div key={exp.id} className="relative">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <div className="w-6 h-6 bg-blue-600 rounded-lg"></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                                                <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveExperience(exp.id)}
                                                                className="text-gray-400 hover:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Experience Form */}
                                {showAddExperience && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Posisi"
                                                value={expData.title}
                                                onChange={(e) => setExpData('title', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nama Perusahaan"
                                                value={expData.company}
                                                onChange={(e) => setExpData('company', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Periode (contoh: Jan 2020 - Des 2022)"
                                                value={expData.period}
                                                onChange={(e) => setExpData('period', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setShowAddExperience(false)}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    onClick={handleAddExperience}
                                                    disabled={expProcessing}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    {expProcessing ? 'Menambah...' : 'Tambah'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Education Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Pendidikan</h2>
                                    <button 
                                        onClick={() => setShowAddEducation(true)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                {profile?.education && profile.education.length > 0 && (
                                    <div className="space-y-6 mb-6">
                                        {profile.education.map((edu: Education) => (
                                            <div key={edu.id} className="relative">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <div className="w-6 h-6 bg-red-600 rounded-lg"></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                                                <p className="text-blue-600 font-medium">{edu.institution}</p>
                                                                <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveEducation(edu.id)}
                                                                className="text-gray-400 hover:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Education Form */}
                                {showAddEducation && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Gelar/Program Studi"
                                                value={eduData.degree}
                                                onChange={(e) => setEduData('degree', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nama Institusi"
                                                value={eduData.institution}
                                                onChange={(e) => setEduData('institution', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Periode (contoh: 2018 - 2022)"
                                                value={eduData.period}
                                                onChange={(e) => setEduData('period', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setShowAddEducation(false)}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    onClick={handleAddEducation}
                                                    disabled={eduProcessing}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    {eduProcessing ? 'Menambah...' : 'Tambah'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Skills Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                                    <button 
                                        onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                {profile?.skills && profile.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {profile.skills.map((skill: Skill) => (
                                            <div key={skill.id} className="relative group">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${skill.color} pr-8 cursor-pointer`}>
                                                    {skill.name}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveSkill(skill.id)}
                                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-70 group-hover:opacity-100 hover:bg-red-100 rounded-full p-0.5 transition-all duration-200"
                                                    title="Hapus skill"
                                                >
                                                    <X className="w-3 h-3 text-red-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Skills Dropdown */}
                                {showSkillDropdown && (
                                    <div className="relative">
                                        <div className="absolute top-0 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                            <div className="p-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Pilih Skills</span>
                                                    <button
                                                        onClick={() => setShowSkillDropdown(false)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                                    {availableSkills && availableSkills
                                                        .filter((skillName: string) => !profile?.skills?.some((skill: Skill) => skill.name === skillName))
                                                        .map((skillName: string) => (
                                                        <button
                                                            key={skillName}
                                                            onClick={() => handleAddSkill(skillName)}
                                                            disabled={skillProcessing}
                                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors disabled:opacity-50"
                                                        >
                                                            {skillName}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Overlay untuk menutup dropdown ketika klik di luar */}
                                        <div 
                                            className="fixed inset-0 z-5"
                                            onClick={() => setShowSkillDropdown(false)}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* CV Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">CV</h2>

                                {profile?.cv_file ? (
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-green-800 text-sm">{profile.cv_file}</span>
                                            <div className="flex items-center space-x-2">
                                                {profile.cv_file_url && (
                                                    <a
                                                        href={profile.cv_file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        // Reset CV (you might want to add a specific endpoint for this)
                                                        setCvData('cv_file', null);
                                                    }}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4">
                                            Upload CV anda disini (PDF, DOC, DOCX)
                                        </p>
                                        <input
                                            type="file"
                                            id="cv-upload"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleCvUpload}
                                            className="hidden"
                                            disabled={cvProcessing}
                                        />
                                        <label
                                            htmlFor="cv-upload"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-200 w-full cursor-pointer inline-block"
                                        >
                                            {cvProcessing ? 'Mengupload...' : 'Unggah CV'}
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Contact & Portfolio Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Kontak & Portfolio</h2>
                                    <button
                                        onClick={isEditingContact ? handleSaveContactInfo : () => setIsEditingContact(true)}
                                        disabled={contactProcessing}
                                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                                    >
                                        {isEditingContact ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                        </div>
                                        {isEditingContact ? (
                                            <input
                                                type="email"
                                                value={contactData.email}
                                                onChange={(e) => setContactData('email', e.target.value)}
                                                placeholder="Email Anda"
                                                className="flex-1 text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{contactData.email || 'Email Anda'}</span>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-4 h-4 text-green-600" />
                                        </div>
                                        {isEditingContact ? (
                                            <input
                                                type="tel"
                                                value={contactData.phone}
                                                onChange={(e) => setContactData('phone', e.target.value)}
                                                placeholder="Nomor telepon"
                                                className="flex-1 text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{contactData.phone || 'Nomor telepon'}</span>
                                        )}
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Linkedin className="w-4 h-4 text-blue-600" />
                                        </div>
                                        {isEditingContact ? (
                                            <input
                                                type="text"
                                                value={contactData.linkedin}
                                                onChange={(e) => setContactData('linkedin', e.target.value)}
                                                placeholder="LinkedIn profile"
                                                className="flex-1 text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{contactData.linkedin || 'LinkedIn profile'}</span>
                                        )}
                                    </div>

                                    {/* Website */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-purple-600" />
                                        </div>
                                        {isEditingContact ? (
                                            <input
                                                type="url"
                                                value={contactData.website}
                                                onChange={(e) => setContactData('website', e.target.value)}
                                                placeholder="Website/Portfolio"
                                                className="flex-1 text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{contactData.website || 'Website/Portfolio'}</span>
                                        )}
                                    </div>

                                    {/* GitHub */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </div>
                                        {isEditingContact ? (
                                            <input
                                                type="text"
                                                value={contactData.github}
                                                onChange={(e) => setContactData('github', e.target.value)}
                                                placeholder="GitHub profile"
                                                className="flex-1 text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{contactData.github || 'GitHub profile'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}