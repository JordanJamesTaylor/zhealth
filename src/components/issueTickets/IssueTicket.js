import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import updateIssueTicketStatus from '../../api/updateIssueTicketStatus';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const IssueTicket = ({ ticket }) => {
    const [openDescription, setDescriptionOpen] = useState(false);
    const [openDialog, setDialogOpen] = useState(false);
    const [displayTicket, setDisplayTicket] = useState(ticket);
    const [newStatus, setNewStatus] = useState('');
    // ReactQuery mutate fn to update issue ticket status
    const createTicketMutation = useMutation({
        mutationFn: updateIssueTicketStatus,
        onSuccess: (data) => {
            console.log('Ticket status successfully updated.');
            setDisplayTicket(data);
        },
        onError: () => {
            console.log('Failed to update ticket status');
        }
    });
    // Begin API call when status is changed via dropdown
    const handleChange = (e) => {
        e.preventDefault();
        setNewStatus(e.target.value);
        
        createTicketMutation.mutate({ 
            id: ticket._id,
            name: ticket.name,
            email: ticket.email,
            description: ticket.description,
            status: e.target.value,
            adminResponse: ticket.adminResponse
        });
    };

    const openResponseDialog = () => {
        setDialogOpen(true);
    };
    
    const closeResponseDialog = () => {
        console.log('Reply email sent.');
        setDialogOpen(false);
    };

    return ( 
        <TableRow>
            <TableCell scope="ticket.data">{displayTicket.name}</TableCell>
            <TableCell>{displayTicket.email}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    defaultValue='View Description'
                    onClick={() => setDescriptionOpen(!openDescription)}
                >
                    {openDescription ? 
                        <>
                            <TextField
                                id="description-display-box"
                                value={displayTicket.description}
                                multiline
                                rows={4}
                            />
                            <KeyboardArrowUpIcon /> 
                        </>
                        : 
                        <>
                            <Typography>View Description</Typography>
                            <KeyboardArrowDownIcon />
                        </>
                    }
                </IconButton>
            </TableCell>
            <TableCell>
                <Typography>{displayTicket.ticketStatus}</Typography>
            </TableCell>
            <TableCell>
            <FormControl sx={{ m: 1, width: '6rem' }}>
                <InputLabel id="status-select">Status</InputLabel>
                <Select
                    labelId="status-select"
                    id="ticket-status-select"
                    value={newStatus}
                    onChange={(e) => handleChange(e)}
                    autoWidth
                    label="Status"
                >
                    <MenuItem value={'New'}>New</MenuItem>
                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Resolved'}>Resolved</MenuItem>
                </Select>
            </FormControl>
            </TableCell>
            <TableCell>
                <Button variant="outlined" onClick={openResponseDialog}>
                    Write Response
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={closeResponseDialog}
                    PaperProps={{
                        onSubmit: (event) => {
                            event.preventDefault();
                            closeResponseDialog();
                        },
                    }}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="ticket-response"
                            label="Your response..."
                            type="text"
                            variant="standard"
                            multiline
                            rows={4}
                            sx={{ minWidth: '500px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeResponseDialog}>Cancel</Button>
                        <Button type="submit" onClick={closeResponseDialog}>Send</Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default IssueTicket;
