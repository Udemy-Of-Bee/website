export async function addData(currentTab, formData) {
    try {
        // Không cần viết đoạn: http://localhost:3000 trước /api cũng được, do đoạn code này được thực thi ở phía client
        const response = await fetch(
            `http://localhost:3000/api/${currentTab}/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            },
        );

        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function getData(currentTab) {
    try {
        const response = await fetch(`/api/${currentTab}/get`, {
            method: 'GET',
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function updateData(currentTab, formData) {
    try {
        const response = await fetch(`/api/${currentTab}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function login(formData) {
    try {
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function handleDelete(id) {
    try {
        const res = await fetch(`/api/education/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        return res.json();
    } catch (e) {
        console.error('Error Deleting items', e);
        return { success: false, message: 'Failed to delete item' };
    }
}
