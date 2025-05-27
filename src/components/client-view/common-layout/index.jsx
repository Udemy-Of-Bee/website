'use client';
import { useParams, usePathname } from 'next/navigation';
import Navbar from '../navbar';

const CommonLayout = ({ children }) => {

    const pathName = usePathname();
    return (
        <>
            {pathName !== '/admin' ? <Navbar /> : null}
            {children}
        </>
    );
};

export default CommonLayout;
