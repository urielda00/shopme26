import { ReactElement } from 'react';
import WatchIcon from '@mui/icons-material/Watch';
import TabletIcon from '@mui/icons-material/Tablet';
import LaptopIcon from '@mui/icons-material/Laptop';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

interface ICategory {
    name: string;
    icon: ReactElement;
    category: string | false;
}

export const categoryList: ICategory[] = [
    { name: 'See All', icon: <AllInclusiveIcon />, category: false },
    { name: 'Phones', icon: <PhoneAndroidIcon />, category: 'phone' },
    { name: 'Watches', icon: <WatchIcon />, category: 'watches' }, // Fixed typo
    { name: 'Tablets', icon: <TabletIcon />, category: 'tablets' },
    { name: 'Laptops', icon: <LaptopIcon />, category: 'laptops' },
    { name: 'PC', icon: <DesktopMacIcon />, category: 'pc' },
    { name: 'Headphones', icon: <HeadphonesIcon />, category: 'headphones' }, // Fixed typo
];

export const yearsList = [2026, 2025, 2024, 2023, 2022, 2021]; // Updated years

export const osList = ['Android', 'Windows 11', 'Windows 10', 'macOS', 'Linux', 'iOS'];

export const osCaseList: Record<string, string[]> = {
    phone: ['Android', 'iOS'],
    laptops: ['Windows 11', 'Windows 10', 'macOS', 'Linux'],
};

export const brandsList: Record<string, string[]> = {
    phone: ['Google', 'Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'LG', 'Nokia', 'Nothing'],
    watches: ['Fitbit', 'Garmin', 'Samsung', 'Apple'],
    tablets: ['Samsung', 'Lenovo', 'Amazon', 'Apple', 'Microsoft', 'Dell', 'Asus'],
    laptops: ['HP', 'Lenovo', 'Dell', 'ASUS', 'Samsung', 'MSI', 'Microsoft', 'Apple'],
    headphones: ['JBL', 'Sennheiser', 'Sony', 'Bose', 'Samsung', 'Apple', 'Jabra'],
};