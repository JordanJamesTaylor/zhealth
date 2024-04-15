import axios from "axios";
// Update an issue tickets in mongoDB 
const updateIssueTicketStatus = ({ id, name, email, description, status, adminResponse }) => {
    // Async axios fn to update an existing ticket issues
    return axios.put(`https://zhealth-api.onrender.com/ticket/${id}`, {
        id: id,
        name: name,
        email: email,
        description: description,
        ticketStatus: status,
        adminResponse: adminResponse
    })
    .then(res => res.data)
    .catch((err) => { 
        console.log('Error in updateIssueTicketStatus: ', err);
        throw new Error(err); 
    });
};

export default updateIssueTicketStatus;