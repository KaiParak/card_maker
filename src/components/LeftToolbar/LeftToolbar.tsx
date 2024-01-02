import React from 'react';
import classes from './LeftToolbar.module.css';
import {
    isArtType,
    isImageType,
    isTextType,
    ObjectType,
    TextDecorationType,
    TextType,
} from '../../types/types';
import { CustomSelect } from '../../common/CustomSelect/CustomSelect';
import {
    fontColors,
    FontColorType,
    fontFamilies,
    FontFamilyType,
    fontSizes,
    FontSizeType,
} from './data/fontData';

interface ILeftToolbar {
    selectedObject?: ObjectType;
    removeObject: (object: ObjectType) => void;
    setObject: (object: ObjectType) => void;
}

const LeftToolbar = ({
    selectedObject,
    removeObject,
    setObject,
}: ILeftToolbar) => {
    if (selectedObject === undefined) {
        return <></>;
    }

    let selectedObjectType: string;
    if (isTextType(selectedObject)) {
        selectedObjectType = 'текст';
    } else if (isImageType(selectedObject)) {
        selectedObjectType = 'изображение';
    } else if (isArtType(selectedObject)) {
        selectedObjectType = 'арт объект';
    } else {
        selectedObjectType = 'объект';
    }

    const changeTextColor = (newColor: FontColorType) => {
        setObject({
            ...selectedObject,
            fontColor: newColor,
        });
    };

    const changeTextSize = (newSize: FontSizeType) => {
        setObject({
            ...selectedObject,
            fontSize: Number(newSize),
        });
    };

    const changeTextFontFamily = (newFontFamily: FontFamilyType) => {
        setObject({
            ...selectedObject,
            fontFamily: newFontFamily,
        });
    };

    const addTextDecoration = (newTextDecoration: TextDecorationType) => {
        const oldDecorations = (selectedObject as TextType).decorations;
        if (!oldDecorations.includes(newTextDecoration)) {
            setObject({
                ...selectedObject,
                decorations: [...oldDecorations, newTextDecoration],
            });
        }
    };

    const removeTextDecoration = (decoration: TextDecorationType) => {
        const oldDecorations = (selectedObject as TextType).decorations;
        if (oldDecorations.includes(decoration)) {
            setObject({
                ...selectedObject,
                decorations: oldDecorations.filter((dec) => dec !== decoration),
            });
        }
    };

    return (
        <div className={classes.container}>
            <h3 className={classes.containerTitle}>
                {'Выделенный объект: ' + selectedObjectType}
            </h3>
            {isTextType(selectedObject) ? (
                <div className={classes.textPropsChangeContainer}>
                    <CustomSelect
                        options={fontColors}
                        defaultValue={'Выберите цвет'}
                        value={(selectedObject as TextType).fontColor}
                        onChange={changeTextColor}
                    />
                    <CustomSelect
                        options={fontSizes}
                        defaultValue={'Выберите размер'}
                        value={(selectedObject as TextType).fontSize.toString()}
                        onChange={changeTextSize}
                    />
                    <CustomSelect
                        options={fontFamilies}
                        defaultValue={'Выберите шрифт'}
                        value={(selectedObject as TextType).fontFamily}
                        onChange={changeTextFontFamily}
                    />
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes('italic')}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration('italic')
                                    : removeTextDecoration('italic');
                            }}
                        />
                        <span>Курсив</span>
                    </label>
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes('bold')}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration('bold')
                                    : removeTextDecoration('bold');
                            }}
                        />
                        <span>Жирный</span>
                    </label>
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes('underline')}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration('underline')
                                    : removeTextDecoration('underline');
                            }}
                        />
                        <span>Подчёркнутый</span>
                    </label>
                </div>
            ) : null}
            <div className={classes.buttonBlock}>
                <div className={classes.buttonsInline}>
                    <div
                        className={classes.button}
                        onClick={() => removeObject(selectedObject)}
                    >
                        {'Удалить выделенный объект'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LeftToolbar };
