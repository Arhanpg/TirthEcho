import { jsx as _jsx } from "react/jsx-runtime";
export default function MaterialIcon({ name, filled = false, weight = 400, grade = 0, opticalSize = 24, className = '', size = 24, }) {
    const style = {
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        fontSize: size,
    };
    return (_jsx("span", { className: `material-symbols-outlined ${className}`, style: style, children: name }));
}
