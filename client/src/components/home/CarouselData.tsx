import img1 from '../../assets/Home/5nd/Img1.jpg';
import img2 from '../../assets/Home/5nd/Img2.jpg';
import img3 from '../../assets/Home/5nd/Img3.jpg';

export interface ICarouselItem {
    img: string;
    h1: string;
    src: string;
}

export const items: ICarouselItem[] = [
    {
        img: 'Item1',
        h1: 'S23 Ultra Series',
        src: img1,
    },
    {
        img: 'Item2',
        h1: 'Apple Watch 4',
        src: img2,
    },
    {
        img: 'Item3',
        h1: 'EarBuds Pro 3',
        src: img3,
    },
];