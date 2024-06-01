"use server"

const fetchExternalCategory = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    
    if(result.meals === null) {
        throw new Error('No data found');
    }

    return result.meals;
};

export { fetchExternalCategory };

