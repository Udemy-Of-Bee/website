export async function addData(currentTab, formData) {
    try {
        // Không cần viết đoạn: http://localhost:3000 trước /api cũng được, do đoạn code này được thực thi ở phía client
        const response = await fetch(`http://localhost:3000/api/${currentTab}/add`, {
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
