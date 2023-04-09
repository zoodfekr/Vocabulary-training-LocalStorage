import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Appcontext from '../../context/Context';
import { CiCircleRemove } from "react-icons/ci";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '70%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '8ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {

    const { setSearchParams } = useContext(Appcontext);

    let timer;
	const finder = (event) => {
		clearTimeout(timer);
		timer = setTimeout(()=>onsearch(event), 500);
	}
    let search;
    const onsearch = event => {
         search = event.target.value;
        if (search) {
            setSearchParams({ search });
        } else {
            setSearchParams({});
        }
    };


    return (
        <Search sx={{ border: 1, ml: 1, p: 0 }} >

            <SearchIconWrapper sx={{ p: 0 }}>
                {/* {search. ?     <CiCircleRemove /> :<SearchIcon />} */}
                <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
                onChange={finder}
                placeholder="یافتن کلمه"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ p: 0, ml: 1, direction: "rtl" }}
            />

        </Search>
    );
}