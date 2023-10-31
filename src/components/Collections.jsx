import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "../components/Collections.css"
import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import { useEffect } from "react";


const Collections = () => {

  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');

 // const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleNewCollection = async () => {
   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name: newCollectionName }),
     });

     if (response.ok) {
       // Fetch and update the collections list after creating a new collection
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
 };

  useEffect(()=>{
   const fetchCollections = async ()=>{
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pincollection`);
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

              disablePadding
            >
              <ListItemButton>
                <ListItemText  primary={collection.name} />
              </ListItemButton>
            </ListItem>
          ))}
       
      </List>
      <div style={{ textAlign: 'center' }}>
          {isInputVisible ? (
            <div>
            <TextField
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={toggleInput}
              onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 handleNewCollection();
               }
             }}
            />
            <Button variant="contained" color="primary" onClick={handleNewCollection}>
            Add
          </Button>
          </div>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleInput}>
              +
            </Button>
          )}
        </div>
    </div>

  );
}

export default Collections;



//   return (
//     <Paper elevation={3} sx={{background: 'withe'}}>
//       <List>
//         {items.slice(0, 5).map((item, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={item} />
//           </ListItem>
//         ))}
//       </List>
      // <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      //   <List>
      //     {items.slice(5).map((item, index) => (
      //     <ListItemButton>
      //       <ListItem key={index}>
      //         <ListItemText primary={item} />
      //       </ListItem>
      //     </ListItemButton>
      //     ))}
      //   </List>
      // </div>
//       <div style={{ textAlign: 'center' }}>
//         {isInputVisible ? (
//           <TextField
//             variant="outlined"
//             size="small"
//             value={inputValue}
//             onChange={handleInputChange}
//             onBlur={toggleInput}
//           />
//         ) : (
//           <Button variant="contained" color="primary" onClick={toggleInput}>
//             +
//           </Button>
//         )}
//       </div>
//     </Paper>
//   );
// }

// export default Collections;



