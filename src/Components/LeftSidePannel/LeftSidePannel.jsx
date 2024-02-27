import NotesGroup from "../NotesGroup/NotesGroup";
import StylesLeftSidePannel from "./LeftSidePannel.module.css";
import React, { useState, useEffect } from "react";

const LeftSidePannel = ({ handleClick,handleUserIdClicked, id, groupName, color, create }) => {
  const [clickedButton, setClickedButton] = useState(null);
  

  // Getting stored data
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  // changing id
  const newId =
    storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

  // Create a new data object
  const newData = {
    id: newId,
    groupName: groupName,
    color: color,
    create: create,
  };
  
  // Append the new data to the existing array

  const submitCheck = () => {
    if (groupName !== "" && create === true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [groupName, create, newData]);


  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#2F2F2F2B" : "transparent",
      color: "white",
      minWidth: "100%",
      minHeight: "61px",
      display: "flex",
      justifyContent: "flex-start",
      borderRadius: "1rem 1rem 1rem 1rem",
    
    };
  };

  return (
    <div className={StylesLeftSidePannel.leftSidePannel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSidePannel.center}>
      
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {storedData.map((group) =>
              group.create ? (
                <div className={StylesLeftSidePannel.notesGroupSlected}>
                  
                  <span
                    className={StylesLeftSidePannel.act}
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
        <button
          className={StylesLeftSidePannel.createNotesGroup}
          onClick={() => handleClick(true)}
        >
          {" "}
          <img src="assets/+.svg" alt="+"  /> 
            
        </button>
      </div>
    </div>
  );
};

export default LeftSidePannel;
