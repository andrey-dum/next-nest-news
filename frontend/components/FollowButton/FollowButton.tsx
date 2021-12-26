import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { AddOutlined, CheckOutlined } from '@material-ui/icons';


const StyledButton = styled(Button)`
    &.MuiButton-root {
        min-width: 30px;
        width: 35px;
        height: 30px;
        font-family: 'Roboto', sans-serif;
    }
    
`;


export const FollowButton: React.FC = () => {
    const [followeed, setFollowed] = useState(false);

    const onFollow = () => {
        setFollowed(!followeed)
    }

    const followIcon = useMemo(
        () => followeed ? <AddOutlined /> : <CheckOutlined />
    , [followeed])
        
    return (
        <StyledButton
            onClick={onFollow}
            variant="outlined"
        >
            {followIcon } saaffaafsafs
        </StyledButton>
    )
}