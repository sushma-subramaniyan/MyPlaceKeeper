import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "../components/List.css"


const Collections = () => {

    return ( 
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

    {[0, 1, 2, 3].map((value) => {
      const labelId = `checkbox-list-secondary-label-${value}`;
      return (
        <ListItem
          key={value}
          
          disablePadding
        >
          <ListItemButton>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
          </ListItemButton>
        </ListItem>
      );
    })}
  </List>
     );
}
 
export default Collections;

