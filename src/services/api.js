export const fetchDataFromAPI = async (sheet) => {
    try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbyL6STXo-oNFDF-MdsPOR7kM21OJn8YoHi4nJ-DqyP0hdXN8oYDpQHd76ycSj9d9JVB/exec?sheet=${sheet}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching about data:", error);
        return null;
    }
};