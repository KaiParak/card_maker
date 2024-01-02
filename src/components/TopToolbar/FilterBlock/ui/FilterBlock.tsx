import React from 'react';
import { colorList } from '../data/templateColors';
import classes from './FilterBlock.module.css';

const FilterBlock = () => {
    return (
        <div className={classes.container}>
            <div className={classes.rangeInline}>
                <label htmlFor="red-color">R</label>
                <input type="range" id="red-color" min="1" max="255" />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="green-color">G</label>
                <input type="range" id="green-color" min="1" max="255" />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="blue-color">B</label>
                <input type="range" id="blue-color" min="1" max="255" />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="alpha-channel">A</label>
                <input type="range" id="alpha-channel" min="0" max="100" />
            </div>

            <div className={classes.colorPicketBlock}>
                {colorList.map((color) => {
                    return (
                        <div
                            key={color.colorName}
                            className={classes.colorTemplate}
                            style={{
                                backgroundColor: `rgb(${color.colorRGBA.r}, ${color.colorRGBA.g}, ${color.colorRGBA.b})`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { FilterBlock };
