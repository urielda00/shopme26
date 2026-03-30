import img1 from '../../assets/Home/6nd/buds2.jpg';
import img2 from '../../assets/Home/6nd/flip4.jpg';
import img3 from '../../assets/Home/6nd/watch5.jpg';
import img4 from '../../assets/Home/6nd/zFold.jpg';

interface IClickableData {
    to: string;
    src: string;
}

const clickableData: IClickableData[] = [
    { to: '/productsList?toCategory=headphones', src: img1 }, // Updated to 'headphones'
    { to: '/productsList?toCategory=phone&brand=Samsung', src: img2 },
    { to: '/productsList?toCategory=watches', src: img3 },
    { to: '/productsList?toCategory=phone&brand=Samsung', src: img4 },
];

export default clickableData;