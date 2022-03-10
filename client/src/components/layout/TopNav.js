import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'

const pages = ['Register', 'Log in', 'Find']
const settings = ['Profile', 'Log out']

export default function TopNav({ setSelectedPage, profileData }) {

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (e) => {
    console.log(e.target.name)
    setAnchorElNav(null)
    if (e.target.name === 'Register' || e.target.name === 'Log in') setSelectedPage(e.target.name)
  }

  const handleCloseUserMenu = (e) => {
    console.log(e.target)
    if (e.target.id === 'Log out') localStorage.removeItem('outsourcd-token')
    setAnchorElUser(null)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#182b3a' }}>
      <Toolbar>
        <Link to='/'>
          <HomeIcon sx={{ color: '#C2185B', mr: 2 }} />
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {pages.map((page, i) => (
              <MenuItem key={page}
                onClick={handleCloseNavMenu}
                sx={{ mr: 2 }}
              >
                <Link to={page === 'Register' || page === 'Log in' ? `/auth` : `/${page.toLowerCase()}`}>
                  <Typography textAlign="center">{i === 2 ? 'Find a job' : page}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, i) => (
            <Link key={page} to={page === 'Register' || page === 'Log in' ? `/auth` : `/${page.toLowerCase()}`} state={{ destinationPage: page }} style={{ textDecoration: 'none' }} >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mr: 3, color: 'white', display: 'block' }}
                name={page}
              >
                {page}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={Object.keys(profileData).length ? profileData.name : ''} src={Object.keys(profileData).length ? profileData.profile_image : ''} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(setting => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link
                  to={setting === 'Log out' ? '/auth' : `/${setting.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <Typography id={setting} textAlign="center" color='black'>{setting}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar >
  )
}
