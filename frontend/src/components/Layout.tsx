import Footer from './Footer';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <>
        <Outlet />
        <Footer />
        </>
    )
}