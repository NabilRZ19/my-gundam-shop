import { usePage } from '@inertiajs/react';

export default function ProfileInfo({ onEdit }) {
    const user = usePage().props.auth.user;
    const avatarUrl = user.profile_picture 
        ? `/storage/${user.profile_picture}` 
        : `https://placehold.co/150x150/FAFAFA/4A4F5E?text=${user.name.charAt(0)}&font=montserrat`;

    return (
        <div className="profile-info-display">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-[var(--blue)]">
                    <img src={avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-[var(--dark)] mb-1">{user.name}</h2>
                    <p className="text-[var(--mid)] font-mono text-sm mb-4">@{user.username || 'pilot'}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <span className="block text-xs font-mono text-[var(--mid)] uppercase tracking-wider mb-1">Email</span>
                            <span className="text-sm font-medium">{user.email}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-mono text-[var(--mid)] uppercase tracking-wider mb-1">Phone Number</span>
                            <span className="text-sm font-medium">{user.phone_number || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center sm:justify-start border-t border-[var(--light-border)] pt-4 mt-6">
                <button onClick={onEdit} className="btn-acquire" style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}>
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
