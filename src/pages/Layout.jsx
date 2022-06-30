import React, {useEffect, useState} from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "../components/AppBar";
import Footer from "../components/Footer";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";
import {green} from "@mui/material/colors";
import {Outlet} from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: green[500],
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
      success: '#ff9800'
    },
    success: {
      main: '#ff9800'
    }
  },
});

const Layout = () => {
  const  [title, setTitle] = useState({
    appTitle: '',
    mainTitle: '',
    footerTitle: '',
  });

  useEffect(() => {
    const getTitle = async () => {
      const userCollectionRef = collection(db, "title")
      let data = await getDocs(userCollectionRef);
      setTitle(data.docs[0].data());
    }
    getTitle();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth={"xl"}>
        <Header title={title.appTitle}/>
        <main>
          <Outlet/>
        </main>
      </Container>
      <Footer
        title={title.footerTitle}
        description={'Cat footer!'}
      />
    </ThemeProvider>
  );
};

export default Layout;