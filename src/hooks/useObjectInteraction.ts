import React, { useEffect, useState } from 'react';
import { BoundingBoxType, ObjectType } from '../types/types';
import { ResizeDirection } from '../components/ObjectView/ResizeControls/ResizeDirection';

const topResize = (
    oldHeight: number,
    deltaY: number,
    oldPosY: number
): [number, number] => {
    return [oldHeight - deltaY, oldPosY + deltaY];
};
const bottomResize = (
    oldHeight: number,
    deltaY: number,
    oldPosY: number
): [number, number] => {
    return [oldHeight + deltaY, oldPosY];
};

const rightResize = (
    oldWidth: number,
    deltaX: number,
    oldPosX: number
): [number, number] => {
    return [oldWidth + deltaX, oldPosX];
};

const leftResize = (
    oldWidth: number,
    deltaX: number,
    oldPosX: number
): [number, number] => {
    return [oldWidth - deltaX, oldPosX + deltaX];
};

const resize = (
    object: ObjectType,
    deltaX: number,
    deltaY: number,
    isResizing: ResizeDirection
): BoundingBoxType => {
    let newWidth = object.width;
    let newHeight = object.height;
    let newPosX = object.x;
    let newPosY = object.y;

    switch (isResizing) {
        case 'top':
            [newHeight, newPosY] = topResize(object.height, deltaY, object.y);
            break;
        case 'bottom':
            [newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.y
            );
            break;
        case 'right':
            [newWidth, newPosX] = rightResize(object.width, deltaX, object.x);
            break;
        case 'left':
            [newWidth, newPosX] = leftResize(object.width, deltaX, object.x);
            break;
        case 'top-left':
            [newHeight, newPosY] = topResize(object.height, deltaY, object.y);
            [newWidth, newPosX] = leftResize(object.width, deltaX, object.x);
            break;
        case 'top-right':
            [newHeight, newPosY] = topResize(object.height, deltaY, object.y);
            [newWidth, newPosX] = rightResize(object.width, deltaX, object.x);
            break;
        case 'bottom-left':
            [newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.y
            );
            [newWidth, newPosX] = leftResize(object.width, deltaX, object.x);
            break;
        case 'bottom-right':
            [newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.y
            );
            [newWidth, newPosX] = rightResize(object.width, deltaX, object.x);
            break;
    }
    return {
        x: newPosX,
        y: newPosY,
        width: newWidth,
        height: newHeight,
    };
};

interface ObjectInteractionProps {
    object: ObjectType;
    changeObject: (newObject: ObjectType) => void;
}

const useObjectInteraction = ({
    object,
    changeObject,
}: ObjectInteractionProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragStartObject, setDragStartObject] = useState({
        x: object.x,
        y: object.y,
    });
    const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement>,
        resizeDirection?: ResizeDirection
    ) => {
        if (resizeDirection) {
            setIsResizing(resizeDirection);
        } else {
            setIsDragging(true);
            setDragStart({ x: event.clientX, y: event.clientY });
            setDragStartObject({ x: object.x, y: object.y });
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;
        if (isDragging) {
            const posX = dragStartObject.x + deltaX;
            const posY = dragStartObject.y + deltaY;

            changeObject({
                ...object,
                x: posX,
                y: posY,
            });

            setDragStartObject({ x: posX, y: posY });
            setDragStart({ x: event.clientX, y: event.clientY });
        }
        if (isResizing) {
            changeObject({
                ...object,
                ...resize(object, deltaX, deltaY, isResizing),
            });
        }
    };

    useEffect(() => {
        const handleGlobalMouseMove = (event: MouseEvent) => {
            handleMouseMove(event);
        };

        const handleGlobalMouseUp = () => {
            setIsDragging(false);
            setIsResizing(null);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove]);

    return handleMouseDown;
};

export { useObjectInteraction };
