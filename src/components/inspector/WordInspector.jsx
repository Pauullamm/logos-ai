// WordInspector.js
import React, { useState } from "react";
import { useWordInspector } from "./WordInspectorContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { MousePointerClick } from "lucide-react";
import Tooltip from '@mui/material/Tooltip';


const WordInspector = () => {
    const { isInspectionActive, setInspectionActive, wordDetails } = useWordInspector();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`
            fixed
            bottom-0 left-0 right-0
            md:right-0 md:left-auto md:top-0 md:w-70 md:h-screen
            transition-all duration-300
            flex flex-col
            bg-white
            shadow-xl
            border-t md:border-l
            ${isExpanded ? 'h-[50vh]' : 'h-16'}
            md:h-screen
        `}>
            {/* Header */}
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="flex items-center space-x-2">
                    <h2 className="text-white font-semibold text-sm">Ask AI</h2>
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-400 text-xs text-white">
                        {wordDetails ? "1" : "0"}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        className="md:hidden text-white hover:text-blue-100"
                    >
                        {isExpanded ? (
                            <ChevronDownIcon className="w-5 h-5" />
                        ) : (
                            <ChevronUpIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                <div className="p-4 space-y-4">
                    {!wordDetails && (

                        <div className="text-center py-4 text-gray-500">
                            Click to inspect a Greek word
                        </div>
                    )}

                    {wordDetails && (
                        <div className="space-y-4">
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
                                        onClick={() => setInspectionActive(false)}
                                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded"
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
    );
};

export default WordInspector;