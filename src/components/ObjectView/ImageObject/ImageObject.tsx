import React from 'react';
import { ImageType } from '../../../types/types';
import classes from './ImageObject.module.css';

interface IImageObject {
    imageObject: ImageType;
}

const ImageObject = ({ imageObject }: IImageObject) => {
    return <img src={imageObject.imageSrc} className={classes.image} />;
};

export { ImageObject };
