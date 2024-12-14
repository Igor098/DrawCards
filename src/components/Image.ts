interface IImage {
    src: string;
    title?: string;
}

const Image = ({ src, title }:IImage):string => {
    return `
        <img src=${src} alt=${title}>
    `
}

export default Image