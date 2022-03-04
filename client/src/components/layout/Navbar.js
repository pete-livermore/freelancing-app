import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'

const pages = ['Find', 'Register', 'Log in']
const settings = ['Profile', 'Workspace', 'Dashboard', 'Planner', 'Log out']

const ResponsiveAppBar = ({ setSelectedPage }) => {
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
    console.log(e.target.id)
    setAnchorElUser(null)
    if (e.target.id === 'Log out') window.localStorage.removeItem('outsourcd-token')
  }

  return (
    <nav style={{ width: '100%', backgroundColor: '#182b3a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <HomeIcon sx={{ color: '#C2185B' }} />
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
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={page === 'Register' || page === 'Log in' ? `/auth` : `/${page.toLowerCase()}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Link key={page} to={page === 'Register' || page === 'Log in' ? `/auth` : `/${page.toLowerCase()}`} state={{ destinationPage: page }} style={{ textDecoration: 'none' }} >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem id={setting} key={setting} onClick={handleCloseUserMenu}>
                  <Link
                    to={setting === 'Log out' ? '/auth' : `/${setting.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center" color='black'>{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </nav>
  )
}
export default ResponsiveAppBar
