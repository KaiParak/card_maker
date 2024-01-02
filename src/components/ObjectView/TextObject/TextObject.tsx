import React from 'react';
import { TextType } from '../../../types/types';
import classes from './TextObject.module.css';

interface ITextObject {
    textObject: TextType;
}

const TextObject = ({ textObject }: ITextObject) => {
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
        />
    );
};

export { TextObject };
