import React from 'react';
import { GridToolbarFilterButton, GridToolbarContainer } from '@mui/x-data-grid';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
    )
}

export default CustomToolbar;