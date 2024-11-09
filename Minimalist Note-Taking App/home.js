function displayDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' }); // 'January', 'February', etc.
    const year = now.getFullYear();
    // Display format: Day Month Year
    const currentDate = `${day} ${month}, ${year}`;
    document.getElementById('date').textContent = currentDate;
}

displayDate();