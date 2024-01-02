import React from 'react';
import { Color, colorList } from '../data/templateColors';
import classes from './FilterBlock.module.css';
import { FilterType } from '../../../../types/types';

interface IFilterBlock {
    setFilter: (filter: FilterType) => void;
    filter: FilterType;
}

const FilterBlock = ({ setFilter, filter }: IFilterBlock) => {
    const changeColor = (color: 'r' | 'g' | 'b' | 'a', value: number) => {
        setFilter({
            r: color === 'r' ? value : filter.r,
            g: color === 'g' ? value : filter.g,
            b: color === 'b' ? value : filter.b,
            a: color === 'a' ? value : filter.a,
        });
    };

    const changeColorTemplate = (color: Color) => {
        setFilter({
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a,
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.rangeInline}>
                <label htmlFor="red-color">R</label>
                <input
                    type="range"
                    id="red-color"
                    min="1"
                    max="255"
                    value={filter.r}
                    onChange={(e) => changeColor('r', Number(e.target.value))}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="green-color">G</label>
                <input
                    type="range"
                    id="green-color"
                    min="1"
                    max="255"
                    value={filter.g}
                    onChange={(e) => changeColor('g', Number(e.target.value))}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="blue-color">B</label>
                <input
                    type="range"
                    id="blue-color"
                    min="1"
                    max="255"
                    value={filter.b}
                    onChange={(e) => changeColor('b', Number(e.target.value))}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="alpha-channel">A</label>
                <input
                    type="range"
                    id="alpha-channel"
                    min="0"
                    max="100"
                    value={filter.a * 100}
                    onChange={(e) =>
                        changeColor('a', Number(e.target.value) / 100)
                    }
                />
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
                            onClick={() => changeColorTemplate(color.colorRGBA)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { FilterBlock };
