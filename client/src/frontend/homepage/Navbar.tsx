import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Box,
  InputBase,
  CircularProgress,
  Badge,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  hasImage,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  HelpOutline,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartItems } from "../../hooks/useCartItems";
import logo from "../../../public/logo.png";
import "./Homepage.css";
import defaultUserImg from "../../assets/img/icon/userImage.jpg";
import { useGetAllCategoriesQuery } from "../../redux/services/categories";


export default function Navbar() {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  const categories = categoriesData?.categories || [];

  const [showCategories, setShowCategories] = useState(false);

  const loading = false;
  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;
  const { cartItems } = useCartItems(isAuthenticated);
  const cartCount = cartItems?.length || 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => navigate("/logout");
  const hasImage = Boolean(user?.avatarUrl);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div>
      {/* Top bar */}
      <Box
        sx={{
          backgroundColor: "rgb(31 41 55)",
          height: 32,
        }}
      />

      {/* Header */}
      <AppBar
        position="static"
        elevation={1}
        sx={{ padding: "8px 0px", backgroundColor: "white", color: "black" }}
      >
        <Toolbar
              sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 5, sm: 5 },
             
            }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="PrintSix logo"
                height="50"
                className="headerLog"
              />
            </Link>
          </Box>

          {/* Desktop Search (always visible) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
          <form onSubmit={handleSearch} style={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgb(252, 155, 4)",
                borderRadius: "8px 0 0 8px",
                backgroundColor: "white",
                width: "100%",
                minWidth: 600,
                maxWidth: 900,
                py: 1,
                "&:focus-within": {
                  borderColor: "rgb(252,155,4)",
                  border: "3px solid rgb(252, 155, 4)",
                },
              }}
            >
              <Box sx={{ pl: 2 }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search products..."
                sx={{ flex: 1, px: 1, bgcolor: "white" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <button
              style={{
                backgroundColor: "rgb(252, 155, 4)",
                color: "white",
                border: "none",
                padding: "0px 25px",
                borderRadius: "0px 8px 8px 0px",
              }}
            >
              Search
            </button>
          </form>  
          </Box>

          {/* Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-end" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <IconButton>
              <HelpOutline sx={{ width: 35, height: 35 }} color="primary" />
            </IconButton>

            <IconButton component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart  sx={{ width: 35, height: 35 }} color="primary"  />
              </Badge>
            </IconButton>

            {loading ? (
              <CircularProgress size={24} />
            ) : isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuClick} sx={{ width: 40, height: 40, bgcolor: "#fc9b04" }}>
                  <Avatar
                    alt={user?.name}
                    src={user?.avatarUrl || defaultUserImg}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <Card sx={{ maxWidth: 800, borderRadius: 3, boxShadow: 3 }}>
                    {hasImage ? (
                      <CardMedia
                        component="img"
                        height="180"
                        image={user.avatarUrl}
                        alt={user?.name}
                        sx={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 180,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#fc9b04",
                        }}
                      >
                        <Avatar
                          src={user?.avatarUrl || defaultUserImg}
                          sx={{
                            bgcolor: "#fc9b04",
                            width: 150,
                            height: 150,
                            fontSize: 32,
                          }}
                        >
                          {user?.name?.charAt(0) || "U"}
                        </Avatar>
                      </Box>
                    )}

                    {/* Name + Email */}
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: "#1f2937" }} variant="h6">
                        {user?.name || "Guest User"}
                      </Typography>
                      <Typography sx={{ color: "#1f2937" }} variant="body2">
                        {user?.email || "No email provided"}
                      </Typography>
                    </CardContent>

                    {/* Actions */}
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        sx={{ color: "#1f2937" }}
                        onClick={() => navigate("/customer")}
                      >
                        Profile
                      </Button>
                      <Button
                        size="small"
                        sx={{ color: "#1f2937" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </CardActions>
                  </Card>
                </Menu>
              </>
            ) : (
              <Button
                color="primary"
                startIcon={<AccountCircle />}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}

            {/* Mobile Search Toggle */}
            <IconButton
              sx={{ display: { sm: "none" } }}
              onClick={() => setSearchVisible((prev) => !prev)}
            >
              <SearchIcon color="primary" />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Search Input */}
        {searchVisible && (
          <Box className="container d-md-none py-2">
            <InputBase
              placeholder="Search..."
              fullWidth
              sx={{
                backgroundColor: "#f1f1f1",
                px: 2,
                py: 1,
                borderRadius: 1,
              }}
            />
          </Box>
        )}
      </AppBar>

      {/* Category Mega Menu (desktop) */}
      <Box sx={{ backgroundColor: "rgb(31 41 55)" }} className="text-white" position="relative">
        <div className="container d-flex justify-content-start"
          style={{ paddingLeft: 100, paddingRight: 0, marginLeft: 0, marginRight: 0 }}
        >
        <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 0,
              padding: "16px 15px",
              marginRight: "10px",
              minWidth: "auto",
              color:"white",
              fontWeight: 400,
              display: { xs: "none", md: "inline-flex" },
            }}
            
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            All Categories
          </Button>

          {showCategories && (
            <Box
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              sx={{
                position: "absolute",
                top: "100%",
                
                width: "85%",
                backgroundColor: "#fff",
                color: "#000",
                boxShadow: 3,
                borderRadius: "4px",
                zIndex: 10,
                
              }}
            >
              {categories.length > 0 ? (
                <>
                  {/* Row for Titles */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "40px",
                      textAlign: "center",
                      mt: 1,
                    }}
                  >
                    {categories.map((cat) => (
                      <Box key={cat.id} sx={{ fontWeight: 400 }}>
                        <a  href={`/category/${cat.slug}`}>
                        <img
                          key={cat.id}
                          src={cat.imageUrl || "/placeholder.png"}
                          alt={cat.title}
                          style={{
                            width: "100%",
                            height: "100px",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                        {cat.title}
                        </a>
                      </Box>
                    ))}
                  </Box>
                </>
              ) : (
                <Box sx={{ padding: "8px" }}>No categories found</Box>
              )}
            </Box>
          )}

          
          <div className="d-none d-md-flex gap-3">
            <Button component={Link} to="/" className="text-white">
              Home
            </Button>
            <Button component={Link} to="/shop" className="text-white">
              Shop
            </Button>
            <Button component={Link} to="/about" className="text-white">
              About
            </Button>
            <Button component={Link} to="/contact" className="text-white">
              Contact
            </Button>
          </div>
        </div>
      </Box>

      {/* Mobile Hamburger Bar */}
      <Box
        sx={{
          display: { md: "none" },
          backgroundColor: "rgb(31 41 55)",
          textAlign: "center",
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/shop">
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
