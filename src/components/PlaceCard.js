import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import MaterialIcon from '@/components/MaterialIcon';
export default function PlaceCard({ place }) {
    return (_jsxs(Link, { to: `/place/${place.id}`, className: "min-w-[280px] max-w-[280px] flex flex-col bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden hover:border-outline hover:shadow-md transition-all cursor-pointer", children: [_jsx("div", { className: "h-32 bg-surface-container bg-cover bg-center", style: {
                    backgroundImage: place.images?.[0] ? `url(${place.images[0]})` : undefined,
                } }), _jsxs("div", { className: "p-md flex flex-col gap-xs", children: [_jsx("span", { className: "font-label-caps text-label-caps text-primary", children: place.category.name }), _jsx("h3", { className: "font-h3 text-h3 text-on-surface truncate", children: place.name }), _jsxs("p", { className: "font-body-md text-body-md text-on-surface-variant flex items-center gap-xs", children: [_jsx(MaterialIcon, { name: "location_on", size: 16 }), place.address] })] })] }));
}
