import axios from "axios";
// Fetch all issue tickets from mongoDB 
const getIssueTickets = () => {
    // Async axios fn to get all ticket issues
    return axios.get(`http://localhost:5001/ticket`).then(res => res.data);
};

export default getIssueTickets;