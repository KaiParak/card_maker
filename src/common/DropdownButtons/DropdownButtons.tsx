import React, { useState } from 'react';
import classes from './DropdownButtons.module.css';
import { Button } from '../Button/Button';

interface IDropDownButtons<ActionType> {
    parentButtonName: string;
    childButtonNames: string[];
    onSelect: (value: ActionType) => void;
}

const DropDownButtons = <ActionType extends string>({
    parentButtonName,
    childButtonNames,
    onSelect,
}: IDropDownButtons<ActionType>) => {
    const [isDropped, setIsDropped] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsDropped(!isDropped);
    };

    return (
        <div className={classes.buttonContainer}>
            <Button content={parentButtonName} onClick={toggleDropDown} />
            {isDropped ? (
                <div className={classes.popup}>
                    {childButtonNames.map((buttonName: string) => {
                        return (
                            <Button
                                key={buttonName}
                                onClick={() => {
                                    toggleDropDown();
                                    onSelect(buttonName as ActionType);
                                }}
                                content={buttonName}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export { DropDownButtons };
