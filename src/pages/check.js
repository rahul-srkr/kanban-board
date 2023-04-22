import React, { useState } from "react";
import Hello from "@/components/Hello";

function App() {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="">
            <div className="">
                <div className="relative">
                    <button onClick={(e) => {
                        e.stopPropagation()
                        setShowDropdown(true)
                    }}>Dropdown</button>
                    {showDropdown && (
                        <Hello onClose={() => setShowDropdown(false)}>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                        </Hello>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
