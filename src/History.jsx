import React from 'react'
import { AiFillEuroCircle, AiOutlinePoundCircle } from "react-icons/ai";
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";

const History = ({setModalOpen,modalOpen,history}) => {
    const historyNumberSuffix = (num) => {
        let suffix = "th";
    
        if (num % 10 == 1 && num % 100 !== 11) suffix = "st";
        if (num % 10 == 2 && num % 100 !== 12) suffix = "nd";
        if (num % 10 == 3 && num % 100 !== 13) suffix = "rd";
    
        return suffix;
      };
  return (
    <Dialog
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    maxWidth="sm"
    fullWidth={true}
    
  >
    
    <DialogTitle>
      <Typography variant="h3">Flip history</Typography>
      <IconButton
        aria-label="close"
        onClick={() => setModalOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      {history.map((item, index) => {
        return (
          <div key={index} className="history--item">
            <h3>
              {item.flipNumber > 0 &&
                item.flipNumber +
                  historyNumberSuffix(item.flipNumber) +
                  " flip"}
            </h3>
            <div className="iconholder">
              {item.flip.map((o, p) => {
                return o ? (
                  <AiFillEuroCircle key={p} className="history--icon" />
                ) : (
                  <AiOutlinePoundCircle key={p} className="history--icon" />
                );
              })}
            </div>
          </div>
        );
      })}
    </DialogContent>
  </Dialog>
  )
}

export default History