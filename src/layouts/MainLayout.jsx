import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import FloatingAIButton from "../components/ai/FloatingAIButton";

function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <FloatingAIButton />
        </>
    );
}

export default MainLayout;