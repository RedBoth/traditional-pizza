import { useEffect, useState } from "react";
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButtton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        visible && (
            <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-red-500 hover:scale-110 transition-all duration-200 z-50 cursor-pointer" aria-label="Volver arriba">
                <ArrowUp size={24} strokeWidth={3} />
            </button>
        )
    );
}