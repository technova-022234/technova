import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const NavOverlay = ({ isOpen, onClose }) => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const navItemsRef = useRef(null);

    useEffect(() => {
        gsap.set(leftRef.current, { x: "-100%" });
        gsap.set(rightRef.current, { x: "100%" });

        if (isOpen) {
            openNavAnimation();
        } else {
            closeNavAnimation();
        }
    }, [isOpen]);

    const openNavAnimation = () => {
        gsap.to(leftRef.current, {
            x: "0%",
            duration: 0.8,
            ease: "power2.out",
        });

        gsap.to(rightRef.current, {
            x: "0%",
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                gsap.fromTo(
                    navItemsRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: "power2.out",
                    }
                );
            },
        });
    };

    const closeNavAnimation = () => {
        gsap.to(navItemsRef.current.children, {
            y: 30,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                gsap.to(leftRef.current, {
                    x: "-100%",
                    duration: 0.6,
                    ease: "power2.in",
                });
                gsap.to(rightRef.current, {
                    x: "100%",
                    duration: 0.6,
                    ease: "power2.in",
                });
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div
                ref={leftRef}
                className="absolute top-0 left-0 w-1/2 h-full bg-black z-0"
                style={{
                    backgroundImage: 'url("/images/image1.jpg")',
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat, no-repeat",
                    opacity: 0.9,
                }}
            ></div>

            <div
                ref={rightRef}
                className="absolute top-0 right-0 w-1/2 h-full bg-black z-0"
                style={{
                    backgroundImage: 'url("/images/image1.jpg")',
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat, no-repeat",
                    opacity: 0.9,
                }}
            ></div>

            <nav className="relative z-10">
                <ul ref={navItemsRef} className="space-y-4 text-center">
                    <li className="text-2xl text-teal-400 uppercase tracking-widest hover:text-pink-500 transition-colors cursor-pointer">
                        Story
                    </li>
                    <li className="text-2xl text-teal-400 uppercase tracking-widest hover:text-pink-500 transition-colors cursor-pointer">
                        Level 1
                    </li>
                    <li className="text-2xl text-teal-400 uppercase tracking-widest hover:text-pink-500 transition-colors cursor-pointer">
                        Level 2
                    </li>
                    <li className="text-2xl text-teal-400 uppercase tracking-widest hover:text-pink-500 transition-colors cursor-pointer">
                        Level 3
                    </li>
                </ul>
            </nav>

            <button
                onClick={onClose}
                className="absolute top-4 right-8 text-4xl text-teal-400 hover:text-pink-500 transition-colors z-20"
                aria-label="Close navigation"
            >
                &times;
            </button>
        </div>
    );
};

export default NavOverlay;
