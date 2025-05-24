'use client';

import React, { useState } from 'react';
import AdminHomeView from '@/components/admin-view/home';
import AdminLoginView from '@/components/admin-view/login';
import AdminAboutView from '@/components/admin-view/about';
import AdminExperienceView from '@/components/admin-view/experience';
import AdminEducationView from '@/components/admin-view/education';
import AdminProjectView from '@/components/admin-view/project';
import AdminContactView from '@/components/admin-view/contact';

const initialHomeFormData = {
    heading: '',
    summary: '',
};

const initialAboutFormData = {
    aboutme: '',
    noofprojects: '',
    yearofexerience: '',
    noofclients: '',
    skills: '',
};

const initialExperienceFormData = {
    position: '',
    company: '',
    duration: '',
    location: '',
    jobprofile: '',
};

const initialEducationFormData = {
    degree: '',
    year: '',
    college: '',
};

const initialProjectFormData = {
    name: "",
    website: "",
    technologies: "",
    github: "", 
}

export default function AdminPage() {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('home');
    const [homeViewFormData, setHomeViewFormData] =
        useState(initialHomeFormData);
    const [aboutViewFormData, setAboutViewFormData] =
        useState(initialAboutFormData);
    const [experienceViewFormData, setExperienceViewFormData] = useState(
        initialExperienceFormData,
    );
    const [educationViewFormData, setEducationViewFormData] = useState(
        initialEducationFormData,
    );
    const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);

    const menuItem = [
        {
            id: 'home',
            label: 'Home',
            component: (
                <AdminHomeView
                    formData={homeViewFormData}
                    setFormData={setHomeViewFormData}
                />
            ),
        },
        {
            id: 'about',
            label: 'About',
            component: (
                <AdminAboutView
                    formData={aboutViewFormData}
                    setFormData={setAboutViewFormData}
                />
            ),
        },
        {
            id: 'experience',
            label: 'Experience',
            component: (
                <AdminExperienceView
                    formData={experienceViewFormData}
                    setFormData={setExperienceViewFormData}
                />
            ),
        },
        {
            id: 'education',
            label: 'Education',
            component: <AdminEducationView 
                formData={educationViewFormData}
                setFormData={setEducationViewFormData}
            />,
        },
        {
            id: 'project',
            label: 'Project',
            component: <AdminProjectView 
                formData={projectViewFormData}
                setFormData={setProjectViewFormData}
            />,
        },
        {
            id: 'contact',
            label: 'Contact',
            component: <AdminContactView />,
        },
    ];

    const selectedItem = menuItem.find(
        (item) => item.id === currentSelectedTab,
    );

    return (
        <div className="border-b border-gray-400">
            <nav
                className="-mb-0.5 flex justify-center space-x-6"
                role="tablist"
            >
                {menuItem.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="p-4 font-bold text-xl text-black"
                        onClick={() => setCurrentSelectedTab(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-10 p-10">
                {selectedItem && (
                    <React.Fragment key={selectedItem.id}>
                        {selectedItem.component}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
