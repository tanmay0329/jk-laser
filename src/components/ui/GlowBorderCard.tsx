'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    aspectRatio?: string;
    borderRadius?: string;
    animationDuration?: number;
    gradientColors?: string[];
    borderWidth?: string;
    blurAmount?: string;
    inset?: string;
    colorPreset?: 'nature' | 'ocean' | 'sunset' | 'aurora' | 'gold' | 'custom';
    paused?: boolean;
}

// Preset gradient colors (10 colors each for smooth transitions)
const colorPresets: Record<string, string[]> = {
    nature: ['#669900', '#88bb22', '#99cc33', '#aaddaa', '#ccee66', '#006699', '#228888', '#3399cc', '#55aacc', '#669900'],
    ocean: ['#006699', '#1177aa', '#2288bb', '#3399cc', '#44aadd', '#55bbee', '#66ccff', '#44bbee', '#2299cc', '#006699'],
    sunset: ['#ff6600', '#ff7711', '#ff8822', '#ff9900', '#ffaa22', '#ffbb44', '#ffcc00', '#ff9933', '#ff7722', '#ff6600'],
    aurora: ['#00ff87', '#22ffaa', '#44ffcc', '#60efff', '#88ddff', '#bb99ff', '#dd77ee', '#ff68f0', '#ff55cc', '#00ff87'],
    gold: ['#D4AF37', '#F3E5AB', '#FFDF73', '#AA8222', '#806015', '#D4AF37', '#FFDF73', '#F3E5AB', '#AA8222', '#D4AF37'],
    custom: ['#D4AF37', '#0A0A0A', '#121212', '#F3E5AB', '#0A0A0A', '#D4AF37', '#121212', '#0A0A0A', '#F3E5AB', '#D4AF37'],
    darkCenterLightEdges: ['#F3E5AB', '#D4AF37', '#050505', '#000000', '#050505', '#D4AF37', '#F3E5AB', '#D4AF37', '#050505', '#050505'],
};

export const GlowBorderCard = React.forwardRef<HTMLDivElement, GlowBorderCardProps>(
    (
        {
            children,
            className,
            width = '100%',
            height,
            aspectRatio = 'auto',
            borderRadius = '0.75rem',
            animationDuration = 4,
            gradientColors,
            borderWidth = '2px',
            blurAmount = '4px',
            inset = '-2px',
            colorPreset = 'gold',
            paused = false,
            style,
            ...props
        },
        ref
    ) => {
        const colors = gradientColors || colorPresets[colorPreset] || colorPresets.custom;

        const colorVars: Record<string, string> = {};
        for (let i = 0; i < 10; i++) {
            colorVars[`--glow-color-${i + 1}`] = colors[i % colors.length];
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden isolate",
                    "bg-[#121212] backdrop-blur-md rounded-[inherit]",
                    className
                )}
                style={{
                    width: width,
                    height: height || 'auto',
                    aspectRatio: height ? 'unset' : aspectRatio,
                    borderRadius: borderRadius,
                    '--glow-animation-duration': `${animationDuration}s`,
                    ...colorVars,
                    ...style,
                } as React.CSSProperties}
                {...props}
            >
                <div
                    className={cn(
                        "absolute -z-10",
                        "border-solid rounded-[inherit]",
                        "glow-conic",
                        paused && "[animation-play-state:paused]"
                    )}
                    style={{
                        inset: inset,
                        borderWidth: borderWidth,
                        filter: `blur(${blurAmount})`
                    }}
                />
                <div className="relative z-10 w-full h-full bg-[#121212] m-[2px] rounded-[inherit] overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }
);

GlowBorderCard.displayName = 'GlowBorderCard';

export default GlowBorderCard;
