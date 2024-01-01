type SizeType = {
    width: number;
    height: number;
};

type PositionType = {
    x: number;
    y: number;
};

type BoundingBoxType = SizeType & PositionType;

type BaseElementType = BoundingBoxType & {
    id: string;
    isSelected: boolean;
};

type ImageType = BaseElementType & {
    imageSrc: string;
};

type TextDecorationType = 'italic' | 'bold' | 'underline';

type TextType = BaseElementType & {
    content: string;
    decorations: TextDecorationType[];
    fontSize: number;
    fontFamily: string;
    fontColor: string;
};

type ArtType = BaseElementType & {
    artSrc: string;
};

type ObjectType = ImageType | TextType | ArtType;

type FilterType = {
    r: number;
    g: number;
    b: number;
    a: number;
};

type CanvasType = SizeType;

type CardDataType = {
    filter: FilterType;
    canvas: CanvasType;
    objects: ObjectType[];
};

export type {
    ImageType,
    TextType,
    ArtType,
    FilterType,
    CanvasType,
    CardDataType,
};
