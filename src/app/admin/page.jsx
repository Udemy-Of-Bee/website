'use client';

import React, { useEffect, useState } from 'react';
import AdminHomeView from '@/components/admin-view/home';
import AdminLoginView from '@/components/admin-view/login';
import AdminAboutView from '@/components/admin-view/about';
import AdminExperienceView from '@/components/admin-view/experience';
import AdminEducationView from '@/components/admin-view/education';
import AdminProjectView from '@/components/admin-view/project';
import AdminContactView from '@/components/admin-view/contact';
import { addData, getData, login, updateData } from '@/services';
import Login from '@/components/admin-view/login';

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
    name: '',
    website: '',
    technologies: '',
    github: '',
};

const initialLoginFormData = {
    username: '',
    password: '',
};

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
    const [projectViewFormData, setProjectViewFormData] = useState(
        initialProjectFormData,
    );
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

    const [allData, setAllData] = useState({});
    const [update, setUpdate] = useState(false);
    const [authUser, setAuthUser] = useState(false);

    /**
     * Initializes the component and sets up the menu items.
     */
    const menuItem = [
        {
            id: 'home',
            label: 'Home',
            component: (
                <AdminHomeView
                    formData={homeViewFormData}
                    setFormData={setHomeViewFormData}
                    handleSaveData={handleSaveData}
                    update={update}
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
                    handleSaveData={handleSaveData}
                    update={update}
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
                    handleSaveData={handleSaveData}
                    data={allData?.experience}
                />
            ),
        },
        {
            id: 'education',
            label: 'Education',
            component: (
                <AdminEducationView
                    formData={educationViewFormData}
                    setFormData={setEducationViewFormData}
                    handleSaveData={handleSaveData}
                    data={allData?.education}
                    setAllData={setAllData}
                />
            ),
        },
        {
            id: 'project',
            label: 'Project',
            component: (
                <AdminProjectView
                    formData={projectViewFormData}
                    setFormData={setProjectViewFormData}
                    handleSaveData={handleSaveData}
                    data={allData?.project}
                />
            ),
        },
        {
            id: 'contact',
            label: 'Contact',
            component: <AdminContactView data={allData && allData?.contact} />,
        },
    ];

    const selectedItem = menuItem.find(
        (item) => item.id === currentSelectedTab,
    );

    /**
     * Handles saving data based on the current selected tab.
     */
    async function handleSaveData() {
        const dataMap = {
            home: homeViewFormData,
            about: aboutViewFormData,
            experience: experienceViewFormData,
            education: educationViewFormData,
            project: projectViewFormData,
        };

        const response = update
            ? await updateData(currentSelectedTab, dataMap[currentSelectedTab])
            : await addData(currentSelectedTab, dataMap[currentSelectedTab]);

        if (response.success) {
            resetAllFormData();
            extractAllData();
        }
    }

    useEffect(() => {
        extractAllData();
    }, [currentSelectedTab]);

    /**
     * Extracts all data from the server based on the current selected tab.
     */
    async function extractAllData() {
        const response = await getData(currentSelectedTab);

        if (
            currentSelectedTab === 'home' &&
            response &&
            response.data &&
            response.data.length
        ) {
            setHomeViewFormData(response && response.data[0]);
            setUpdate(true);
        }

        if (
            currentSelectedTab === 'about' &&
            response &&
            response.data &&
            response.data.length
        ) {
            setAboutViewFormData(response && response.data[0]);
            setUpdate(true);
        }

        if (response?.success) {
            setAllData({
                ...allData,
                [currentSelectedTab]: response && response.data,
            });

            // console.log(allData, ' :allData');
            // console.log(homeViewFormData, ' :homeViewFormData');
            // console.log(response, ' :response');
        }
    }

    /**
     * Resets all form data to their initial state.
     */
    function resetAllFormData() {
        setHomeViewFormData(initialHomeFormData);
        setAboutViewFormData(initialAboutFormData);
        setExperienceViewFormData(initialExperienceFormData);
        setEducationViewFormData(initialEducationFormData);
        setProjectViewFormData(initialProjectFormData);
    }

    /**
     * Handles the login process.
     */
    async function handleLogin() {
        const res = await login(loginFormData);

        if (res?.success) {
            setAuthUser(true);
            sessionStorage.setItem('authUser', JSON.stringify(true));
        }
    }

    useEffect(() => {
        setAuthUser(JSON.parse(sessionStorage.getItem('authUser')));
    }, []);

    /**
     * Renders the login component if the user is not authenticated.
     */
    if (!authUser) {
        return (
            <Login
                formData={loginFormData}
                setFormData={setLoginFormData}
                handleLogin={handleLogin}
            />
        );
    }

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
                        onClick={() => {
                            setCurrentSelectedTab(item.id);
                            resetAllFormData();
                            setUpdate(false);
                        }}
                    >
                        {item.label}
                    </button>
                ))}

                <button
                    onClick={() => {
                        setAuthUser(false);
                        sessionStorage.removeItem('authUser');
                    }}
                    className="p-4 font-bold text-xl text-black"
                >
                    Logout
                </button>
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
