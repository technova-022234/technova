import React, { useRef, useEffect } from "react";
import { AlignJustify ,X} from 'lucide-react';
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const NavOverlay = ({ isOpen, onClose }) => {
    const leftRef = useRef(null);
    const navigate=useNavigate();
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
    const items=[
        {
            level:"story",
            url:"/story"
        } ,{
            level:"level1",
            url:"/level1"
        },{
            level:"level2",
            url:"/level2"
        },{
            level:"level3",
            url:"/level3"
        }
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div
                ref={leftRef}
                className="absolute top-0 left-0 w-1/2 h-full bg-black z-0"
                style={{
                    backgroundImage: 'url("/images/Nav_Background.jpg")',
                    backgroundSize: "200%",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                }}
            ></div>

            {/* Right half: shows the right portion of the image */}
            <div
                ref={rightRef}
                className="absolute top-0 right-0 w-1/2 h-full bg-black z-0"
                style={{
                    backgroundImage: 'url("/images/Nav_Background.jpg")',
                    backgroundSize: "200%",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                }}
            ></div>

            <nav className="relative z-10">
                <ul ref={navItemsRef} className="space-y-4 text-center">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="text-2xl text-teal-400 uppercase tracking-widest hover:text-pink-500 transition-colors cursor-pointer relative inline-block px-8 py-4"
                            style={{
                                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                background: "rgba(255, 255, 255, 0.1)",
                                padding: "20px 40px",
                                display: "block",
                            }}
                            onClick={
                    () => navigate(item.url)
                    
                            }
                        >
                            {item.level}
                        </li>
                    ))}
                
                </ul>
            </nav>

            <button
                onClick={onClose}
                className="absolute top-4 right-8 text-4xl text-teal-400 hover:text-pink-500 transition-colors z-20"
                aria-label="Close navigation"
            >
                {isOpen ?  <X />: <AlignJustify />}
            </button>
        </div>
    );
};

export default NavOverlay;
