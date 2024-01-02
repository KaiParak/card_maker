import React, { ReactNode } from 'react';
import classes from './Canvas.module.css';
import { CanvasType, FilterType } from '../../types/types';

interface ICanvas {
    canvasProps: CanvasType;
    filter: FilterType;
    children?: ReactNode;
}

const Canvas = ({ canvasProps, filter, children }: ICanvas) => {
    return (
        <div
            className={classes.canvas}
            style={{ width: canvasProps.width, height: canvasProps.height }}
        >
            {children}
            <div
                style={{
                    backgroundColor: `rgba(${filter.r}, ${filter.g}, ${filter.b}, ${filter.a})`,
                }}
                className={classes.filter}
            />
        </div>
    );
};

export { Canvas };
