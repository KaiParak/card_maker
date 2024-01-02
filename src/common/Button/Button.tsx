import React from 'react';
import classes from './Button.module.css';

interface IButton {
    content: string;
    onClick: () => void;
}

const Button = ({ content, onClick }: IButton) => {
    return (
        <div className={classes.button} onClick={onClick}>
            {content}
        </div>
    );
};

export { Button };
