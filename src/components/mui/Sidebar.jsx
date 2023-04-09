import * as React from 'react';
import { useEffect, useState, useRef, Suspense, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { RiFileWord2Fill } from "react-icons/ri";
import AntSwitch from './AntSwitch';
import AppContext from '../../context/Context';
import { GiNightSleep } from "react-icons/gi";
import { BiHide } from "react-icons/bi";
import { Link, link, Outlet, outlet, useLocation } from 'react-router-dom';
import { GrDocumentTest } from "react-icons/gr";
import { AiOutlineFileWord } from "react-icons/ai";
import RadioButtonsGroup from './Radio group';
import SearchAppBar from './SearchAppBar';
import Appcontext from '../../context/Context';
import { HiTrash, HiOutlinePencil, HiSave } from "react-icons/hi";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaLock } from "react-icons/fa";

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	}),
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
	const [expanded, setExpanded] = React.useState(false);

	const { open, setOpen } = useContext(Appcontext);
	const { setmode, setpersianshow, setenglishshow, setmistake, datawords } = useContext(AppContext);
	const theme = useTheme();
	// const [open, setOpen] = React.useState(false);
	const location = useLocation();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};


	const goexam = (() => setmistake(null), handleDrawerClose);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} sx={{ display: 'flex', flexDirection: 'row' }}>
				<Toolbar className='w-100' >

					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 0, p: 0, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>


					<Typography variant="h6" Wrap component="div" className=' d-flex m-0'>
						<Typography variant="h6" component="div" className='m-0' noWrap >
							<RiFileWord2Fill style={{ color: "yellow", fontSize: '50px' }} className='ml-2'></RiFileWord2Fill>
							Words
						</Typography>
					</Typography>


					{location.pathname == "/" ?
						<Box sx={{ margin: "auto", marginRight: "18px" }} className="d-flex justify-content-end">
							<SearchAppBar></SearchAppBar>
						</Box>
						: null}



				</Toolbar>

			</AppBar>
			<Drawer

				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						// backgroundColor: 'red',
						// backgroundClip: 'contentbox',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}

			>
				<div className='side-bg h-100 w-100'>

				</div>
				<DrawerHeader >
					<ListItemText primary={"MENU"} className=" text-dark mx-5" />
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>

				<Divider className='bg-dark' />


				<div>
					<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='' style={{ backgroundColor: "rgba(229, 43, 80, 0.3)" }}>

						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >

							<Typography sx={{ width: '100%', flexShrink: 0, }}>
								حالت نمایش کلمه
							</Typography>

						</AccordionSummary>

						<AccordionDetails>
							<Typography>
								<ListItem className=''>
									<ListItemIcon>
										<GiNightSleep className='side-icon' />
									</ListItemIcon>
									<ListItemText primary={" حالت شب"} className=" text-dark" />
									<Typography component="div" className=' d-flex align-items-center'>
										<AntSwitch onClick={() => setmode((prevLoading) => !prevLoading)}></AntSwitch>
									</Typography>
								</ListItem>

								<ListItem className=''>
									<ListItemIcon>
										<BiHide className='side-icon' />
									</ListItemIcon>
									<ListItemText primary={"  کلمات فارسی"} className=" text-dark" />
									<Typography component="div" className=' d-flex align-items-center'>
										<AntSwitch onClick={() => setpersianshow((prevLoading) => !prevLoading)}></AntSwitch>
									</Typography>
								</ListItem>

								<ListItem className=''>
									<ListItemIcon>
										<BiHide className='side-icon' />
									</ListItemIcon>
									<ListItemText primary={" کلمات انگلیسی"} className=" text-dark" />
									<Typography component="div" className=' d-flex align-items-center'>
										<AntSwitch onClick={() => setenglishshow((prevLoading) => !prevLoading)}></AntSwitch>
									</Typography>
								</ListItem>
							</Typography>
						</AccordionDetails>

					</Accordion>

					<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ backgroundColor: "rgba(180, 100, 225, 0.3)" }}>

						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel2bh-header" >

							<Typography sx={{ width: '100%', flexShrink: 0 }}>
								رنگ کلمات
							</Typography>

						</AccordionSummary>

						<AccordionDetails>
							<Typography>
								<ListItem className=''>
									<RadioButtonsGroup></RadioButtonsGroup>
								</ListItem>
							</Typography>
						</AccordionDetails>

					</Accordion>

					<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}  style={{ backgroundColor: "rgba(11, 218, 81, 0.3)" }}>

						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel3bh-header" >

							<Typography sx={{ width: '100%', flexShrink: 0 }} >
								بخش آزمون
							</Typography>

						</AccordionSummary>

						<AccordionDetails>
							<Typography>
								<ListItem disablePadding>
									<Link to={`/Exam`} className="btn word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={goexam}>
										<HiOutlinePencil></HiOutlinePencil>
										<ListItemText primary={"آزمون انگلیسی"} />
									</Link>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={"آزمون فارسی"} />
									</Button>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn word-btn-blue p-1 text-light  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={"آزمون کلمات انتخابی"} />
									</Button>
								</ListItem>
							</Typography>
						</AccordionDetails>

					</Accordion>

					<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} style={{ backgroundColor: "rgba(202, 198, 220, 0.3)" }}>

						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel4bh-header" >

							<Typography sx={{ width: '100%', flexShrink: 0 }}>
								آموزش کلمه
							</Typography>

						</AccordionSummary>

						<AccordionDetails>
							<Typography>
							<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={" کلمات A1"} />
									</Button>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={" کلمات A2"} />
									</Button>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={"کلمات B1 "} />
									</Button>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={"کلمات B2 "} />
									</Button>
								</ListItem>
								<ListItem disablePadding>
									<Button  disabled className="btn text-light word-btn-blue p-1  d-flex align-items-center w-100 btn-primary mx-3 my-1" title="بخش آزمون"
										onClick={{}}>
										<FaLock></FaLock>
										<ListItemText primary={"کلمات C1 "} />
									</Button>
								</ListItem>
							</Typography>
						</AccordionDetails>

					</Accordion>




				</div>









			</Drawer>

		</Box >
	);
}





















