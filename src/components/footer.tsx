import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";
import { useState, useRef } from "react";

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    return (
        <footer className="flex justify-between bg-gray-800 text-white py-4 relative">
            {/* Footer Text */}
            <div className="text-center pl-5 text-[#535BF1]">
                <p>© 2025 Morales-Tech.</p>
                <p>All rights reserved.</p>
            </div>

            {/* Social Icons */}
            <div className="text-center pr-7 flex gap-4 items-center">
                {/* Other Sites */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <a
                        className="flex items-center cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGlobe className="size-5 transition-all duration-300 ease-in-out hover:size-6" />
                    </a>

                    {/* Other Sites Preview */}
                    {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-auto p-4 bg-gray-300 border border-gray-600 rounded-lg shadow-lg z-20">
                            <div className="flex gap-4">
                                <div className="cursor-pointer relative w-20 h-20 bg-gray-600 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-110 group">
                                    <a
                                        href="https://morales-tech.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                    >
                                        <img
                                            src="/main-site.webp"
                                            alt="Site Preview"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </a>
                                    <span className="pointer-events-none absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 w-auto text-xs text-gray-800 bg-gradient-to-t from-gray-200 to-gray-300 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                        Portfolio
                                    </span>
                                </div>
                                <div className="cursor-pointer relative w-20 h-20 bg-gray-600 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-110 group">
                                    <a
                                        href="https://api-showcase-service-375408723194.us-central1.run.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                    >
                                        <img
                                            src="/api-showcase.webp"
                                            alt="Site Preview"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </a>
                                    <span className="pointer-events-none absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 w-auto text-xs text-gray-800 bg-gradient-to-t from-gray-200 to-gray-300 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                        API-Showcase
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <a
                    href="https://github.com/Gsus-tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <FiGithub className="size-5 transition-all duration-300 ease-in-out hover:size-6" />
                </a>
                <a
                    href="https://www.linkedin.com/in/jesus-morales-villar-0777a3242/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <FiLinkedin className="size-5 transition-all duration-300 ease-in-out hover:size-6" />
                </a>
            </div>
        </footer>
    );
}
