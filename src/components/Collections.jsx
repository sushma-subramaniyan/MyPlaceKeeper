import { useContext, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "../components/Collections.css"
import { Button } from "@mui/base";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';



const Collections = ({setShowComponent, selectedCollection , setSelectedCollection, selectedPin, setSelectedPin}) => {

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const { user } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const fetchCollections = async ()=>{
    try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection/user/${user._id}`);
       if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          console.log('Failed to fetch data');
        }

    } catch (error) {
       console.log('Error:', error);
    }
 }

  const handleCollection = async () => {
   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection${selectedCollection ? '/' + selectedCollection._id : ''}`, {
       method: selectedCollection ? 'PUT':'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name: newCollectionName, user: user._id }),
     });

     if (response.ok) {
       // Fetch and update the collections list after creating a new collection
       toggleInput();
       await fetchCollections();
     } else {
       console.log('Failed to create a new collection');
     }
   } catch (error) {
     console.log('Error:', error);
   }
   setInputValue('');
   setNewCollectionName('');
   setInputVisible(false);
   setSelectedCollection(null);
 };

 const handleMenuClick = (event, collection) => {
  setAnchorEl(event.currentTarget);
  setSelectedCollection(collection);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const handleUpdate = () => {
  // Implement your update logic here
  toggleInput();
  handleMenuClose();
};

const handleDelete = async () => {
  // Implement your delete logic here
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection/${selectedCollection._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await fetchCollections();
    } else {
      console.log('Failed to delete the collection');
    }
  } catch (error) {
    console.log('Error:', error);
  }
  handleMenuClose();
  setSelectedCollection(null);
};

const handelCollectionSelected = async (collection) => {
  console.log(selectedPin)
  if(selectedPin) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection/${collection._id}/pins/${selectedPin}`, {
        method: 'POST',
      });
      if (response.ok) {
        setSelectedPin(null);
      } else {
        setSelectedPin(null);
        console.log('Failed to add pin to collection');
      }
    } catch (error) {
      setSelectedPin(null);
      console.log('Error:', error);
    }
  }
  setSelectedCollection(collection);
  setShowComponent({collectionPinsList:true, collection: false})
}

const handleClose = () => {
  setShowComponent({collection:false})
}

  useEffect(()=>{
   fetchCollections();
  },[]);


  return (
    <div className="collections-container">
      <List dense sx={{maxHeight: '200px', overflowY: 'auto',  width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {collections.map((collection) => (
         // const labelId = `checkbox-list-secondary-label-${item}`;
         // return (
          <ListItem
            key={collection._id}

          // disablePadding
          >
            <ListItemButton onAnimationEnd={() => handelCollectionSelected(collection)} >
              <ListItemText primary={collection.name} />
            </ListItemButton>
            <IconButton
                aria-label="options"
                >
                <MoreVertIcon onClick={(event) => handleMenuClick(event, collection)} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={(event) => handleDelete(event)}>Delete</MenuItem>
              </Menu>
          </ListItem>
          ))}
       
      </List>
      <div style={{ textAlign: 'center' }}>
          {inputVisible ? (
            <div>
            <TextField
              variant="outlined"
              size="small"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onBlur={toggleInput}
              onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 handleCollection();
               }
             }}
            />
          </div>
          ) : (
            <Button 
              variant="contained"
              color="primary" 
              onClick={toggleInput}>
              +
            </Button>
          )}
        </div>
        <CloseIcon className="loginCancel" onClick={handleClose} />
    </div>
  );
}

export default Collections;