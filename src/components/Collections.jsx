import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "../components/Collections.css"
import { Button } from "@mui/base";
import { TextField } from "@mui/material";


const Collections = () => {

  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="collections-container">
      <List dense sx={{maxHeight: '200px', overflowY: 'auto',  width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        {items.map((item, index) => {
          const labelId = `checkbox-list-secondary-label-${item}`;
          return (
            <ListItem
              key={item}

              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={`Line item ${item + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
       
      </List>
      <div style={{ textAlign: 'center' }}>
          {isInputVisible ? (
            <TextField
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={toggleInput}
            />
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



