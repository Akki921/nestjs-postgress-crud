export type TranslateOptions = {
    lang?: string;
    args?: ({
        [k: string]: any;
    } | string)[] | {
        [k: string]: any;
    };
    path?: string;
    debug?: boolean;
};