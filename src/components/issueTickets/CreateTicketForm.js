import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import createIssueTicket from '../../api/createIssueTicket';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const issueTicket = {
    name: '',
    email: '',
    description: '',
    ticketStatus: 'New'
};

const CreateTicketForm = () => {
    const [ticket, setTicket] = useState(issueTicket);

    // ReactQuery mutate fn to add new issue ticket to db
    const createTicketMutation = useMutation({
        mutationFn: (ticket) => createIssueTicket(ticket),
        onSuccess: () => {
            console.log('Ticket successfully added.');
        },
        onError: () => {
            console.log('Failed to add ticket.');
        }
    });
    // Begin API call on form submission
    const onSubmit = (e) => {
        e.preventDefault();
        createTicketMutation.mutate(ticket);
    };

    return (
        <Box sx={{ margin: '15% 5% 0 5%' }} >
            <form onSubmit={onSubmit}>
                <TextField
                    required
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                />
                <TextField
                    required
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                />
                <TextField
                    required
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline 
                    rows={10}
                    onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit Ticket
                </Button>
            </form>
        </Box>
    );
};

export default CreateTicketForm;