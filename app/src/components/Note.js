import React from 'react'
import Typography from '@material-ui/core/Typography'
const Note = () => {
     const note = "Start thinking wellness not illness";

  return (
    <>
        <Typography
        variant="h4"
        component="div"
        gutterBottom
        align="center"
      >
        {note}
      </Typography>
    </>
  )
}

export default Note
