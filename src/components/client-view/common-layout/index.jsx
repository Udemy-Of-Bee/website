'use client';
import { useParams } from 'next/navigation';
import Navbar from '../navbar';

const CommonLayout = ({ children }) => {
    const pathName = useParams();
    return (
        <>
            {pathName !== '/admin' ? <Navbar /> : null}
            {children}
        </>
    );
};

export default CommonLayout;
