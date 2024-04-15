import axios from "axios";
// Fetch all issue tickets from mongoDB 
const getIssueTickets = () => {
    // Async axios fn to get all ticket issues
    return axios.get(`https://zhealth-api.onrender.com/ticket`).then(res => res.data);
};

export default getIssueTickets;