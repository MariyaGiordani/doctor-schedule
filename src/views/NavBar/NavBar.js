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
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userType } from '../../utils/userType';
import { Redirect } from 'react-router';
import {logOut} from '../../utils/logOut';
import { isUserLogged} from '../../utils/isUserLogged'

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

export default function NavBar() {
  let pathname = window.location.pathname
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="header">
      <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs 
              value={value} 
              onChange={handleChange} 
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab style={{textDecoration: 'none'}} label="Início" icon={<HomeIcon />} {...a11yProps(0)} />
              {userType() === "Patient" && isUserLogged() && <Tab style={{textDecoration: 'none'}} label="Buscar Médico" icon={<PageviewIcon />} {...a11yProps(1)} />}
              {userType() === "Doctor" && isUserLogged() && <Tab style={{textDecoration: 'none'}} label="Cadastrar Endereço" icon={<ContactsIcon />} {...a11yProps(1)} />}
              <Tab style={{textDecoration: 'none'}} label="Perfil" icon={<PersonPinIcon />} {...a11yProps(2)} />
              <Tab style={{textDecoration: 'none'}} label="Sair" icon={<ExitToAppIcon />} href="/" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
            {value === 0 && userType() === "Patient" && <Redirect to={'/dashboard-patient'}/>}
            {value === 1 && userType() === "Patient" && <Redirect to={'/search-page'}/>}
            {value === 2 && userType() === "Patient" && <Redirect to={'/profile'}/>}
            {value === 0 && userType() === "Doctor" && <Redirect to={'/dashboard-doctor'}/>}
            {value === 1 && userType() === "Doctor" && <Redirect to={'/schedule-doctor'}/>}
            {value === 2 && userType() === "Doctor" && <Redirect to={'/profile'}/>}
            {value === 3 && logOut()}
      </div>
    </div>
  );
}