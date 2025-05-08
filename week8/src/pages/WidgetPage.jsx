import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Slider,
  CircularProgress,
  LinearProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  Badge,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FaceIcon from '@mui/icons-material/Face';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function WidgetPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [tabValue, setTabValue] = useState(0);
  
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };
  
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        UI Widgets
      </Typography>
      
      <Grid container spacing={4}>
        {/* Toggle Switches Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Toggle Switches
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControlLabel 
              control={
                <Switch 
                  checked={darkMode}
                  onChange={handleDarkModeChange}
                  color="primary"
                />
              } 
              label="Dark Mode"
            />
            <FormControlLabel 
              control={<Switch defaultChecked color="secondary" />} 
              label="Notifications"
            />
            <FormControlLabel 
              control={<Switch color="warning" />} 
              label="Maintenance Mode"
            />
          </Paper>
        </Grid>
        
        {/* Progress Indicators Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progress Indicators
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CircularProgress variant="determinate" value={sliderValue} sx={{ mr: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(sliderValue)}%`}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={sliderValue} sx={{ mb: 2 }} />
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              aria-labelledby="progress-slider"
              valueLabelDisplay="auto"
            />
          </Paper>
        </Grid>
        
        {/* Tabs Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tabs
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Overview" />
                <Tab label="Analytics" />
                <Tab label="Reports" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Typography>
                This is the Overview tab content. You can display important summary information here.
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Typography>
                Analytics tab content would display charts, graphs and statistical data.
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography>
                The Reports tab would contain downloadable reports and documents.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
        
        {/* Accordions Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Accordions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>First Item</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Second Item</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                  varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion disabled>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Disabled Item</Typography>
              </AccordionSummary>
            </Accordion>
          </Paper>
        </Grid>
        
        {/* Chips & Badges Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chips & Badges
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Basic" />
              <Chip label="Primary" color="primary" />
              <Chip label="Success" color="success" />
              <Chip label="Warning" color="warning" />
              <Chip label="Error" color="error" />
              <Chip avatar={<Avatar>M</Avatar>} label="With Avatar" />
              <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
              <Chip label="Deletable" onDelete={() => {}} />
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Badge badgeContent={4} color="primary">
                <MailIcon />
              </Badge>
              <Badge badgeContent={99} color="secondary" max={99}>
                <NotificationsIcon />
              </Badge>
              <Badge variant="dot" color="error">
                <MailIcon />
              </Badge>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WidgetPage;