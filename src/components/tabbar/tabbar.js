import React from "react";
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const TabBar = ({handleChange, value}) =>{
    return (
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="ScrumBoard" />
            <Tab label="Timeline" />
        </Tabs>
    );
    
}

export default TabBar;