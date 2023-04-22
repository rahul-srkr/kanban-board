import React, { useEffect, useRef } from "react";

function Hello(props) {
    const dropdownRef = useRef();

    const handleClick = (event) => {
        if (dropdownRef && !dropdownRef.current.contains(event.target)) {
            if (props.onClose) props.onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return (
        <div ref={dropdownRef} className="min-h-[40px] min-w-[80px] w-fit h-fit absolute top-[100%] right-0 p-[10px] bg-white">
            {props.children}
        </div>
    );
}

export default Hello;

