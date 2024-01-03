import React from 'react';
import { ObjectType, TextType } from '../../../types/types';
import classes from './TextObject.module.css';

interface ITextObject {
    textObject: TextType;
    setObject: (object: ObjectType) => void;
}

const TextObject = ({ textObject, setObject }: ITextObject) => {
    const handleTextChange = (value: string) => {
        setObject({ ...textObject, content: value });
    };

    return (
        <input
            className={classes.inputBlock}
            style={{
                fontSize: `${textObject.fontSize}px`,
                color: textObject.fontColor,
                fontFamily: textObject.fontFamily,
                fontStyle: textObject.decorations.includes('italic')
                    ? 'italic'
                    : 'normal',
                fontWeight: textObject.decorations.includes('bold')
                    ? 'bold'
                    : 'normal',
                textDecoration: textObject.decorations.includes('underline')
                    ? 'underline'
                    : 'none',
            }}
            placeholder={'Ваш текст'}
            value={textObject.content}
            onChange={(e) => handleTextChange(e.target.value)}
        />
    );
};

export { TextObject };
