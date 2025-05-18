import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import FractureDetectionPage from "../../features/fracture_detection/FractureDetectionPage";
import SteganographyDetectionPage from "../../features/steganography_detection/SteganographyDetectionPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage />},
            { path: 'fracture-detection', element: <FractureDetectionPage />},
            { path: 'steganography-detection', element: <SteganographyDetectionPage />},

            // { path: '/subjects/:id/notes', element: <SubjectNotes /> },
        ]
    }
])