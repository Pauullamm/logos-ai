import React, { useState } from "react";
import { useWordInspector } from "./WordInspectorContext";
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { MousePointerClick } from "lucide-react";
import Tooltip from '@mui/material/Tooltip';
import Loader from "../Loader";

const WordInspector = ({ extraClasses = "" }) => {
    const { isInspectionActive, setInspectionActive, wordDetails, setWordDetails, loading } = useWordInspector();
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
        <div
            className={`
        fixed
        ${extraClasses}
        flex flex-col bg-[#F8F3D9] shadow-xl
        bottom-0 left-0 right-0 md:static
        ${isExpanded ? "h-[40vh] md:h-full" : "h-10 md:h-full"}
        
        md:${isExpanded ? "w-70" : "w-20"}
        transition-all duration-200

      `}
        >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center transition duration-200 justify-between p-2 bg-[#F8F3D9] shadow-sm space-x-4">
                <div className="flex items-center space-x-2">
                    <h2 className="text-amber-800 font-semibold text-sm">Ask AI</h2>
                    {isExpanded && (
                        <>
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-300 text-xs text-amber-800">
                                {wordDetails ? "1" : "0"}
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {isExpanded && (
                        <Tooltip title="Select Word">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setInspectionActive(!isInspectionActive);
                                }}
                                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer 
                  ${isInspectionActive
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-red-100 text-red-800 hover:bg-red-200"
                                    }`}
                            >
                                <MousePointerClick size={20} />
                            </button>
                        </Tooltip>
                    )}
                    {/* Mobile toggle button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        className="text-amber-800 hover:text-amber-600 md:hidden pr-2"
                    >
                        {isExpanded ? (
                            <ChevronDownIcon className="w-5 h-5" />
                        ) : (
                            <ChevronUpIcon className="w-5 h-5" />
                        )}
                    </button>
                    {/* Desktop toggle button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        className="hidden md:block text-amber-800 hover:text-amber-600 pr-2"
                    >
                        {isExpanded ? (
                            <ChevronRightIcon className="w-5 h-5" />

                        ) : (
                            <ChevronLeftIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={`flex-1 bg-[#F8F3D9] overflow-y-auto transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 md:hidden"}`}>
                <div className="p-4 space-y-4">
                    
                    <div className="p-4 space-y-4 bg-[#F8F3D9]">
                        {!wordDetails && (

                            <div className="text-center py-4 text-gray-500">
                                Click to inspect a Greek word
                            </div>
                        )}
                        {loading ? <Loader /> : null}
                        {wordDetails && (
                            <div className="space-y-4 text-wrap ">
                                {wordDetails.error ? (
                                    <div className="text-red-500 p-2 bg-red-50 rounded">
                                        Error: {wordDetails.error}
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold">
                                            Analysis of: <span className="font-mono text-blue-600">{wordDetails.word}</span>
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span>Grammar Role:</span>
                                                <span className="pl-2 font-medium text-sm">{wordDetails.grammar_role}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Declension:</span>
                                                <span className="pl-2 font-medium text-sm">{wordDetails.declension}</span>
                                            </div>
                                            <div className="pt-2 border-t">
                                                <p className="italic text-gray-600">{wordDetails.translation_rationale}</p>
                                            </div>
                                            <div className="p-2 bg-blue-50 rounded">
                                                <p className="text-blue-800">{wordDetails.without_jargon}</p>
                                            </div>
                                            <div className="pt-2 border-t">
                                                <h4 className="text-sm font-semibold mb-2">Context:</h4>
                                                <p className="text-gray-600">{wordDetails.context}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setInspectionActive(!isInspectionActive);
                                                setWordDetails(null)
                                            }}
                                            className="w-full py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded cursor-pointer"
                                        >
                                            Clear Selection
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordInspector;

