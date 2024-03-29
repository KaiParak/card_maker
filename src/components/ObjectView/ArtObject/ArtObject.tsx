import React from 'react';
import { ArtType } from '../../../types/types';
import classes from './ArtObject.module.css';

interface IArtObject {
    artObject: ArtType;
}

const ArtObject = ({ artObject }: IArtObject) => {
    return <img src={artObject.artSrc} className={classes.art} />;
};

export { ArtObject };
