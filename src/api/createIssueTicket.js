import axios from "axios";
// Add new issue ticket to mongoDB  
const createIssueTicket = ({ name, email, description }) => {
    // Async axios fn to post a new ticket issues
    return axios.post(`https://zhealth-api.onrender.com/ticket/`, {
        name,
        email,
        description,
        ticketStatus: 'new',
        adminResponse: ''
    })
    .then(res => res.data)
    .catch((err) => { 
        console.log('Error in createIssueTicket: ', err);
        throw new Error(err); 
    });
};

export default createIssueTicket;