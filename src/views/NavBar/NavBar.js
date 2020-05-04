import React from 'react';
import './NavBar.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PageviewIcon from '@material-ui/icons/Pageview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textDecoration: "none"
  },
}));

function selected(pathname) {
  switch (pathname) {
    case '/dashboard-patient':
      return 0;
    case '/search-page':
      return 1;
    case '/home':
      return 2;
    default:
      return [];
  }
}

export default function NavBar() {
  const pathname = window.location.pathname;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selected(pathname)}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab value={0} style={{textDecoration: 'none'}} label="Início" icon={<HomeIcon />} href="/dashboard-patient" {...a11yProps(0)} />
          <Tab value={1} style={{textDecoration: 'none'}} label="Buscar Médico" icon={<PageviewIcon />} href="/search-page" {...a11yProps(1)} />
          <Tab value={2} style={{textDecoration: 'none'}} label="Perfil" icon={<PersonPinIcon />} href="/home" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </div>
  );
}