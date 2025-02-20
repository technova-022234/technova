import React, { useState } from "react";
import NavOverlay from "../components/Nav";

function NavPage() {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div>
            <NavOverlay isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
        </div>
    );
}

export default NavPage;
