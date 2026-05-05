import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ProfileInfo from './Partials/ProfileInfo';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import AddressList from './Partials/AddressList';
import MyComments from './Partials/MyComments';

export default function Edit({ mustVerifyEmail, status, addresses, comments }) {
    const [activeTab, setActiveTab] = useState('profile'); // profile, addresses, comments
    const [isEditing, setIsEditing] = useState(false);

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* SIDEBAR TABS */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-white border border-[var(--light-border)] sticky top-24">
                            <div className="p-4 border-b border-[var(--light-border)] bg-[#FAFAFA]">
                                <h3 className="font-bold text-[var(--dark)] uppercase tracking-widest text-sm">Command Center</h3>
                            </div>
                            <nav className="flex flex-col">
                                <button 
                                    className={`text-left px-5 py-4 font-mono text-sm uppercase tracking-wider transition-colors border-l-2 ${activeTab === 'profile' ? 'border-[var(--blue)] bg-[#EEF4FF] text-[var(--blue)] font-bold' : 'border-transparent text-[var(--mid)] hover:bg-gray-50'}`}
                                    onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
                                >
                                    Personnel Data
                                </button>
                                <button 
                                    className={`text-left px-5 py-4 font-mono text-sm uppercase tracking-wider transition-colors border-l-2 ${activeTab === 'addresses' ? 'border-[var(--blue)] bg-[#EEF4FF] text-[var(--blue)] font-bold' : 'border-transparent text-[var(--mid)] hover:bg-gray-50'}`}
                                    onClick={() => setActiveTab('addresses')}
                                >
                                    Coordinates
                                </button>
                                <button 
                                    className={`text-left px-5 py-4 font-mono text-sm uppercase tracking-wider transition-colors border-l-2 ${activeTab === 'comments' ? 'border-[var(--blue)] bg-[#EEF4FF] text-[var(--blue)] font-bold' : 'border-transparent text-[var(--mid)] hover:bg-gray-50'}`}
                                    onClick={() => setActiveTab('comments')}
                                >
                                    Comms Log
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1">
                        
                        {/* TAB: PROFILE */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 shadow-sm border border-[var(--light-border)] relative">
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--blue)] -mt-[1px] -mr-[1px]" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--blue)] -mb-[1px] -ml-[1px]" />
                                    
                                    {!isEditing ? (
                                        <ProfileInfo onEdit={() => setIsEditing(true)} />
                                    ) : (
                                        <div>
                                            <button 
                                                onClick={() => setIsEditing(false)}
                                                className="mb-4 text-sm font-mono text-[var(--mid)] hover:text-[var(--blue)] flex items-center"
                                            >
                                                ← Back to Overview
                                            </button>
                                            <UpdateProfileInformationForm
                                                mustVerifyEmail={mustVerifyEmail}
                                                status={status}
                                                className="max-w-xl"
                                            />
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <>
                                        <div className="bg-white p-6 shadow-sm border border-[var(--light-border)]">
                                            <UpdatePasswordForm className="max-w-xl" />
                                        </div>
                                        <div className="bg-white p-6 shadow-sm border border-[var(--light-border)]">
                                            <DeleteUserForm className="max-w-xl" />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* TAB: ADDRESSES */}
                        {activeTab === 'addresses' && (
                            <div className="bg-white p-6 shadow-sm border border-[var(--light-border)] relative min-h-[400px]">
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--blue)] -mt-[1px] -mr-[1px]" />
                                <AddressList addresses={addresses} />
                            </div>
                        )}

                        {/* TAB: COMMENTS */}
                        {activeTab === 'comments' && (
                            <div className="bg-white p-6 shadow-sm border border-[var(--light-border)] relative min-h-[400px]">
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--blue)] -mt-[1px] -mr-[1px]" />
                                <MyComments comments={comments} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
