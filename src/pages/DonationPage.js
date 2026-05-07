import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { donationService } from '@/services/api';
import MaterialIcon from '@/components/MaterialIcon';
export default function DonationPage() {
    const [tiers, setTiers] = useState([]);
    const [selectedTier, setSelectedTier] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTiers = async () => {
            try {
                const data = await donationService.getDonationTiers();
                setTiers(data);
            }
            catch (error) {
                console.error('Failed to fetch donation tiers:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTiers();
    }, []);
    const handleDonate = async (tierId) => {
        const amount = customAmount ? parseFloat(customAmount) : undefined;
        // TODO: Implement payment flow
        console.log('Donate', tierId || 'custom', amount);
    };
    return (_jsxs("div", { className: "w-full", children: [_jsx("section", { className: "bg-primary-container border-b border-outline-variant py-xl", children: _jsxs("div", { className: "max-w-4xl mx-auto px-lg text-center", children: [_jsx("h1", { className: "font-h1 text-h1 text-on-surface mb-md", children: "Support Our Mission" }), _jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant", children: "Your contributions help us preserve and share Jain heritage with the world. Every donation makes a difference." })] }) }), _jsxs("main", { className: "max-w-7xl mx-auto px-lg py-xl", children: [_jsxs("section", { className: "mb-xl", children: [_jsx("h2", { className: "font-h2 text-h2 text-on-surface mb-lg", children: "Choose Your Support Level" }), loading ? (_jsx("div", { className: "text-center py-xl", children: _jsx("p", { className: "text-on-surface-variant", children: "Loading donation options..." }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-md", children: tiers.map((tier) => (_jsx("div", { onClick: () => {
                                        setSelectedTier(tier.id);
                                        setCustomAmount('');
                                    }, className: `rounded-xl overflow-hidden cursor-pointer transition-all ${selectedTier === tier.id
                                        ? 'ring-2 ring-primary bg-primary-container border border-primary'
                                        : 'border border-outline-variant hover:border-outline-variant'} bg-surface-container-lowest`, children: _jsxs("div", { className: "p-lg flex flex-col gap-md h-full", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-h3 text-h3 text-on-surface mb-sm", children: tier.name }), _jsxs("p", { className: "font-h2 text-h2 text-primary", children: ["\u20B9", tier.amount] })] }), _jsx("p", { className: "font-body-md text-body-md text-on-surface-variant flex-1", children: tier.description }), _jsx("div", { className: "space-y-sm border-t border-outline-variant pt-md", children: tier.benefits.map((benefit) => (_jsxs("div", { className: "flex items-start gap-sm", children: [_jsx(MaterialIcon, { name: "check", size: 16, className: "text-primary mt-1 flex-shrink-0" }), _jsx("span", { className: "font-body-md text-body-md text-on-surface", children: benefit })] }, benefit))) }), _jsx("button", { onClick: () => handleDonate(tier.id), className: `w-full py-sm rounded font-label-sm text-label-sm transition-colors ${selectedTier === tier.id
                                                    ? 'bg-primary text-on-primary hover:bg-primary-fixed'
                                                    : 'border border-primary text-primary hover:bg-primary-container'}`, children: "Select" })] }) }, tier.id))) }))] }), _jsxs("section", { className: "mb-xl", children: [_jsx("h2", { className: "font-h2 text-h2 text-on-surface mb-lg", children: "Custom Amount" }), _jsxs("div", { className: "bg-surface-container-lowest border border-outline-variant rounded-xl p-lg max-w-md", children: [_jsxs("div", { className: "mb-md", children: [_jsx("label", { className: "font-label-sm text-label-sm text-on-surface-variant mb-xs block", children: "Enter Amount (\u20B9)" }), _jsx("input", { type: "number", placeholder: "Enter custom amount", value: customAmount, onChange: (e) => {
                                                    setCustomAmount(e.target.value);
                                                    setSelectedTier(null);
                                                }, className: "input-base" })] }), _jsxs("button", { onClick: () => handleDonate(), disabled: !customAmount, className: "w-full btn-primary disabled:opacity-50", children: ["Donate \u20B9", customAmount || '0'] })] })] }), _jsxs("section", { className: "bg-surface-bright border border-outline-variant rounded-xl p-lg", children: [_jsx("h2", { className: "font-h2 text-h2 text-on-surface mb-lg", children: "Your Impact" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-md", children: [
                                    { label: 'Places Documented', value: '1,200+', icon: 'location_on' },
                                    { label: 'Community Members', value: '50,000+', icon: 'people' },
                                    { label: 'Countries Reached', value: '25+', icon: 'public' },
                                ].map((stat) => (_jsxs("div", { className: "flex flex-col items-center text-center gap-sm p-md", children: [_jsx("div", { className: "p-md bg-primary-container rounded-lg text-primary text-2xl", children: _jsx(MaterialIcon, { name: stat.icon, size: 24 }) }), _jsx("p", { className: "font-h2 text-h2 text-primary", children: stat.value }), _jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: stat.label })] }, stat.label))) })] })] })] }));
}
