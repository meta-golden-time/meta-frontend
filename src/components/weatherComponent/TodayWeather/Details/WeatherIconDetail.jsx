import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { weatherIcon } from '../../../../utilities/weatherUtilities/IconsUtils';


const WeatherIconDetail = (props) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    async function fetchIcon() {
      const iconData = await weatherIcon(props.weatherList);
      setIcon(iconData);     
    }
      
      
    fetchIcon();
  }, [props.weatherList]);
 
  return (
    <>
    {icon ? (
          <Box
            component="img"
            sx={{
              width: { xs: '36px', sm: '42px' },
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: '0 auto',
            }}
            alt="weather"
            src={icon}
          />
        ) : (
          <Typography>Loading...</Typography>
        )}
    </>    
  );
};

export default WeatherIconDetail;
