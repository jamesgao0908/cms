import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../static/image/Logo.png";
import Badge from "@mui/material/Badge";
import { useCart } from "../utils/cartContext";
import { useGlobalConfigs } from "../store";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import theme from '../utils/theme';

const ResponsiveAppBar = ({
  backgroundColor = "linear-gradient(rgba(225, 213, 165, 0.5), rgba(225, 213, 165, 0.5)), rgb(225, 213, 165)",
  position = "sticky"
}) => {
  const { cartItems } = useCart();
  // const [state, dispatch] = useGlobalConfigs();
  const [state] = useGlobalConfigs();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawState, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
    >
      <List>
        {cartItems.length === 0 ? (
          <Typography component="div" variant="h5">
            cart is empty
          </Typography>
        ) : (
          cartItems.map((element, index) => (
            <ListItem key={index} disablePadding>
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {element.product_name}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <button>remove</button>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={element.image_urls}
                  alt="Live from space album cover"
                />
              </Card>
            </ListItem>
          ))
        )}
      </List>
      <Box>
        <Link to='/checkout'>
          <Button sx={{ margin: "unset", width: "100%" }} variant="contained">Checkout</Button>
        </Link>
      </Box>
    </Box>
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <AppBar position={position}
      style={{
        background: "linear-gradient(rgb(225, 213, 165) 100%,rgb(255, 248, 219) 0%)",
        boxShadow: "unset",
        opacity: 0.69,
        backdropFilter: "blur(14.6px)",
        backgroundImage: "linear-gradient(to bottom, #e1d5a5 0%, #e1d5a5 0%, rgba(255, 248, 219, 0) 100%, rgba(255, 248, 219, 0) 100%)",
      }} >
      <Container maxWidth="xl" sx={{ padding: { xs: "unset" } }}>
        <Toolbar disableGutters>
          {/* 👈左边主菜单 */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {state.header &&
                state.header.navBar &&
                state.header.navBar.map((element) => (
                  <Link to={element.link} key={element.title}>
                    <Button key={element.title} sx={theme.typography.navMenu} >{element.value}</Button>
                  </Link>
                ))}
            </Box>
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={theme.color.primary}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {state.header &&
                state.header.navBar &&
                state.header.navBar.map((element) => (
                  <Link to={element.link} key={element.title}>
                    <MenuItem sx={theme.typography.navMenu} key={element.title} onClick={handleCloseNavMenu}>
                      {element.value}
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </Box>
          {/* 中间菜单 */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Typography variant="h6" display="flex" alignItems="center" sx={theme.typography.title}>
              Elf
            </Typography>
            <Link to="/">
              <img style={{ backgroundColor: 'white', borderRadius: '100%', border: '1px solid darkgreen' }} src={Logo} alt="logo" width={80} />
            </Link>
            <Typography variant="h6" display="flex" alignItems="center" sx={theme.typography.title}>
              Cake
            </Typography>
          </Box>
          {/* 👉菜单栏右边 */}
          <Box sx={{ flex: 1, display: { xs: "flex" }, flexDirection: { xs: "row-reverse" }, margin: "1rem 0" }}>
            <IconButton onClick={toggleDrawer("right", true)}>
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon color="action" />
              </Badge>
            </IconButton>
            <Drawer
              anchor={"right"}
              open={drawState["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </Box>
          {/* responsve菜单 */}
          <Box
            sx={{
              flexGrow: { xs: 0, md: 1 },
              display: { xs: "flex", md: "none" },
              flexDirection: { xs: "row-reverse" },
            }}
          >
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
