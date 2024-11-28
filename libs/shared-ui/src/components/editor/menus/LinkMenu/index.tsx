'use client';
import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';
import { Button } from '@shared/ui';
import { Copy, Globe } from 'lucide-react';
import { toast } from 'sonner';

type LinkMenuProps = {
    editor: Editor;
};

const LIVE_TIME = 300;

export const LinkMenu = ({ editor }: LinkMenuProps) => {
    const [mounted, setMounted] = useState(false);
    const [linkHover, setLinkHover] = useState<null | HTMLAnchorElement>(null);
    const [isEdit, setEdit] = useState(false);

    const bubbleHoverRef = useRef<boolean>(false);
    const timeOutRef = useRef<NodeJS.Timeout | null>(null);

    // Ensure component is mounted client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    const shoudlShow = () => {
        return !!linkHover;
    };

    const shouldShowEditor = () => {
        return editor.isActive('link');
    };

    const { floatingStyles, refs } = useFloating({
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
        placement: 'top',
        middleware: [
            offset({ mainAxis: 8 }),
            flip({
                padding: 8,
                boundary: editor.options.element,
                fallbackPlacements: ['bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']
            })
        ]
    });

    useEffect(() => {
        // Ensure we only add event listeners after mounting and when editor is available
        if (!mounted || !editor.$doc?.element) return;

        const handleHover = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isLinkElement = target.closest('a') as HTMLAnchorElement | null;

            if (isLinkElement) {
                if (timeOutRef.current) {
                    clearTimeout(timeOutRef.current);
                    timeOutRef.current = null;
                }

                setLinkHover(isLinkElement);
            }
        };

        const handleMouseout = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isLinkElement = target.closest('a');

            if (isLinkElement) {
                if (timeOutRef.current) {
                    clearTimeout(timeOutRef.current);
                    timeOutRef.current = null;
                }
                timeOutRef.current = setTimeout(() => {
                    setLinkHover(null);
                }, LIVE_TIME);
            }
        };

        const docElement = editor.$doc.element;
        docElement.addEventListener('mouseover', handleHover);
        docElement.addEventListener('mouseout', handleMouseout);

        return () => {
            docElement.removeEventListener('mouseover', handleHover);
            docElement.removeEventListener('mouseout', handleMouseout);
        };
    }, [mounted, editor]);

    // Rest of the component remains the same...

    // Add a null check for initial render
    if (!mounted) return null;

    return (
        <div>
            {shoudlShow() && (
                <div
                    ref={refs.setFloating}
                    onMouseOver={() => {
                        if (timeOutRef.current) {
                            clearTimeout(timeOutRef.current);
                            timeOutRef.current = null;
                        }
                    }}
                    onMouseOut={() => {
                        if (timeOutRef.current) {
                            clearTimeout(timeOutRef.current);
                            timeOutRef.current = null;
                        }
                        timeOutRef.current = setTimeout(() => {
                            setLinkHover(null);
                        }, LIVE_TIME);
                    }}
                    style={floatingStyles}
                >
                    {/* Rest of the floating menu content */}
                </div>
            )}

            {editor && (
                <BubbleMenu
                    editor={editor}
                    shouldShow={shouldShowEditor}
                    pluginKey="link-menu"
                    tippyOptions={{
                        popperOptions: {
                            modifiers: [{ name: 'flip', enabled: false }]
                        },
                        placement: 'bottom-start',
                        offset: [-2, 16]
                    }}
                >
                    Edit Link
                </BubbleMenu>
            )}
        </div>
    );
};