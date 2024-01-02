import React from 'react';
import classes from './TopToolbar.module.css';
import { DropDownButtons } from '../../common/DropdownButtons/DropdownButtons';
import { Button } from '../../common/Button/Button';
import { artObjectList } from '../../data/ArtObjectList/ArtObjectList';
import { FilterBlock } from './FilterBlock/ui/FilterBlock';

const TopToolbar = () => {
    return (
        <div className={classes.toolbarContainer}>
            <div className={classes.toolbarHeader}>
                <DropDownButtons
                    parentButtonName={'Сохранить'}
                    childButtonNames={['json', 'jpeg', 'png']}
                    onSelect={() => {}}
                />
                <DropDownButtons
                    parentButtonName={'Загрузить'}
                    childButtonNames={['json']}
                    onSelect={() => {}}
                />
            </div>
            <div className={classes.toolbarFooter}>
                <div className={classes.inputContainer}>
                    <input
                        id={'import-image'}
                        type={'file'}
                        className={classes.input}
                    />
                    <label className={classes.inputLabel}>
                        Загрузить изображение
                    </label>
                </div>
                <Button content={'Добавить текст'} onClick={() => {}} />
                <div className={classes.importArtObjectContainer}>
                    <h3 className={classes.importArtObjectTitle}>
                        Арт Объекты
                    </h3>
                    <div className={classes.previewArtObjectsBlock}>
                        {artObjectList.map((src: string) => {
                            return (
                                <div key={src} onClick={() => {}}>
                                    <img
                                        src={src}
                                        className={classes.previewArt}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <FilterBlock />
            </div>
        </div>
    );
};

export { TopToolbar };
