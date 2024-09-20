import React from "react";
import { Ellipsis } from "react-css-spinners";
const Loading = () => {
    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-50 bg-opacity-50">
                <Ellipsis
                    color="rgba(208,2,27,1)"
                    size={116}
                />
            </div>
        </>
    );
};

export default Loading;
