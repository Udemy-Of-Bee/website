'use client';

import FormControls from "../form-controls";

const controls = [
    {
        name: 'position',
        placeholder: 'Position',
        type: 'text',
        label: 'Position',
    },
    {
        name: 'company',
        placeholder: 'Company',
        type: 'text',
        label: 'Company',
    },
    {
        name: 'duration',
        placeholder: 'Duration',
        type: 'text',
        label: 'Duration',
    },
    {
        name: 'location',
        placeholder: 'Location',
        type: 'text',
        label: 'Location',
    },
    {
        name: 'jobprofile',
        placeholder: 'Job Profile',
        type: 'text',
        label: 'Job Profile',
    },
];
export default function AdminExperienceView({formData, setFormData}) {
    console.log(formData);
    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <FormControls
                    controls={controls}
                    formData={formData}
                    setFormData={setFormData}
                />

                <button className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                    Add Experience
                </button>
            </div>
        </div>
    );
}
