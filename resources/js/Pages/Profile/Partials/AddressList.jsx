import { useState } from 'react';

export default function AddressList({ addresses = [] }) {
    const [expanded, setExpanded] = useState(false);
    
    // Fallback if no addresses
    if (addresses.length === 0) {
        return (
            <div className="p-6 text-center border border-dashed border-[var(--light-border)] bg-[var(--white)]">
                <p className="text-[var(--mid)] font-mono text-sm mb-4">No transmission coordinates found.</p>
                <button className="btn-acquire" style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}>+ Add Address</button>
            </div>
        );
    }

    const primaryAddress = addresses.find(a => a.is_primary) || addresses[0];
    const otherAddresses = addresses.filter(a => a.id !== primaryAddress.id);

    return (
        <div className="address-section">
            <h3 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Active Coordinates</h3>
            
            {/* Primary Address Card */}
            <div 
                className="address-card primary p-4 mb-4 border border-[var(--blue)] bg-[#EEF4FF] cursor-pointer relative"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="absolute top-0 right-0 bg-[var(--blue)] text-white text-[0.65rem] font-mono px-2 py-1 uppercase">Primary</div>
                <h4 className="font-bold text-[var(--dark)] mb-1">{primaryAddress.address_name}</h4>
                <p className="text-sm text-[var(--mid)] leading-relaxed">{primaryAddress.full_address}</p>
                <p className="text-sm text-[var(--mid)]">{primaryAddress.city}, {primaryAddress.postal_code}</p>
                
                {otherAddresses.length > 0 && (
                    <div className="mt-3 text-xs font-mono text-[var(--blue)] font-bold">
                        {expanded ? '▲ Hide Saved Addresses' : `▼ View ${otherAddresses.length} Other Saved Addresses`}
                    </div>
                )}
            </div>

            {/* Other Addresses */}
            {expanded && otherAddresses.length > 0 && (
                <div className="other-addresses space-y-3 mt-4 pt-4 border-t border-[var(--light-border)]">
                    <h4 className="text-xs font-mono text-[var(--mid)] uppercase tracking-wider mb-2">Other Saved Addresses</h4>
                    {otherAddresses.map(addr => (
                        <div key={addr.id} className="address-card p-4 border border-[var(--light-border)] bg-[var(--white)] hover:border-[var(--blue)] transition-colors">
                            <h4 className="font-bold text-[var(--dark)] mb-1">{addr.address_name}</h4>
                            <p className="text-sm text-[var(--mid)] leading-relaxed">{addr.full_address}</p>
                            <p className="text-sm text-[var(--mid)]">{addr.city}, {addr.postal_code}</p>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="mt-6">
                <button className="auth-link border-none bg-transparent underline cursor-pointer">+ Add New Address</button>
            </div>
        </div>
    );
}
