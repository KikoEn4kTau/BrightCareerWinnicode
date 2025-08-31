import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/header';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, UserPlus } from 'lucide-react';

export default function Profile() {
    const { auth } = usePage().props;

    return (
        <>
      <Head title="Community" />
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-[50px]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Sidebar - Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-6 pb-6 -mt-10 relative">
                  <div className="flex flex-col items-center">
                    <img 
                      src="profile.svg" 
                      alt="Lisa Felicia" 
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <h3 className="mt-4 text-xl font-bold text-gray-900">Lisa Felicia</h3>
                    <p className="text-gray-600 text-sm">Software Engineer</p>
                    
                    <div className="flex justify-between w-full mt-6 px-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">245</div>
                        <div className="text-xs text-gray-600">Diikuti</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">1.2k</div>
                        <div className="text-xs text-gray-600">Pengikut</div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                      Buat Post
                    </button>
                    
                    <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                      Edit Profil
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Posts Feed */}
            <div className="lg:col-span-2">
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6">
                <button className="px-6 py-2 bg-slate-700 text-white rounded-full font-medium">
                  Terbaru
                </button>
                <button className="px-6 py-2 bg-white text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Populer
                </button>
                <button className="px-6 py-2 bg-white text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Diikuti
                </button>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" 
                        alt="Sarah Mitchell" 
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Sarah Mitchell</h4>
                        <p className="text-sm text-gray-600">Product Designer • 2h ago</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Just wrapped up an amazing interview at Google! Here are some tips that helped me prepare...
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span className="text-sm">124</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-sm">28</span>
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                        alt="Mark Thompson" 
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Mark Thompson</h4>
                        <p className="text-sm text-gray-600">Senior Developer • 5h ago</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Looking for React developers to join our growing team. Remote work available!
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span className="text-sm">89</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-sm">15</span>
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Popular Topics */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  <button className="block w-full text-left text-blue-600 hover:text-blue-800 transition-colors">
                    #TechCareers
                  </button>
                  <button className="block w-full text-left text-blue-600 hover:text-blue-800 transition-colors">
                    #RemoteWork
                  </button>
                  <button className="block w-full text-left text-blue-600 hover:text-blue-800 transition-colors">
                    #InterviewTips
                  </button>
                  <button className="block w-full text-left text-blue-600 hover:text-blue-800 transition-colors">
                    #CareerAdvice
                  </button>
                </div>
              </div>

              {/* Suggested Connections */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Disarankan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" 
                        alt="Emma Wilson" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Emma Wilson</h4>
                        <p className="text-xs text-gray-600">UI/UX Designer</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <UserPlus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                        alt="David Chen" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">David Chen</h4>
                        <p className="text-xs text-gray-600">Full Stack Developer</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <UserPlus size={16} />
                    </button>
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