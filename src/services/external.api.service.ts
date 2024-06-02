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

    if (result.meals === null) {
        throw new Error('No data found');
    }

    return result.meals;
};

const fetchRandomMeal = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();

    if (result.meals === null || result.meals.length === 0) {
        throw new Error('No data found');
    }

    return result.meals[0];
}

export { fetchExternalCategory, fetchRandomMeal };
