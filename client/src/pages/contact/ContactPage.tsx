import { FC } from 'react';
import { Grid2 as Grid, Paper, Box, Avatar, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactFormFields from './ContactFormFields';
import { IContactField } from '../../interfaces/contact.interface';
import { contactPageWrapperSx, imageGridSx, formContainerSx } from './Contact.styles';
import { commonContainerSx } from '../../styles/common.styles';

const contactFields: IContactField[] = [
    { id: 'email', name: 'email', label: 'Email Address', autoComplete: 'email', type: 'email' },
    { id: 'phone', name: 'phone', label: 'Phone Number', autoComplete: 'phone', type: 'tel' },
    { id: 'fName', name: 'fName', label: 'First Name', autoComplete: 'given-name', type: 'text' },
    { id: 'lName', name: 'lName', label: 'Last Name', autoComplete: 'family-name', type: 'text' },
    { id: 'moreInfo', name: 'moreInfo', label: 'Provide information here...', multiline: true, rows: 4 },
];

const ContactPage: FC = () => {
    // Access Vite environment variables
    const mailLink = import.meta.env.VITE_MAIL_LINK;
    const thankYouLink = `${import.meta.env.VITE_FRONT_URL}/thankYou`;

    return (
        <Grid container sx={commonContainerSx}>
            {/* Background Image Grid */}
            <Grid size={{ xs: false, sm: 4, md: 7 }} sx={imageGridSx} />

            {/* Form Grid */}
            <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square>
                <Box sx={formContainerSx}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PhoneIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Contact Us
                    </Typography>

                    <Box 
                        component="form" 
                        action={mailLink} 
                        method="POST" 
                        id="contactForm" 
                        sx={{ mt: 1, width: '100%' }}
                    >
                        {/* FormSubmit Configuration Hidden Inputs */}
                        <input type="hidden" name="_next" value={thankYouLink} />
                        <input type="hidden" name="_subject" value="New Contact From SHOPME" />
                        <input type="hidden" name="_template" value="table" />

                        <ContactFormFields fields={contactFields} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ContactPage;