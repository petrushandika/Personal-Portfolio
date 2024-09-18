"use client";
import React from 'react';
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';

export default function VideoBackground() {
    const { theme } = useTheme();
    console.log(theme);

    return (
        <div className="w-full h-full fixed top-0 left-0 right-0 overflow-hidden">
            <video
                className={cn(
                    "absolute left-0 top-0 w-full h-full object-cover object-center transition-all duration-300",
                    theme === "dark" && "opacity-0 invisible"
                )}
                controls
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/light.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <video
                className={cn(
                    "absolute left-0 top-0 w-full h-full object-cover object-center transition-all duration-300",
                    theme === "light" && "opacity-0 invisible"
                )}
                controls
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/dark.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
